const { ClassEnroll } = require("../../../db/models/class_enroll");
const {
  ClassEnrollSubject,
} = require("../../../db/models/class_enroll_subject");
const { News } = require("../../../db/models/news");
const { Student } = require("../../../db/models/student");

const router = require("express").Router();

router.use((req, res, next) => {
  if (req.session.isAuth) {
    next();
  } else {
    res.redirect("/");
  }
});

router.get("/home", (req, res) => {
  res.send("Welcome to the Student Home Page");
});

router.get("/berita", async (req, res) => {
  const { page } = req.query.page || 1;
  News.query()
    .page(page - 1, 10)
    .then((result) => {
      return res.render("pages/Student/berita", {
        news: result.results,
        count: result.total,
        page: page,
        currentLogin: req.session.login,
      });
    })
    .catch((err) => {
      console.log(err);
      return res.render("partials/page500");
    });
});

router.get("/berita/detail/:id", async (req, res) => {
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

router.get("/profile", async (req, res) => {
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

router.get("/absensi", async (req, res) => {
  let filterSemester = req.query.semester;

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

      return res.send("asdsd");
    })
    .catch((err) => {
      console.log(err);
      return res.render("partials/page500");
    });

  // await models.Student.findByPk(req.session.login.nim, {
  //   include: [
  //     {
  //       model: models.ClassEnroll,
  //       where: filterSemester ? { semester: filterSemester } : null,
  //       include: [
  //         {
  //           model: models.ClassEnrollSubject,
  //           include: [
  //             models.Subject,
  //             models.Lecturer,
  //             {
  //               model: models.Attendance,
  //               separate: true,
  //               order: [["week", "ASC"]],
  //             },
  //           ],
  //         },
  //         models.Class,
  //         models.Lecturer,
  //       ],
  //     },
  //   ],
  //   order: [[models.ClassEnroll, "semester", "ASC"]],
  //   nest: true,
  // })
  //   .then((student) => {
  // if (!student) {
  //   return res.render("pages/Student/Absensi/index", {
  //     currentLogin: req.session.login,
  //     maxPertemuan: null,
  //     currentClassEnroll: null,
  //     filterSemester: filterSemester,
  //   });
  // }
  // student = student.toJSON();

  // currentClassEnroll =
  //   student.ClassEnrolls[student.ClassEnrolls.length - 1];

  // filterSemester = currentClassEnroll.semester;

  // currentClassEnroll.semester = models.ClassEnroll.convertToRoman(
  //   currentClassEnroll.semester
  // );

  // currentClassEnroll.ClassEnrollSubjects =
  //   models.ClassEnrollSubject.sortArray(
  //     currentClassEnroll.ClassEnrollSubjects
  //   );

  // const maxPertemuan = Math.max(
  //   ...student.ClassEnrolls.reduce((acc, item) => {
  //     acc.push(
  //       ...item.ClassEnrollSubjects.map((absensi) => {
  //         return absensi.Attendances.reduce((acc, curr) => {
  //           if (curr.week > acc) {
  //             acc = curr.week;
  //           }
  //           return acc;
  //         }, 0);
  //       })
  //     );
  //     return acc;
  //   }, [])
  // );

  // for (let i = 0; i < currentClassEnroll.ClassEnrollSubjects.length; i++) {
  //   currentClassEnroll.ClassEnrollSubjects[i].Attendances =
  //     currentClassEnroll.ClassEnrollSubjects[i].Attendances.reduce(
  //       (acc, curr) => {
  //         acc[curr.week] = curr;
  //         return acc;
  //       },
  //       {}
  //     );
  // }

  // return res.render("pages/Student/Absensi/index", {
  //   currentLogin: req.session.login,
  //   maxPertemuan: maxPertemuan,
  //   student: student,
  //   currentClassEnroll: currentClassEnroll,
  //   filterSemester: filterSemester,
  // });
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //     return res.render("partials/page500");
  //   });
});

module.exports = router;
