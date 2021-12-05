const student = require("../../../db/models/student");
const { models } = require("../../../db/sequelize");

const router = require("express").Router();

router.use((req, res, next) => {
  if (req.session.isAuth) {
    next();
  } else {
    res.redirect("/");
  }
});

router.get("/a", async (req, res) => {
  await models.Student.findAll({
    include: [models.ClassEnroll],
    nest: true,
  })
    .then((students) => {
      res.send(students.toJSON());
    })
    .catch((err) => {
      console.log(err);
      res.render("partials/page500");
    });
});

router.get("/home", (req, res) => {
  res.send("Welcome to the Student Home Page");
});

router.get("/berita", async (req, res) => {
  await models.News.findAndCountAll({
    limit: 10,
    offset: req.query.page ? (req.query.page - 1) * 10 : 0,
  })
    .then((result) => {
      result.rows = result.rows.map((item) => item.toJSON());
      return res.render("pages/Student/berita", {
        news: result.rows,
        count: result.count,
        page: req.query.page ? req.query.page : 1,
        currentLogin: req.session.login,
      });
    })
    .catch((err) => {
      console.log(err);
      return res.render("partials/page500");
    });
});

router.get("/berita/detail/:id", async (req, res) => {
  await models.News.findOne({
    where: {
      id: req.params.id,
    },
  })
    .then((result) => {
      if (result) {
        result.rows = result.rows.map((item) => item.toJSON());
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
  await models.Student.findByPk(req.session.login.nim, {
    include: [
      {
        model: models.ClassEnroll,
        order: [["semester", "ASC"]],
        include: [
          {
            model: models.ClassEnrollSubject,
            include: [models.Subject],
          },
          models.Class,
          models.Lecturer,
        ],
      },
    ],
    nest: true,
  })
    .then((student) => {
      if (student) {
        student = student.toJSON();

        currentClassEnroll =
          student.ClassEnrolls[student.ClassEnrolls.length - 1];

        currentClassEnroll.semester = models.ClassEnroll.convertToRoman(
          currentClassEnroll.semester
        );

        currentClassEnroll.ClassEnrollSubjects =
          models.ClassEnrollSubject.sortArray(
            currentClassEnroll.ClassEnrollSubjects
          );

        res.render("pages/Student/Profile/index", {
          currentLogin: req.session.login,
          student: student,
          currentClassEnroll: currentClassEnroll,
        });
      } else {
        res.render("partials/page500");
      }
    })
    .catch((err) => {
      console.log(err);
      res.render("partials/page500");
    });
});

router.get("/absensi", async (req, res) => {
  await models.Student.findByPk(req.session.login.nim, {
    include: [
      {
        model: models.ClassEnroll,
        include: [
          {
            model: models.ClassEnrollSubject,
            include: [
              models.Subject,
              models.Lecturer,
              {
                model: models.Attendance,
                separate: true,
                order: [["week", "ASC"]],
              },
            ],
          },
          models.Class,
          models.Lecturer,
        ],
      },
    ],
    order: [[models.ClassEnroll, "semester", "ASC"]],
    nest: true,
  })
    .then((student) => {
      student = student.toJSON();

      currentClassEnroll =
        student.ClassEnrolls[student.ClassEnrolls.length - 1];

      currentClassEnroll.semester = models.ClassEnroll.convertToRoman(
        currentClassEnroll.semester
      );

      currentClassEnroll.ClassEnrollSubjects =
        models.ClassEnrollSubject.sortArray(
          currentClassEnroll.ClassEnrollSubjects
        );

      const maxPertemuan = Math.max(
        ...student.ClassEnrolls.reduce((acc, item) => {
          acc.push(
            ...item.ClassEnrollSubjects.map((absensi) => {
              return absensi.Attendances.reduce((acc, curr) => {
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

      return res.render("pages/Student/Absensi/index", {
        currentLogin: req.session.login,
        maxPertemuan: maxPertemuan,
        student: student,
        currentClassEnroll: currentClassEnroll,
      });
    })
    .catch((err) => {
      console.log(err);
      return res.render("partials/page500");
    });
});

module.exports = router;
