const { Model, DataTypes } = require("sequelize/dist");
const timestampData = require("./global");

class Admin extends Model {
  static tableName() {
    return "admins";
  }

  static sequelizeInit(sequelize) {
    this.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        name: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
        username: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
        password: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
        ...timestampData(sequelize),
      },
      {
        sequelize,
        modelName: "Admin",
        tableName: Admin.tableName(),
        hooks: {
          beforeCreate: (admin, options) => {
            admin.password = bcryptjs.hashSync(admin.password, 10);
          },
        },
      }
    );
  }
}

module.exports = {
  default: Admin,
  Admin,
};
