const { DataTypes, Model } = require("sequelize");
const sequelize = require("../db/sequelize");

class Student extends Model {
  static tableName() {
    return "students";
  }
}

Student.init(
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
    modelName: "student",
    tableName: Student.tableName(),
  }
);

module.exports = Student;
