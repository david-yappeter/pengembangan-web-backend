const { Model, DataTypes } = require("sequelize/dist");
const timestampData = require("./global");

class Class extends Model {
  static tableName() {
    return "classes";
  }

  static sequelizeInit(sequelize) {
    this.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        studyProgram: {
          type: DataTypes.STRING(100),
          allowNull: false,
        },
        acronym: {
          type: DataTypes.STRING(10),
          allowNull: false,
        },
        letter: {
          type: DataTypes.STRING(5),
          allowNull: false,
        },
        ...timestampData(sequelize),
      },
      {
        sequelize,
        modelName: "Class",
        tableName: Class.tableName(),
      }
    );
  }
}

module.exports = {
  default: Class,
  Class,
};
