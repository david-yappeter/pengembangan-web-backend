const { Model, DataTypes } = require("sequelize/dist");

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
        },
        status: {
          type: DataTypes.INTEGER,
        },
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
