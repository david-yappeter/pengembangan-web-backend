const { Model, DataTypes } = require("sequelize/dist");
const timestampData = require("./global");

class Lecturer extends Model {
  static tableName() {
    return "lecturers";
  }

  static sequelizeInit(sequelize) {
    this.init(
      {
        nip: {
          type: DataTypes.BIGINT,
          primaryKey: true,
        },
        name: {
          type: DataTypes.STRING(255),
        },
        status: {
          type: DataTypes.INTEGER,
        },
        sex: {
          type: DataTypes.ENUM("L", "P"),
        },
        email: {
          type: DataTypes.STRING(100),
        },
        ...timestampData(sequelize),
      },
      {
        sequelize,
        modelName: "Lecturer",
        tableName: Lecturer.tableName(),
      }
    );
  }
}

module.exports = {
  default: Lecturer,
  Lecturer,
};
