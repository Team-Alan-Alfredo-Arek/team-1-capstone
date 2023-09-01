const Sequelize = require("sequelize");
const { STRING, DATE } = Sequelize;
const db = require("../db");


const Task = db.define("event", {
  name: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  startDate: {
    type: DATE,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  dueDate: {
    type: DATE,
    allowNull: false,
    validate: {
      notEmpty: true,
      },
    },
  description: {
    type: STRING,
    allowNull: true,
    },
});


module.exports = Task;