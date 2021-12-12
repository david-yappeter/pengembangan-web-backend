const { Model } = require("objection");

class Admin extends Model {
  static get tableName() {
    return "admins";
  }
}

module.exports = {
  default: Admin,
  Admin,
};
