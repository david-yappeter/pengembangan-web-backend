const { Model } = require("objection");
const timestampData = require("./global");

class Class extends Model {
  static get tableName() {
    return "classes";
  }

  static get relationMappings() {
    const { ClassEnroll } = require("./class_enroll");

    return {
      class_enrolls: {
        relation: Model.HasManyRelation,
        modelClass: ClassEnroll,
        join: {
          from: this.tableName + ".id",
          to: ClassEnroll.tableName + ".class_id",
        },
      },
    };
  }
}

module.exports = {
  default: Class,
  Class,
};
