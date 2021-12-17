const { Student } = require("../../../db/models/student");

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

router.get("/test", async (req, res) => {
  const resp = await Student.query().first();
  console.log(resp);

  res.send("asd");
});

module.exports = router;
