const express = require("express");
const path = require("path");
require("dotenv").config({
  path: path.resolve(__dirname, ".env.local"),
});
const cookieParser = require("cookie-parser");
const sequelize = require("./db/sequelize");

const app = express();
const PORT = process.env.PORT || 3000;

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
