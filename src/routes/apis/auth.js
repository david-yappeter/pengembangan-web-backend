const bcryptjs = require("bcryptjs");
const express = require("express");
const { Admin } = require("../../../db/models/admin");
const { Student } = require("../../../db/models/student");

const router = express.Router();

router.post("/auth_login", async (req, res) => {
  const { username, password } = req.body;

  Student.query()
    .where({
      nim: username,
    })
    .first()
    .then((result) => {
      if (result && bcryptjs.compareSync(password, result.password)) {
        req.session.login = result;
        req.session.isAuth = true;
        res.status(200).send();
      } else {
        res.status(403).send();
      }
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).send();
    });
});

router.post("/admin/auth_login", async (req, res) => {
  const { username, password } = req.body;

  Admin.query()
    .where({
      username: username,
    })
    .first()
    .then((result) => {
      if (result && bcryptjs.compareSync(password, result.password)) {
        req.session.admin = result;
        req.session.isAdmin = true;
        res.status(200).send();
      } else {
        res.status(403).send();
      }
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).send();
    });
});

router.get("/logout", (req, res) => {
  req.session.isAuth = false;
  return res.redirect("/");
});

router.get("/admin/logout", (req, res) => {
  req.session.isAdmin = false;
  return res.redirect("/admin");
});

module.exports = router;
