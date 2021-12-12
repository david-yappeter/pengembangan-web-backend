const { Model } = require("objection");
const bcryptjs = require("bcryptjs");

class Student extends Model {
  static get tableName() {
    return "students";
  }

  static get idColumn() {
    return "nim";
  }

  $beforeInsert() {
    this.password = bcryptjs.hashSync(this.password, 10);
  }

  static get relationMappings() {
    const { StudentHasClassEnroll } = require("./student_has_class_enroll");
    const { ClassEnroll } = require("./class_enroll");

    return {
      student_has_class_enroll: {
        relation: Model.HasManyRelation,
        modelClass: StudentHasClassEnroll,
        join: {
          from: this.tableName + ".nim",
          to: StudentHasClassEnroll.tableName + ".student_nim",
        },
      },
      class_enrolls: {
        relation: Model.ManyToManyRelation,
        modelClass: ClassEnroll,
        join: {
          from: this.tableName + ".nim",
          through: {
            from: StudentHasClassEnroll.tableName + ".student_nim",
            to: StudentHasClassEnroll.tableName + ".class_enroll_id",
          },
          to: ClassEnroll.tableName + ".id",
        },
      },
    };
  }
}

module.exports = {
  default: Student,
  Student,
};
