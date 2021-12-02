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
          allowNull: false,
        },
        startYear: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        semester: {
          type: DataTypes.INTEGER,
          allowNull: false,
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
