exports.up = function (knex) {
  return knex.schema.table("class_enrolls", function (table) {
    table
      .bigInteger("lecturer_nip")
      .unsigned()
      .notNullable()
      .references("nip")
      .inTable("lecturers")
      .onDelete("CASCADE")
      .onUpdate("CASCADE")
      .after("updated_at");
  });
};

exports.down = function (knex) {
  return knex.schema.table("class_enrolls", function (table) {
    table.dropForeign("lecturer_nip");
  });
};
