const router = require("express").Router();

router.get("/home", (req, res) => {
  if (req.session.isAuth) {
    res.send("Welcome to the Student Home Page");
  } else {
    res.redirect("/");
  }
});

router.get("/berita", (req, res) => {
  if (req.session.isAuth) {
    res.render("pages/Student/berita");
  } else {
    res.redirect("/");
  }
});

module.exports = router;
