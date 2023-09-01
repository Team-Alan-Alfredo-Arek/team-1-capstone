//this is the access point for all things database related!
const db = require('./db')

const User = require('./models/User')
const Event = require('./models/Event')
const Task = require('./models/Task')

//associations could go here!
User.hasMany(Event);
Event.belongsTo(User);
Event.hasMany(Task);
User.hasMany(Task);
Task.belongsTo(Event);

module.exports = {
  db,
  models: {
    User,
    Event,
    Task,
  },
}
