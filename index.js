const express = require("express");
const cookieParser = require("cookie-parser");
require("dotenv").config({ path: __dirname + "/.env.local" });
// require("dotenv").config();
// const sequelize = require("./db/sequelize");
// const Student = require("./entity/student");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static("public"));
app.set("view engine", "ejs");

app.use(require("./src/routes/apis/login"));
// app.use(require("./src/routes/web/login"));

app.listen(PORT, () => {
  console.log(`Listen and serve at http://localhost:${PORT}`);
});
