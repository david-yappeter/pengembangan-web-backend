const router = require("express").Router();

router.get("/", async (req, res) => {
  res.render("./pages/Login/index");
});

module.exports = router;
