const express = require("express");
const { userInfo } = require("os");
const passport = require("passport");
const CookieStrategy = require("passport-cookie");

const router = express.Router();

router.post("/auth_login", (req, res) => {
  console.log(req.body);
  return res.status(200).json({ hello: "world" });
  // return res.status(200).json({ hello: "world" });
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
