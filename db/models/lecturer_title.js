const { Model } = require("objection");

class LecturerTitle extends Model {
  static get tableName() {
    return "lecturer_titles";
  }

  static get relationMappings() {
    const { Lecturer } = require("./lecturer");

    return {
      lecturer: {
        relation: Model.BelongsToOneRelation,
        modelClass: Lecturer,
        join: {
          from: this.tableName + ".lecturer_nip",
          to: Lecturer.tableName + ".nip",
        },
      },
    };
  }
}

module.exports = {
  default: LecturerTitle,
  LecturerTitle,
};
