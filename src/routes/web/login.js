const router = require("express").Router();

router.get("/", (req, res) => {
  if(req.session.isAuth) {
    res.redirect("/berita");
  } else {
    res.render("pages/Login/index.ejs");
  }
});

module.exports = router;
