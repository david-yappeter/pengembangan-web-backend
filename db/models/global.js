const { DataTypes } = require("sequelize/dist");

const timestampData = (sequelize) => {
  return {
    createdAt: {
      type: "TIMESTAMP",
      defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
    },
    updatedAt: {
      type: "TIMESTAMP",
      allowNull: true,
    },
  };
};

module.exports = timestampData;
