const { models } = require("../../../db/sequelize");

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

router.get("/profile", async (req, res) => {
  res.render("pages/Student/Profile/index", {
    currentLogin: req.session.login,
  });
});

module.exports = router;
