const { Model } = require("objection");

class Attendance extends Model {
  static get tableName() {
    return "attendances";
  }

  static get relationMappings() {
    const { StudentHasClassEnroll } = require("./student_has_class_enroll");
    const { ClassEnrollSubject } = require("./class_enroll_subject");

    return {
      student_has_class_enroll: {
        relation: Model.BelongsToOneRelation,
        modelClass: StudentHasClassEnroll,
        join: {
          from: this.tableName + ".student_has_class_enroll_id",
          to: StudentHasClassEnroll.tableName + ".id",
        },
      },
      class_enroll_subject: {
        relation: Model.BelongsToOneRelation,
        modelClass: ClassEnrollSubject,
        join: {
          from: this.tableName + ".class_enroll_subject_id",
          to: ClassEnrollSubject.tableName + ".id",
        }
      },
    };
  }

  static sequelizeInit(sequelize) {
    this.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        week: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        status: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        ...timestampData(sequelize),
      },
      {
        sequelize,
        modelName: "Attendance",
        tableName: Attendance.tableName(),
      }
    );
  }
}

module.exports = {
  default: Attendance,
  Attendance,
};
