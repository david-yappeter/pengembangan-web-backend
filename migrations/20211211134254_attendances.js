exports.up = function (knex) {
  return knex.schema.createTable("attendances", (table) => {
    table.increments("id").primary();
    table.integer("week").notNullable();
    table.integer("status").notNullable();
    table.timestamps();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("attendances");
};
