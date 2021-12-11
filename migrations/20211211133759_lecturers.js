exports.up = function (knex) {
  return knex.schema.createTable("lecturers", (table) => {
    table.bigInteger("nip").primary().unsigned();
    table.string("name", 255).notNullable();
    table.integer("status").notNullable();
    table.enu("sex", ["L", "P"]).notNullable();
    table.string("email", 100).notNullable();
    table.timestamps();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("lecturers");
};
