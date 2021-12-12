const { Model } = require("objection");

class NewsCategory extends Model {
  static get tableName() {
    return "news_categories";
  }

  static get idColumn() {
    return "name";
  }

  static get relationMappings() {
    const { News } = require("./news");

    return {
      news: {
        relation: Model.HasManyRelation,
        modelClass: News,
        join: {
          from: this.tableName + ".name",
          to: News.tableName + ".news_category_name",
        },
      },
    };
  }
}

module.exports = {
  default: NewsCategory,
  NewsCategory,
};
