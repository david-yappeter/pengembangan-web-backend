exports.up = function (knex) {
  return knex.schema.createTable("class_enrolls", (table) => {
    table.increments("id").primary().unsigned();
    table.integer("start_year").notNullable();
    table.integer("semester").notNullable();
    table.enu("time", ["Pagi", "Sore"]).notNullable();
    table.timestamps(true, true);

    table
      .integer("class_id")
      .references("id")
      .inTable("classes")
      .notNullable()
      .unsigned()
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("class_enrolls");
};
