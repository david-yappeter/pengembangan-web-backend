const { Model, DataTypes } = require("sequelize/dist");

class Room extends Model {
  static tableName() {
    return "rooms";
  }
  static sequelizeInit(sequelize) {
    this.init(
      {
        name: {
          type: DataTypes.STRING(100),
          primaryKey: true,
        },
      },
      {
        sequelize,
        modelName: "Room",
        tableName: Room.tableName(),
      }
    );
  }
}

module.exports = {
  default: Room,
  Room,
};
