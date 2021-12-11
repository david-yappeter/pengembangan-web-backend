exports.up = function (knex) {
  return knex.schema.createTable("class_enroll_subjects", (table) => {
    table.increments("id").primary().unsigned();
    table
      .enu("day", ["Senin", "Selasa", "Rabu", "Kamis", "Jumat"])
      .notNullable();
    table.time("start_time").notNullable();
    table.time("end_time").notNullable();
    table.timestamps();

    table
      .integer("class_enroll_id")
      .references("id")
      .inTable("class_enrolls")
      .onDelete("CASCADE")
      .onUpdate("CASCADE")
      .notNullable()
      .unsigned();
    table
      .string("subjects_code")
      .references("code")
      .inTable("subjects")
      .onDelete("CASCADE")
      .notNullable()
      .onUpdate("CASCADE");
    table
      .bigInteger("lecturer_nip")
      .references("nip")
      .inTable("lecturers")
      .onDelete("CASCADE")
      .onUpdate("CASCADE")
      .notNullable()
      .unsigned();
    table
      .string("room_name")
      .references("name")
      .inTable("rooms")
      .onDelete("CASCADE")
      .onUpdate("CASCADE")
      .notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("class_enroll_subjects");
};
