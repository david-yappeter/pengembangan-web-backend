const { Model, DataTypes } = require("sequelize/dist");

class Subject extends Model {
  static tableName() {
    return "subjects";
  }

  static sequelizeInit(sequelize) {
    this.init(
      {
        code: {
          type: DataTypes.STRING(20),
          primaryKey: true,
        },
        name: {
          type: DataTypes.STRING(255),
        },
      },
      {
        sequelize,
        modelName: "Subject",
        tableName: Subject.tableName(),
      }
    );
  }
}

module.exports = {
  default: Subject,
  Subject,
};
