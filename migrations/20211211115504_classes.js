exports.up = function (knex) {
  return knex.schema.createTable("classes", (table) => {
    table.increments("id").primary().unsigned();
    table.string("study_program", 100).notNullable();
    table.string("acronym", 10).notNullable();
    table.string("letter", 5).notNullable();
    table.timestamps();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("classes");
};
