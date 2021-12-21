exports.up = function (knex) {
  return knex.schema.createTable("students", (table) => {
    table.bigInteger("nim").primary().unsigned();
    table.string("name", 255).notNullable();
    table.string("nik", 20).notNullable();
    table.string("place_of_birth", 100).notNullable();
    table.date("date_of_birth").notNullable();
    table.string("religion", 20).notNullable();
    table.string("phone", 20).notNullable();
    table.string("password", 100).notNullable();
    table.integer("status").notNullable();
    table.enu("sex", ["L", "P"]).notNullable();
    table.string("email", 100).notNullable();
    table.enu("role", ["student", "dosen"]).notNullable();
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("students");
};
