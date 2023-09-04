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
  status: {
    type: STRING,
    values: ["To be assigned", "In progress", "Done"],
    defaultValue: "To be assigned",
    allowNull: false,
  },
});

module.exports = Task;
