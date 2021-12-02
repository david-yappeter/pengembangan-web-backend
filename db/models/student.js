const { DataTypes, Model } = require("sequelize");
const timestampData = require("./global");

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
        placeOfBirth: {
          type: DataTypes.STRING(100),
        },
        dateOfBirth: {
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
        ...timestampData(sequelize),
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
