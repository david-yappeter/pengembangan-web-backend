const { Class } = require("../../../db/models/class");
const { ClassEnroll } = require("../../../db/models/class_enroll");
const { News } = require("../../../db/models/news");
const { NewsCategory } = require("../../../db/models/news_category");
const { Student } = require("../../../db/models/student");
const {
  StudentHasClassEnroll,
} = require("../../../db/models/student_has_class_enroll");
const { models } = require("../../../db/sequelize");

const router = require("express").Router();

router.use("/admin", (req, res, next) => {
  if (req.session.isAdmin) {
    next();
  } else {
    res.redirect("/admin/login");
  }
});

router.get("/admin", async (req, res) => {
  const page = req.query.page || 1;
  const limit = 10;
  News.query()
    .page(page - 1, limit)
    .then((result) => {
      return res.render("pages/Admin/berita", {
        news: result.results,
        count: result.total,
        page: page,
        currentAdmin: req.session.admin,
      });
    })
    .catch((err) => {
      console.log(err);
      return res.render("partials/page500");
    });
});

router.get("/admin/berita/detail/:id", async (req, res) => {
  News.query()
    .findById(req.params.id)
    .then((result) => {
      if (result) {
        return res.render("pages/Admin/detail-berita", {
          berita: result,
          currentAdmin: req.session.admin,
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

router.get("/admin/berita/create", async (req, res) => {
  NewsCategory.query()
    .then((result) => {
      return res.render("pages/Admin/berita-create", {
        categories: result,
        currentAdmin: req.session.admin,
      });
    })
    .catch((err) => {
      console.log(err);
      return res.render("partials/page500");
    });
});

router.post("/admin/berita/insert", async (req, res) => {
  const { editor1, title, category } = req.body;
  await models.News.create({
    title: title,
    content: editor1,
    newsCategoriesName: category,
  })
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
      return res.render("partials/page500");
    });
});

router.delete("/admin/berita/delete/:id", async (req, res) => {
  const { id } = req.params;
  await models.News.destroy({
    where: {
      id: id,
    },
  })
    .then((result) => {
      res.send(200);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send(err);
    });
});

// Class
router.get("/admin/classes", async (req, res) => {
  Class.query()
    .then((classes) => {
      return res.render("pages/Admin/Class/index", {
        currentAdmin: req.session.admin,
        classes: classes,
      });
    })
    .catch((err) => {
      console.log(err);
      return res.render("partials/page500");
    });
});

// ClassEnroll
router.get("/admin/classes/:id/enroll", async (req, res) => {
  const { id: classId } = req.params;

  ClassEnroll.query()
    .where({
      class_id: classId,
    })
    .withGraphFetched("[class]")
    .then((classEnrolls) => {
      return res.render("pages/Admin/ClassEnroll/index", {
        currentAdmin: req.session.admin,
        classEnrolls: classEnrolls,
      });
    })
    .catch((err) => {
      console.log(err);
      return res.render("partials/page500");
    });
});

// ClassEnrollHasStudent
router.get("/admin/class_enrolls/:id", async (req, res) => {
  const { id: classEnrollId } = req.params;

  ClassEnroll.query()
    .findById(classEnrollId)
    .withGraphFetched(
      "[students,class,class_enroll_subjects.[subject,attendances.[student_has_class_enroll.[student]]]]"
    )
    .then((classEnroll) => {
      for (let i = 0; i < classEnroll.class_enroll_subjects.length; i++) {
        classEnroll.class_enroll_subjects[i].attendances =
          classEnroll.class_enroll_subjects[i].attendances.reduce(
            (acc, curr) => {
              acc[curr.week] = curr;
              return acc;
            },
            {}
          );
      }
      return res.render("pages/Admin/ClassEnroll/Single/index", {
        currentAdmin: req.session.admin,
        classEnroll: classEnroll,
        semester: ClassEnroll.convertToRoman(classEnroll.semester),
      });
    })
    .catch((err) => {
      console.log(err);
      return res.render("partials/page500");
    });
});

// ClassEnrollHasStudent
router.get("/admin/class_enrolls/:id/students", async (req, res) => {
  const { id: classEnrollId } = req.params;
  const page = req.query.page || 1;
  const limit = 10;

  ClassEnroll.query()
    .findById(classEnrollId)
    .withGraphFetched("[class,students]")
    .then((classEnroll) => {
      const totalStudent = classEnroll.students.length;

      classEnroll.students = classEnroll.students.slice(
        limit * (page - 1),
        limit * (page - 1) + limit
      );

      return res.render("pages/Admin/ClassEnrollHasStudent/index", {
        currentAdmin: req.session.admin,
        classEnroll: classEnroll,
        total: totalStudent,
        totalPage: Math.ceil(totalStudent / limit),
        page: page || 1,
        semester: ClassEnroll.convertToRoman(classEnroll.semester),
      });
    })
    .catch((err) => {
      console.log(err);
      return res.render("partials/page500");
    });
});
// ClassEnrollHasStudent
router.post("/admin/class_enrolls/:id/students", async (req, res) => {
  const { id: classEnrollId } = req.params;
  const { nim } = req.body;

  StudentHasClassEnroll.query()
    .where({
      class_enroll_id: classEnrollId,
      student_nim: nim,
    })
    .first()
    .then(async (result) => {
      if (result) {
        return res.status(400).send();
      }

      await StudentHasClassEnroll.query().insert({
        class_enroll_id: classEnrollId,
        student_nim: nim,
      });

      return res.status(200).send();
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).send();
    });
});

router.post("/admin/students/search", async (req, res) => {
  Student.query()
    .where("nim", "like", `%${req.body.nim}%`)
    .limit(10)
    .context({
      runAfter: (students) => {
        students = students.map((student) => {
          delete student.password;
          return student;
        });

        return students;
      },
    })
    .then((students) => {
      return res.send(students);
    })
    .catch((err) => {
      console.log(err);
      return res.render("partials/page500");
    });
});

// Student
router.get("/admin/students/:nim", async (req, res) => {
  const { nim } = req.params;

  Student.query()
    .where({
      nim: nim,
    })
    .first()
    .then((student) => {
      if (!student) {
        return res.render("partials/page404");
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
