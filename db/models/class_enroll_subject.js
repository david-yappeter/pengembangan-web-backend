const { Model, DataTypes } = require("sequelize/dist");
const timestampData = require("./global");

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
          allowNull: false,
        },
        startTime: {
          type: DataTypes.TIME,
          allowNull: false,
        },
        endTime: {
          type: DataTypes.TIME,
          allowNull: false,
        },
        ...timestampData(sequelize),
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
