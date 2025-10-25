const { DataTypes } = require("sequelize");
const { sequelize } = require("../utils/database");

const Permission = sequelize.define(
  "Permission",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      references: {
        model: "users",
        key: "id",
      },
    },
    attendance: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    cashbook: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    supplier: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "permissions",
    timestamps: true,
  }
);

module.exports = Permission;
