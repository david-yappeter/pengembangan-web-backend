const { Model, DataTypes } = require("sequelize/dist");
const timestampData = require("./global");

class Attendance extends Model {
  static tableName() {
    return "attendance";
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
