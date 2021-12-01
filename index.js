const express = require("express");
const path = require("path");
require("dotenv").config({
  path: path.resolve(__dirname, ".env.local"),
});
const cookieParser = require("cookie-parser");
const sequelize = require("./db/sequelize");
const sessions = require("express-session");

const app = express();
const PORT = process.env.PORT || 3000;
const oneDay = 1000 * 60 * 60 * 24;

// app.use(
//   sessions({
//     secret: "tihasdasjfsmaskeyas25412ks",
//     saveUninitialized: true,
//     cookie: { maxAge: oneDay, httpOnly: true },
//     resave: false,
//   })
// );
app.use(express.urlencoded({ extended: true }));
// app.use(cookieParser());
app.use(express.static("public"));
app.set("view engine", "ejs");

app.use(require("./src/routes/apis/login"));
app.use(require("./src/routes/web/login"));

async function assertDatabaseConnectionOk() {
  console.log("Checking database connection...");
  try {
    await sequelize.authenticate();
    console.log("Database connection OK");

    sequelize.sync();
  } catch (error) {
    console.error("Unable to connect to the database:", error);
    console.log(error.message);
    process.exit(1);
  }
}

async function init() {
  await assertDatabaseConnectionOk();

  app.listen(PORT, () => {
    console.log(`Listen and serve at http://localhost:${PORT}`);
  });
}

init();
