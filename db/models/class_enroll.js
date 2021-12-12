const { Model } = require("objection");

class ClassEnroll extends Model {
  static get tableName() {
    return "class_enrolls";
  }

  static get relationMappings() {
    const { Class } = require("./class");
    const { ClassEnrollSubject } = require("./class_enroll_subject");
    const { Student } = require("./student");
    const { Lecturer } = require("./lecturer");
    const { StudentHasClassEnroll } = require("./student_has_class_enroll");

    return {
      class: {
        relation: Model.BelongsToOneRelation,
        modelClass: Class,
        join: {
          from: this.tableName + ".class_id",
          to: Class.tableName + ".id",
        },
      },
      class_enroll_subjects: {
        relation: Model.HasManyRelation,
        modelClass: ClassEnrollSubject,
        join: {
          from: this.tableName + ".id",
          to: ClassEnrollSubject.tableName + ".class_enroll_id",
        },
      },
      students: {
        relation: Model.ManyToManyRelation,
        modelClass: Student,
        join: {
          from: this.tableName + ".id",
          through: {
            from: StudentHasClassEnroll.tableName + ".class_enroll_id",
            to: StudentHasClassEnroll.tableName + ".student_nim",
          },
          to: Student.tableName + ".nim",
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
    };
  }

  static convertToRoman(num) {
    function romanize(num) {
      if (isNaN(num)) return NaN;
      var digits = String(+num).split(""),
        key = [
          "",
          "C",
          "CC",
          "CCC",
          "CD",
          "D",
          "DC",
          "DCC",
          "DCCC",
          "CM",
          "",
          "X",
          "XX",
          "XXX",
          "XL",
          "L",
          "LX",
          "LXX",
          "LXXX",
          "XC",
          "",
          "I",
          "II",
          "III",
          "IV",
          "V",
          "VI",
          "VII",
          "VIII",
          "IX",
        ],
        roman = "",
        i = 3;
      while (i--) roman = (key[+digits.pop() + i * 10] || "") + roman;
      return Array(+digits.join("") + 1).join("M") + roman;
    }

    return romanize(num);
  }
}

module.exports = {
  default: ClassEnroll,
  ClassEnroll,
};
