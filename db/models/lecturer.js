const { Model } = require("objection");

class Lecturer extends Model {
  static get tableName() {
    return "lecturers";
  }

  static get idColumn() {
    return "nip";
  }

  static get relationMappings() {
    const { ClassEnrollSubject } = require("./class_enroll_subject");
    const { LecturerTitle } = require("./lecturer_title");

    return {
      class_enroll_subjects: {
        relation: Model.HasManyRelation,
        modelClass: ClassEnrollSubject,
        join: {
          from: this.tableName + ".nip",
          to: ClassEnrollSubject.tableName + ".lecturer_nip",
        },
      },
      lecturer_titles: {
        relation: Model.HasManyRelation,
        modelClass: LecturerTitle,
        join: {
          from: this.tableName + ".nip",
          to: LecturerTitle.tableName + ".lecturer_nip",
        },
      },
    };
  }
}

module.exports = {
  default: Lecturer,
  Lecturer,
};
