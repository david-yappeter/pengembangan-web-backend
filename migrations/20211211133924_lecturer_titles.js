exports.up = function (knex) {
  return knex.schema.createTable("lecturer_titles", (table) => {
    table.increments("id").primary();
    table.string("level", 10).notNullable();
    table.string("title", 10).notNullable();
    table.integer("year").notNullable();
    table.string("education_place", 100).notNullable();
    table.string("field", 100).notNullable();
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("lecturer_titles");
};
