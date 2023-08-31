const Sequelize = require('sequelize')
const pkg = require('../../package.json')
require('dotenv').config()

const databaseName = pkg.name;

const config = {};

config.logging = false;
if (process.env.QUIET) {
  config.logging = false;
}

//https://stackoverflow.com/questions/61254851/heroku-postgres-sequelize-no-pg-hba-conf-entry-for-host
if(process.env.DATABASE_URL){
  config.dialectOptions = {
    ssl: {
      rejectUnauthorized: false
    }
  };
}

const db = new Sequelize(
  process.env.DATABASE_URL || process.env.DEV_URL || `postgres://localhost:5432/${databaseName}`, config)


module.exports = db