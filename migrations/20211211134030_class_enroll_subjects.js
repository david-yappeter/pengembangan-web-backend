exports.up = function (knex) {
  return knex.schema.createTable("class_enroll_subjects", (table) => {
    table.increments("id").primary().unsigned();
    table
      .enu("day", ["Senin", "Selasa", "Rabu", "Kamis", "Jumat"])
      .notNullable();
    table.time("start_time").notNullable();
    table.time("end_time").notNullable();
    table.timestamps(true, true);

    table
      .integer("class_enroll_id")
      .references("id")
      .inTable("class_enrolls")
      .notNullable()
      .unsigned()
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
    table
      .string("subject_code")
      .references("code")
      .inTable("subjects")
      .notNullable()
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
    table
      .bigInteger("lecturer_nip")
      .references("nip")
      .inTable("lecturers")
      .notNullable()
      .unsigned()
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
    table
      .string("room_name")
      .references("name")
      .inTable("rooms")
      .notNullable()
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("class_enroll_subjects");
};
