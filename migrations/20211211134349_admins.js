exports.up = function (knex) {
  return knex.schema.createTable("admins", (table) => {
    table.increments("id").primary();
    table.string("name", 255).notNullable();
    table.string("username", 255).notNullable();
    table.string("password", 255).notNullable();
    table.timestamps();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("admins");
};
