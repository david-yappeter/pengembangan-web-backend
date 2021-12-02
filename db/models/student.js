const { DataTypes, Model } = require("sequelize");

class Student extends Model {
  static tableName() {
    return "students";
  }

  static sequelizeInit(sequelize) {
    this.init(
      {
        nim: {
          type: DataTypes.BIGINT,
          primaryKey: true,
        },
        nik: {
          type: DataTypes.STRING(20),
        },
        place_of_birth: {
          type: DataTypes.STRING(100),
        },
        date_of_birth: {
          type: DataTypes.DATE,
        },
        religion: {
          type: DataTypes.STRING(20),
        },
        phone: {
          type: DataTypes.STRING(20),
        },
        phone: {
          type: DataTypes.STRING(20),
        },
        password: {
          type: DataTypes.STRING(100),
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
        modelName: "Student",
        tableName: Student.tableName(),
      }
    );
  }
}

module.exports = {
  default: Student,
  Student,
};
