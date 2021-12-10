
exports.up = function(knex) {
  return knex.schema.createTable("subjects", (table) => {
    table.string("code").primary();
    table.string("name", 255).notNullable();
    table.timestamps();
  })
};

exports.down = function(knex) {
  
};
