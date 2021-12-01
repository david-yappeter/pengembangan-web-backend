const { Model, DataTypes } = require("sequelize/dist");

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
