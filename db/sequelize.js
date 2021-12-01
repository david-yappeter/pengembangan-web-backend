const { Sequelize } = require("sequelize");
const { applyExtraSetup } = require("./extra-setup");
const sequelize = new Sequelize(
  process.env.DB_DATABASE,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "mysql",
    logging: true,
  }
);

const modelDefiners = [
  require("./models/student"),
  require("./models/class"),
  require("./models/subject"),
  require("./models/room"),
  require("./models/lecturer"),
  require("./models/class_enroll"),
  require("./models/student_has_class_enroll"),
  require("./models/class_enroll_subject"),
  require("./models/lecturer_title"),
  require("./models/attendance"),
];

for (const modelDefiner of modelDefiners) {
  modelDefiner.default.sequelizeInit(sequelize);
}

applyExtraSetup(sequelize);

module.exports = sequelize;
