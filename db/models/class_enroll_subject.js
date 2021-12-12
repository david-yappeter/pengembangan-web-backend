const { Model } = require("objection");

class ClassEnrollSubject extends Model {
  static get tableName() {
    return "class_enroll_subjects";
  }

  static sortArray(arr) {
    const valObj = {
      Senin: 1,
      Selasa: 2,
      Rabu: 3,
      Kamis: 4,
      Jumat: 5,
    };

    arr.sort((first, second) => {
      return valObj[first] > valObj[second] ? -1 : 1;
    });

    return arr;
  }

  static get relationMappings() {
    const { Room } = require("./room");
    const { Subject } = require("./subject");
    const { ClassEnroll } = require("./class_enroll");
    const { Lecturer } = require("./lecturer");
    const { Attendance } = require("./attendance")

    return {
      room: {
        relation: Model.BelongsToOneRelation,
        modelClass: Room,
        join: {
          from: this.tableName + ".room_name",
          to: Room.tableName + ".name",
        },
      },
      subject: {
        relation: Model.BelongsToOneRelation,
        modelClass: Subject,
        join: {
          from: this.tableName + ".subject_code",
          to: Subject.tableName + ".code",
        },
      },
      class_enroll_subject: {
        relation: Model.BelongsToOneRelation,
        modelClass: ClassEnroll,
        join: {
          from: this.tableName + ".class_enroll_id",
          to: ClassEnroll.tableName + ".id",
        },
      },
      lecturer: {
        relation: Model.BelongsToOneRelation,
        modelClass: Lecturer,
        join: {
          from: this.tableName + ".lecturer_nip",
          to: Lecturer.tableName + ".nip",
        },
      },
      attendances: {
        relation: Model.HasManyRelation,
        modelClass: Attendance,
        join: {
          from: this.tableName + ".id",
          to: Attendance.tableName + ".class_enroll_subject_id",
        }
      }
    };
  }
}

module.exports = {
  default: ClassEnrollSubject,
  ClassEnrollSubject,
};
