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
          allowNull: false,
        },
        title: {
          type: DataTypes.STRING(10),
          allowNull: false,
        },
        year: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        educationPlace: {
          type: DataTypes.STRING(100),
          allowNull: false,
        },
        field: {
          type: DataTypes.STRING(100),
          allowNull: false,
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
