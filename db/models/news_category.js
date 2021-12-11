const { DataTypes, Model } = require("sequelize/dist");
const timestampData = require("./global");

class NewsCategory extends Model {
  static tableName() {
    return "news_categories";
  }

  static sequelizeInit(sequelize) {
    this.init(
      {
        name: {
          type: DataTypes.STRING(45),
          primaryKey: true,
        },
        ...timestampData(sequelize),
      },
      {
        sequelize,
        modelName: "NewsCategory",
        tableName: NewsCategory.tableName(),
      }
    );
  }
}

module.exports = {
  default: NewsCategory,
  NewsCategory,
};
