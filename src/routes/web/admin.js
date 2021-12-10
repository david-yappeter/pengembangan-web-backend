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
  await models.News.findAndCountAll({
    limit: 10,
    offset: req.query.page ? (req.query.page - 1) * 10 : 0,
  })
    .then((result) => {
      result.rows = result.rows.map((item) => item.toJSON());
      return res.render("pages/Admin/berita", {
        news: result.rows,
        count: result.count,
        page: req.query.page ? req.query.page : 1,
        currentAdmin: req.session.admin,
      });
    })
    .catch((err) => {
      console.log(err);
      return res.render("partials/page500");
    });
});

router.get("/admin/berita/detail/:id", async (req, res) => {
  await models.News.findOne({
    where: {
      id: req.params.id,
    },
  })
    .then((result) => {
      result = result.toJSON();
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
  await models.NewsCategory.findAll()
    .then((result) => {
      result = result.map((item) => item.toJSON());
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
      console.log(result);
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
      console.log(result);
      res.send(200);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send(err);
    });
});

// Class
router.get("/admin/classes", async (req, res) => {
  await models.Class.findAll()
    .then((classes) => {
      classes = classes.map((kelas) => kelas.toJSON());
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
  await models.ClassEnroll.findAll({
    where: {
      classes_id: classId,
    },
    include: [models.Class],
  })
    .then((classEnrolls) => {
      classEnrolls = classEnrolls.map((classEnroll) => classEnroll.toJSON());
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
router.get("/admin/classes/:id/enroll/students", async (req, res) => {
  const { id: classId } = req.params;
  const { page } = req.query;
  await models.ClassEnroll.findOne({
    where: {
      classes_id: classId,
    },
    include: [
      models.Class,
      {
        model: models.StudentHasClassEnroll,
        include: [
          {
            model: models.Student,
            limit: 5,
            offset: page ? (page - 1) * 5 : 0,
            separate: true,
          },
        ],
      },
    ],
  })
    .then((classEnroll) => {
      classEnroll = classEnroll.toJSON();
      console.log(classEnroll);
      return res.render("pages/Admin/ClassEnrollHasStudent/index", {
        currentAdmin: req.session.admin,
        classEnroll: classEnroll,
        page: page ? page : 1,
        semester: models.ClassEnroll.convertToRoman(classEnroll.semester),
      });
    })
    .catch((err) => {
      console.log(err);
      return res.render("partials/page500");
    });
});

// Student
router.get("/admin/students", async (req, res) => {});

module.exports = router;
