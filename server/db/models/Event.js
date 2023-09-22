const Sequelize = require("sequelize");
const { STRING, INTEGER, DATE } = Sequelize;
const db = require("../db");


const Event = db.define("event", {
  name: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  location: {
    type: STRING,
    allowNull: true,
    // validate: {
    //   notEmpty: true,
    //   },
  },
  date: {
    type: DATE,
    allowNull: true,
    // validate: {
    //   notEmpty: true,
    //   },
    },
  guestCount: {
    type: INTEGER,
    defaultValue: 1,
    allowNull: true,
    },
  description: {
    type: STRING,
    allowNull: true,
    },
  budget: {
    type: STRING,
    allowNull: true,
    },
  status: {
    type: STRING,
    allowNull: true,
    },
});


module.exports = Event;