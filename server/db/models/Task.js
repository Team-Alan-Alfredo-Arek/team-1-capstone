const Sequelize = require("sequelize");
const { STRING, DATE } = Sequelize;
const db = require("../db");

const Task = db.define("task", {
  name: {
    type: STRING,
    allowNull: false,
  },
  startDate: {
    type: DATE,
    allowNull: false,
  },
  dueDate: {
    type: DATE,
    allowNull: false,
  },
  description: {
    type: STRING,
    allowNull: true,
  },
});

module.exports = Task;
