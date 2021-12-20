const { Model } = require("objection");

class Room extends Model {
  static get tableName() {
    return "rooms";
  }

  static get idColumn() {
    return "name";
  }

  static get relationMappings() {
    const { ClassEnrollSubject } = require("./class_enroll_subject");

    return {
      classEnrollSubjects: {
        relation: Model.HasManyRelation,
        modelClass: ClassEnrollSubject,
        join: {
          from: this.tableName + ".name",
          to: ClassEnrollSubject.tableName + ".room_name",
        },
      },
    };
  }
}

module.exports = {
  default: Room,
  Room,
};
