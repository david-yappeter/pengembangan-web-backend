const { Model, DataTypes } = require("sequelize/dist");

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
        education_place: {
          type: DataTypes.STRING(100),
        },
        field: {
          type: DataTypes.STRING(100),
        },
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
}
