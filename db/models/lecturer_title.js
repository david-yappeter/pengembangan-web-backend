const { Model, DataTypes } = require("sequelize/dist");
const timestampData = require("./global");

class LecturerTitle extends Model {
  static tableName() {
    return "lecturer_titles";
  }

  static sequelizeInit(sequelize) {
    this.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        level: {
          type: DataTypes.STRING(10),
        },
        title: {
          type: DataTypes.STRING(10),
        },
        year: {
          type: DataTypes.INTEGER,
        },
        educationPlace: {
          type: DataTypes.STRING(100),
        },
        field: {
          type: DataTypes.STRING(100),
        },
        ...timestampData(sequelize),
      },
      {
        sequelize,
        modelName: "LecturerTitle",
        tableName: "lecturer_titles",
      }
    );
  }
}

module.exports = {
  default: LecturerTitle,
  LecturerTitle,
};
