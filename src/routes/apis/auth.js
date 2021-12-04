const bcryptjs = require("bcryptjs");
const express = require("express");
const { models } = require("../../../db/sequelize");

const router = express.Router();

router.post("/auth_login", async (req, res) => {
  const { username, password } = req.body;

  await models.Student.findOne({
    where: {
      nim: username,
    },
  })
    .then((result) => {
      if (result && bcryptjs.compareSync(password, result.toJSON().password)) {
        req.session.login = result.toJSON();
        req.session.isAuth = true;
        res.status(200).send();
      } else {
        res.status(403).send();
      }
    })
    .catch((err) => {
      return res.status(500).send();
    });
});

router.get("/logout", (req, res) => {
  req.session.isAuth = false;
  return res.redirect("/");
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
