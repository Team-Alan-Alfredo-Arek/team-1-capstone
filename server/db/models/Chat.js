const Sequelize = require("sequelize");
const db = require("../db");
const { STRING } = Sequelize;

const Chat = db.define("chat", {
  message: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  userId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  eventId: {
    type: Sequelize.INTEGER,
  },
});

module.exports = Chat;
