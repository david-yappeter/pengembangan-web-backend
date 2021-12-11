exports.up = function (knex) {
  return knex.schema.alterTable("attendances", (table) => {
    table
      .integer("student_has_class_enroll_id")
      .notNullable()
      .unsigned()
      .references("id")
      .inTable("student_has_class_enrolls");
    table
      .integer("class_enroll_subject_id")
      .notNullable()
      .unsigned()
      .references("id")
      .inTable("class_enroll_subjects");
  });
};

exports.down = function (knex) {
  return knex.schema.alterTable("attendances", (table) => {
    table.dropForeign("student_has_class_enroll_id");
    table.dropForeign("class_enroll_subject_id");
  });
};
