const { DataTypes, Model } = require("sequelize");
const timestampData = require("./global");
const bcryptjs = require("bcryptjs");

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
        name: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
        nik: {
          type: DataTypes.STRING(20),
          allowNull: false,
        },
        placeOfBirth: {
          type: DataTypes.STRING(100),
          allowNull: false,
        },
        dateOfBirth: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        religion: {
          type: DataTypes.STRING(20),
          allowNull: false,
        },
        phone: {
          type: DataTypes.STRING(20),
          allowNull: false,
        },
        password: {
          type: DataTypes.STRING(100),
          allowNull: false,
        },
        status: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        sex: {
          type: DataTypes.ENUM("L", "P"),
          allowNull: false,
        },
        email: {
          type: DataTypes.STRING(100),
          allowNull: false,
        },
        role: {
          type: DataTypes.ENUM("student", "dosen"),
        },
        ...timestampData(sequelize),
      },
      {
        sequelize,
        modelName: "Student",
        tableName: Student.tableName(),
        hooks: {
          beforeCreate: (student, options) => {
            student.password = bcryptjs.hashSync(student.password, 10);
          },
        },
      }
    );
  }
}

module.exports = {
  default: Student,
  Student,
};
