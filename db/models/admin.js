const { Model, DataTypes } = require("sequelize/dist");
const timestampData = require("./global");

class Admin extends Model {
  static get tableName() {
    return "admins";
  }
}

module.exports = {
  default: Admin,
  Admin,
};
