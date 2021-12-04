const { Model, DataTypes } = require("sequelize/dist");
const timestampData = require("./global");

class ClassEnroll extends Model {
  static tableName() {
    return "class_enrolls";
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

  static sequelizeInit(sequelize) {
    this.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        startYear: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        semester: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        time: {
          type: DataTypes.ENUM("Pagi", "Sore"),
          allowNull: false,
        },
        ...timestampData(sequelize),
      },
      {
        sequelize,
        modelName: "ClassEnroll",
        tableName: ClassEnroll.tableName(),
      }
    );
  }
}

module.exports = {
  default: ClassEnroll,
  ClassEnroll,
};
