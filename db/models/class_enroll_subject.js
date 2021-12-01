const { Model, DataTypes } = require("sequelize/dist");

class ClassEnrollSubject extends Model {
  static tableName() {
    return "class_enroll_subjects";
  }

  static sequelizeInit(sequelize) {
    this.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        day: {
          type: DataTypes.ENUM("Senin", "Selasa", "Rabu", "Kamis", "Jumat"),
        },
        start_time: {
          type: DataTypes.TIME,
        },
        end_time: {
          type: DataTypes.TIME,
        },
      },
      {
        sequelize,
        modelName: "ClassEnrollSubject",
        tableName: ClassEnrollSubject.tableName(),
      }
    );
  }
}

module.exports = {
  default: ClassEnrollSubject,
  ClassEnrollSubject,
};
