//this is the access point for all things database related!
const db = require("./db");

const User = require("./models/User");
const Event = require("./models/Event");
const Task = require("./models/Task");
const EventUser = require("./models/eventUser");
const Chat = require("./models/chat");

//associations could go here!
User.hasMany(Event);
Event.belongsTo(User);
Event.hasMany(Task);
User.hasMany(Task);
Task.belongsTo(Event);
Task.belongsTo(User);
Event.hasMany(Chat);
User.hasMany(Chat);

Chat.belongsTo(User);
Chat.belongsTo(Event);

Event.belongsToMany(User, { through: EventUser });
User.belongsToMany(Event, { through: EventUser });

module.exports = {
  db,
  models: {
    User,
    Event,
    Task,
    EventUser,
    Chat,
  },
};
