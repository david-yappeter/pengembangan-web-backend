const router = require("express").Router();

router.get("/", async (req, res) => {
  res.render("pages/Login/index.ejs");
});

module.exports = router;
