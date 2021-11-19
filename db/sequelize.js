const { Sequelize } = require("sequelize");

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

// (async () => {
//   try {
//     await sequelize.authenticate();
//     console.log("Connection has been established");
//   } catch (err) {
//     console.log("Unable to connect to database");
//   }
// })();

exports.default = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established");
    return sequelize;
  } catch (err) {
    console.log("Unable to connect to database");
    throw new Error(err);
  }
};
