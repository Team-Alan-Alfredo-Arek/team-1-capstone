const Sequelize = require("sequelize");
const pkg = require("../../package.json");
require("dotenv").config();

const databaseName = pkg.name;
const config = {};
config.logging = false;
if (process.env.QUIET) {
  config.logging = false;
}
//https://stackoverflow.com/questions/61254851/heroku-postgres-sequelize-no-pg-hba-conf-entry-for-host
if (process.env.DEV_URL) {
  config.dialectOptions = {
    ssl: {
      rejectUnauthorized: false,
    },
  };
}
const db = new Sequelize(`${process.env.DEV_URL}/${databaseName}`, config);
//process.env.DATABASE_URL || process.env.DEV_URL || process.env.DEV_URL_ALAN ||

module.exports = db;
