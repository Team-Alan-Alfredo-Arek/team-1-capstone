const Sequelize = require("sequelize");

const db = require("../db");

const EventUser = db.define("eventUser", {
  rsvpStatus: {
    type: Sequelize.STRING,
    allowNull: true,
    defaultValue: "pending",
    validate: {
      isIn: [["accepted", "declined", "pending"]],
    },
  },
  role: {
    type: Sequelize.STRING,
    allowNull: true,
    defaultValue: "guest",
    validate: {
      isIn: [["host", "guest"]],
    },
  },
});

module.exports = EventUser;
