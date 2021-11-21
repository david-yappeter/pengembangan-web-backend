const router = require("express").Router();

router.get("/", (req, res) => {
  res.render("pages/Login/index.ejs");
});

module.exports = router;
