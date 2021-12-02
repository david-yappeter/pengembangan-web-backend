const { Model, DataTypes } = require("sequelize/dist");
const timestampData = require("./global");

class News extends Model {
  static tableName() {
    return "news";
  }

  static sequelizeInit(sequelize) {
    this.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        title: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
        content: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        ...timestampData(sequelize),
      },
      {
        sequelize,
        modelName: "News",
        tableName: News.tableName(),
      }
    );
  }
}

module.exports = {
  default: News,
  News,
};
