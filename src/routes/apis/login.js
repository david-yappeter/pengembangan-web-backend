const express = require("express");
const sequelize = require("../../../db/sequelize");

const router = express.Router();

router.get("/a", async (req, res) => {
  console.log(req.session);
  console.log(req.session.id);
  console.log(req.session.cookie);

  res.send("hello");
  // const temp = await sequelize.models.user.findAll();
  // console.log(temp);
});

router.post("/auth_login", (req, res) => {
  const { username, password } = req.body;

  if (username === "admin" && password === "admin") {
    req.session.username = "admin";
    req.session.isAuth = true;
    return res.status(200).send();
  } else {
    return res.status(403).send();
  }
});

// passport.use(
//   new CookieStrategy(function (token, done) {
//     done(null, { id: "123", username: "test" });
//   })
// );
// passport.use(
//   new CookieStrategy(function (token, done) {
//     done(null, { id: "123", username: "test" });
//   })
// );

// router.get(
//   "/api/users/profile",
//   passport.authenticate("cookie", { session: false }),
//   function (req, res) {
//     res.json(req);
//   }
// );

// router.post("/api/users/login", (req, res) => {
//   res.cookie(
//     "token",
//     {
//       val: "of cookie",
//     },
//     {
//       httpOnly: true,
//     }
//   );

//   return res.status(200).send();
// });

module.exports = router;
