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
    raw: true,
  })
    .then((students) => {
      console.log(students);
      res.send(students);
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
    raw: true,
  })
    .then((result) => {
      return res.render("pages/Student/berita", {
        news: result.rows,
        count: result.count,
        page: req.query.page ? req.query.page : 1,
        currentLogin: req.session.login,
      });
    })
    .catch((err) => {
      return res.render("partials/page500");
    });
});

router.get("/berita/detail/:id", async (req, res) => {
  await models.News.findOne({
    where: {
      id: req.params.id,
    },
    raw: true,
  })
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
      return res.render("partials/page500");
    });
});

router.get("/profile", async (req, res) => {
  res.render("pages/Student/Profile/index", {
    currentLogin: req.session.login,
  });
});

module.exports = router;
