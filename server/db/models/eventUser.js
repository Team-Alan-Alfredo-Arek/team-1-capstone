const Sequelize = require("sequelize");

const db = require("../db");

const EventUser = db.define("eventUser", {});

module.exports = EventUser;
