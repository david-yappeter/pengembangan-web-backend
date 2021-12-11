exports.up = function (knex) {
  return knex.schema.createTable("rooms", (table) => {
    table.string("name", 100).primary();
    table.timestamps();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("rooms");
};
