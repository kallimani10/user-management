"use strict";

const { Sequelize } = require("sequelize");
const CONFIG = require("../config/config");

// Safety check
if (!CONFIG) {
  throw new Error("❌ CONFIG not found. Check ../config/config.js");
}

// Create Sequelize instance
const sequelize = new Sequelize(
  CONFIG.db_name,
  CONFIG.db_user,
  CONFIG.db_password,
  {
    host: CONFIG.db_host,
    port: CONFIG.db_port,
    dialect: CONFIG.db_dialect,
    logging: false,
  }
);

// Model registry
const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Register models
db.PracticeUser = require("./user.model")(sequelize, Sequelize);

module.exports = db;
