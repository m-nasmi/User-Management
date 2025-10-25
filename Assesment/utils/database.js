require("dotenv").config();
const { Sequelize } = require("sequelize");
const config = require("../config");

const sequelize = new Sequelize(
  config.database.name,
  config.database.user,
  config.database.password,
  {
    host: config.database.host,
    port: config.database.port,
    dialect: "mysql",
    logging: false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  }
);

const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log("MySQL database connection established successfully.");
    return true;
  } catch (error) {
    console.error("Unable to connect to MySQL database:", error.message);
    return false;
  }
};

const initializeDatabase = async () => {
  try {
    const User = require("../models/User");
    const Favorite = require("../models/Favorite");
    const Permission = require("../models/Permission");

    User.hasMany(Favorite, { foreignKey: "userId", as: "favorites" });
    User.hasOne(Permission, { foreignKey: "userId", as: "permissions" });

    Favorite.belongsTo(User, { foreignKey: "userId", as: "user" });
    Permission.belongsTo(User, { foreignKey: "userId", as: "user" });

    await sequelize.sync({ force: false });
    console.log("Database tables synchronized successfully.");
    return true;
  } catch (error) {
    console.error("Database initialization failed:", error.message);
    return false;
  }
};

module.exports = {
  sequelize,
  testConnection,
  initializeDatabase,
};
