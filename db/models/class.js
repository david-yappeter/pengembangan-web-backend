const { Model, DataTypes } = require("sequelize/dist");

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
