const { Model } = require("objection");

class StudentHasClassEnroll extends Model {
  static get tableName() {
    return "student_has_class_enrolls";
  }

  static get relationMappings() {
    const { Student } = require("./student");
    const { ClassEnroll } = require("./class_enroll");
    const { Attendance } = require("./attendance");

    return {
      student: {
        relation: Model.BelongsToOneRelation,
        modelClass: Student,
        join: {
          from: this.tableName + ".student_nim",
          to: Student.tableName + ".nim",
        },
      },
      class_enroll: {
        relation: Model.BelongsToOneRelation,
        modelClass: ClassEnroll,
        join: {
          from: this.tableName + ".class_enroll_id",
          to: ClassEnroll.tableName + ".id",
        },
      },
      attendances: {
        relation: Model.HasManyRelation,
        modelClass: Attendance,
        join: {
          from: this.tableName + ".id",
          to: Attendance.tableName + ".student_has_class_enroll_id",
        },
      },
    };
  }
}

module.exports = {
  default: StudentHasClassEnroll,
  StudentHasClassEnroll,
};
