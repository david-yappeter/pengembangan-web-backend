const { Model } = require("objection");

class Subject extends Model {
  static get tableName() {
    return "subjects";
  }

  static get idColumn() {
    return "code";
  }

  static get relationMappings() {
    const { ClassEnrollSubject } = require("./class_enroll_subject");

    return {
      class_enroll_subjects: {
        relation: Model.HasManyRelation,
        modelClass: ClassEnrollSubject,
        join: {
          from : this.tableName + ".code",
          to: ClassEnrollSubject.tableName + ".subject_code"
        }
      }
    }
  }
}

module.exports = {
  default: Subject,
  Subject,
};
