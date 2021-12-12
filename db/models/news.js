const { Model } = require("objection");

class News extends Model {
  static get tableName() {
    return "news";
  }

  static get relationMappings() {
    const { NewsCategory } = require("./news_category");

    return {
      news_category: {
        relation: Model.BelongsToOneRelation,
        modelClass: NewsCategory,
        join: {
          from: this.tableName + ".news_category_name",
          to: NewsCategory.tableName + ".name",
        },
      },
    };
  }
}

module.exports = {
  default: News,
  News,
};
