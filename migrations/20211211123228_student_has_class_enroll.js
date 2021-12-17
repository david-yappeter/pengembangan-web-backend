exports.up = function (knex) {
  return knex.schema.createTable("student_has_class_enrolls", (table) => {
    table.increments("id").primary();
    table
      .bigInteger("student_nim")
      .references("nim")
      .inTable("students")
      .notNullable()
      .unsigned()
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
    table
      .integer("class_enroll_id")
      .references("class_enrolls.id")
      .notNullable()
      .unsigned()
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
    table.timestamps();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("student_has_class_enrolls");
};
