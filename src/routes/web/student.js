const { models } = require("../../../db/sequelize");

const router = require("express").Router();

router.get("/home", (req, res) => {
  if (req.session.isAuth) {
    res.send("Welcome to the Student Home Page");
  } else {
    res.redirect("/");
  }
});

router.get("/berita", async (req, res) => {
  if (req.session.isAuth) {
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
          currentStudent: req.session.student,
        });
      })
      .catch((err) => {
        return res.render("partials/page500");
      });
  } else {
    return res.redirect("/");
  }
});

module.exports = router;
