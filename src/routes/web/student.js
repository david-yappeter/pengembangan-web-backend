const { Attendance } = require("../../../db/models/attendance");
const { ClassEnroll } = require("../../../db/models/class_enroll");
const {
  ClassEnrollSubject,
} = require("../../../db/models/class_enroll_subject");
const { News } = require("../../../db/models/news");
const student = require("../../../db/models/student");
const { Student } = require("../../../db/models/student");
const {
  StudentHasClassEnroll,
} = require("../../../db/models/student_has_class_enroll");

const router = require("express").Router();

const studentMiddleware = (req, res, next) => {
  if (req.session.isAuth) {
    next();
  } else {
    res.redirect("/");
  }
};

router.get("/home", studentMiddleware, async (req, res) => {
  res.send("Welcome to the Student Home Page");
});

router.get("/berita", studentMiddleware, async (req, res) => {
  const page = req.query.page || 1;
  const limit = 10;
  News.query()
    .page(page - 1, limit)
    .orderBy("created_at", "desc")
    .then((result) => {
      return res.render("pages/Student/berita", {
        news: result.results,
        count: result.total,
        totalPage: Math.ceil(result.total / limit) || 1,
        page: page,
        currentLogin: req.session.login,
      });
    })
    .catch((err) => {
      console.log(err);
      return res.render("partials/page500");
    });
});

router.get("/berita/detail/:id", studentMiddleware, async (req, res) => {
  News.query()
    .where({
      id: req.params.id,
    })
    .first()
    .then((result) => {
      if (result) {
        return res.render("pages/Student/detail-berita", {
          berita: result,
          currentLogin: req.session.login,
        });
      } else {
        res.render("partials/page404");
      }
    })
    .catch((err) => {
      console.log(err);
      return res.render("partials/page500");
    });
});

router.get("/profile", studentMiddleware, async (req, res) => {
  Student.query()
    .findById(req.session.login.nim)
    .withGraphFetched(
      "[class_enrolls(orderSemester).[class_enroll_subjects.[subject],class,lecturer]]"
    )
    .modifiers({
      orderSemester: (builder) => {
        builder.orderBy("semester", "asc");
      },
    })
    .then((student) => {
      currentClassEnroll =
        student.class_enrolls[student.class_enrolls.length - 1];

      currentClassEnroll.semester = ClassEnroll.convertToRoman(
        currentClassEnroll.semester
      );

      currentClassEnroll.class_enroll_subjects = ClassEnrollSubject.sortArray(
        currentClassEnroll.class_enroll_subjects
      );

      return res.render("pages/Student/Profile/index", {
        currentLogin: req.session.login,
        student: student,
        currentClassEnroll: currentClassEnroll,
      });
    })
    .catch((err) => {
      console.log(err);
      return res.render("partials/page500");
    });
});

router.get("/absensi", studentMiddleware, async (req, res) => {
  let filterSemester = req.query.semester;
  const nim = req.session.login.nim;

  Student.query()
    .findById(req.session.login.nim)
    .withGraphFetched(
      "[class_enrolls(classEnrolls).[class_enroll_subjects.[subject,lecturer,attendances(orderWeek)],class,lecturer]]"
    )
    .modifiers({
      classEnrolls: (builder) => {
        builder.orderBy("semester", "asc");
        filterSemester &&
          builder.where({
            semester: filterSemester,
          });
      },
      orderWeek: (builder) => {
        builder.orderBy("week", "asc");
        builder.innerJoin(StudentHasClassEnroll.tableName, function () {
          this.on(
            StudentHasClassEnroll.tableName + ".id",
            "=",
            Attendance.tableName + ".student_has_class_enroll_id"
          ).andOn(StudentHasClassEnroll.tableName + ".student_nim", "=", nim);
        });
      },
    })
    .then((student) => {
      if (!student || student.class_enrolls.length === 0) {
        return res.render("pages/Student/Absensi/index", {
          currentLogin: req.session.login,
          maxPertemuan: null,
          currentClassEnroll: null,
          filterSemester: filterSemester,
        });
      }

      currentClassEnroll =
        student.class_enrolls[student.class_enrolls.length - 1];

      filterSemester = currentClassEnroll.semester;

      currentClassEnroll.semester = ClassEnroll.convertToRoman(
        currentClassEnroll.semester
      );

      currentClassEnroll.class_enroll_subjects = ClassEnrollSubject.sortArray(
        currentClassEnroll.class_enroll_subjects
      );

      const maxPertemuan = Math.max(
        ...student.class_enrolls.reduce((acc, item) => {
          acc.push(
            ...item.class_enroll_subjects.map((absensi) => {
              return absensi.attendances.reduce((acc, curr) => {
                if (curr.week > acc) {
                  acc = curr.week;
                }
                return acc;
              }, 0);
            })
          );
          return acc;
        }, [])
      );

      for (
        let i = 0;
        i < currentClassEnroll.class_enroll_subjects.length;
        i++
      ) {
        currentClassEnroll.class_enroll_subjects[i].attendances =
          currentClassEnroll.class_enroll_subjects[i].attendances.reduce(
            (acc, curr) => {
              acc[curr.week] = curr;
              return acc;
            },
            {}
          );
      }

      return res.render("pages/Student/Absensi/index", {
        currentLogin: req.session.login,
        maxPertemuan: maxPertemuan,
        student: student,
        currentClassEnroll: currentClassEnroll,
        filterSemester: filterSemester,
      });
    })
    .catch((err) => {
      console.log(err);
      return res.render("partials/page500");
    });
});

module.exports = router;
