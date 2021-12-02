const express = require("express");
const path = require("path");
require("express-async-errors");
require("dotenv").config({
  path: path.resolve(__dirname, ".env.local"),
});
const sequelize = require("./db/sequelize");
const session = require("express-session");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(
  session({
    secret: "keyboasrd secasdet",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: null,
      httpOnly: true,
    },
    name: "mikro_session",
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

app.use(require("./src/routes/apis/auth"));
app.use(require("./src/routes/web/login"));
app.use(require("./src/routes/web/student"));

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
