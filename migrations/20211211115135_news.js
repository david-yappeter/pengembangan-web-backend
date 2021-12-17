exports.up = function (knex) {
  return knex.schema.createTable("news", (table) => {
    table.increments("id").primary();
    table.string("title", 255).notNullable();
    table.text("content").notNullable();
    table.timestamps();

    table
      .string("news_category_name", 45)
      .notNullable()
      .references("name")
      .inTable("news_categories")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("news");
};
