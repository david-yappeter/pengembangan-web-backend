const { Model, DataTypes } = require("sequelize/dist");
const timestampData = require("./global");

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
          allowNull: false,
        },
        ...timestampData(sequelize),
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
