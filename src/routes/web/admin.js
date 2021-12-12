const { Class } = require("../../../db/models/class");
const { ClassEnroll } = require("../../../db/models/class_enroll");
const { News } = require("../../../db/models/news");
const { NewsCategory } = require("../../../db/models/news_category");
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
router.get("/admin/class_enrolls/:id/students", async (req, res) => {
  const { id: classEnrollId } = req.params;
  const { page } = req.query;
  const limit = 3;

  ClassEnroll.query()
    .findById(classEnrollId)
    .withGraphFetched("[class,students(student)]")
    .modifiers({
      student: (builder) => {
        builder.limit(limit);
        builder.offset(limit * (page - 1));
      },
    })
    .then((classEnroll) => {
      console.log(classEnroll);
      return res.render("pages/Admin/ClassEnrollHasStudent/index", {
        currentAdmin: req.session.admin,
        classEnroll: classEnroll,
        page: page || 1,
        semester: ClassEnroll.convertToRoman(classEnroll.semester),
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
