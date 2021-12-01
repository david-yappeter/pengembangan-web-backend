const { Model, DataTypes } = require("sequelize/dist");

class StudentHasClassEnroll extends Model {
  static tableName() {
    return "student_has_class_enrolls";
  }

  static sequelizeInit(sequelize) {
    this.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
      },
      {
        sequelize,
        modelName: "StudentHasClassEnroll",
        tableName: StudentHasClassEnroll.tableName(),
      }
    );
  }
}

module.exports = {
  default: StudentHasClassEnroll,
  StudentHasClassEnroll,
};
