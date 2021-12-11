exports.up = function (knex) {
  return knex.schema.createTable("news_categories", (table) => {
    table.string("name", 45).primary();
    table.timestamps();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("news_categories");
};
