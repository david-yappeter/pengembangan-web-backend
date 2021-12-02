const { Model, DataTypes } = require("sequelize/dist");
const timestampData = require("./global");

class ClassEnroll extends Model {
  static tableName() {
    return "class_enrolls";
  }

  static sequelizeInit(sequelize) {
    this.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        startYear: {
          type: DataTypes.INTEGER,
        },
        semester: {
          type: DataTypes.INTEGER,
        },
        ...timestampData(sequelize),
      },
      {
        sequelize,
        modelName: "ClassEnroll",
        tableName: ClassEnroll.tableName(),
      }
    );
  }
}

module.exports = {
  default: ClassEnroll,
  ClassEnroll,
};
