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
    const news = await models.News.findAll({
      limit: 5,
      offset: 0,
    }).then((result) => {
      // console.log(result);
      // console.log(result.rows[0]);
      console.log(result);
      console.log(result.id);
      console.log(result.title);
    });
    res.render("pages/Student/berita");
  } else {
    res.redirect("/");
  }
});

module.exports = router;
