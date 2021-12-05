const { Model, DataTypes } = require("sequelize/dist");
const timestampData = require("./global");

class ClassEnrollSubject extends Model {
  static tableName() {
    return "class_enroll_subjects";
  }

  static sortArray(arr) {
    const valObj = {
      Senin: 1,
      Selasa: 2,
      Rabu: 3,
      Kamis: 4,
      Jumat: 5,
    };

    arr.sort((first, second) => {
      return valObj[first] > valObj[second] ? -1 : 1;
    });

    return arr;
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
