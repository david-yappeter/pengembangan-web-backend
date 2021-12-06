const router = require("express").Router();

router.get("/", (req, res) => {
  if (req.session.isAuth) {
    res.redirect("/berita");
  } else {
    res.render("pages/Login/student.ejs");
  }
});

router.get("/admin/login", (req, res) => {
  if (req.session.isAdmin) {
    res.redirect("/admin");
  } else {
    res.render("pages/Login/admin.ejs");
  }
});

module.exports = router;
