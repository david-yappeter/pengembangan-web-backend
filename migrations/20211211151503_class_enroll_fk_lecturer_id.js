exports.up = function (knex) {
  return knex.schema.table("class_enrolls", function (table) {
    table
      .bigInteger("lecturer_nip")
      .unsigned()
      .notNullable()
      .references("nip")
      .inTable("lecturers")
      .after("updated_at")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
  });
};

exports.down = function (knex) {
  return knex.schema.table("class_enrolls", function (table) {
    table.dropForeign("lecturer_nip");
  });
};
