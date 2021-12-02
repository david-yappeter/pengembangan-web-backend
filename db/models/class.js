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
        name: {
          type: DataTypes.STRING(100),
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
