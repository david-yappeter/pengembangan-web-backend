const { Model, DataTypes } = require("sequelize/dist");

class ClassEnroll extends Model {
  static tableName() {
    return "class_enrolls";
  }

  static sequelizeInit(sequelize) {
    this.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        start_year: {
          type: DataTypes.INTEGER,
        },
        semester: {
          type: DataTypes.INTEGER,
        },
      },
      {
        sequelize,
        modelName: "ClassEnroll",
        tableName: ClassEnroll.tableName(),
      }
    );
  }
}

module.exports = {
  default: ClassEnroll,
  ClassEnroll,
};
