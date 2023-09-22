"use strict";

const {
  db,
  models: { User, Task, Event, EventUser, Chat },
} = require("../server/db");

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables
  console.log("db synced!");

  // Creating Users
  const [alan, alfredo, arek, cody, murphy] = await Promise.all([
    User.create({
      email:'alan@abc.com',
      username: "alan",
      password: "123",
      isAdmin: true,
      imageUrl: "https://shorturl.at/jSUVZ",
    }),
    User.create({
      email:'alf@abc.com',
      username: "alfredo",
      password: "123",
      isAdmin: true,
      imageUrl:
        "https://ca.slack-edge.com/E05LYDFST6K-U04SM5GVDK2-fbe8ec81b13d-512",
    }),
    User.create({
      email:'arek@abc.com',
      username: "arek",
      password: "123",
      isAdmin: true,
      imageUrl: "https://shorturl.at/kvJKR",
    }),
    User.create({ email:'cody@aol.com', username: "cody", password: "123" }),
    User.create({ email:'murphy@aol.com',username: "murphy", password: "123" }),
  ]);

  const [Thanksgiving, Christmas, Holloween] = await Promise.all([
    Event.create({
      name: "Thanksgiving Dinner",
      date: "2023-11-26, 12:00:00",
      location: "123 W 59th Street, NY 10001",
      description: "Thanksgiving dinner with family",
      userId: alan.id,
    }),

    Event.create({
      name: "Christmas Dinner",
      date: "2023-12-25, 12:00:00",
      location: "123 W 59th Street, NY 10001",
      description: "Christmas dinner with family",
      userId: alfredo.id,
    }),
    Event.create({
      name: "Holloween Party",
      date: "2023-10-31, 12:00:00",
      location: "123 W 59th Street, NY 10001",
      description: "Holloween party with friends",
      userId: arek.id,
    }),
  ]);

  const tasks = await Promise.all([
    Task.create({
      name: "Buy Turkey",
      startDate: "2023-11-24, 12:00:00",
      dueDate: "2023-11-25, 12:00:00",
      description: "Buy a 15 pound turkey",
      eventId: Thanksgiving.id,
      userId: alan.id,
    }),
    Task.create({
      name: "Bring Cranberry Sauce",
      startDate: "2023-11-24, 12:00:00",
      dueDate: "2023-11-25, 12:00:00",
      description: "Bring Jellied and whole berry cranberry, 2 lbs",
      eventId: Christmas.id,
      userId: alfredo.id,
    }),

    Task.create({
      name: "Bring Pumpkin Pie",
      startDate: "2023-11-24, 12:00:00",
      dueDate: "2023-11-25, 12:00:00",
      description: "Bring 2 pumpkin pies",
      eventId: Holloween.id,
      userId: arek.id,
    }),
  ]);

  const chats = await Promise.all([
    Chat.create({
      message: "I'll bring the turkey.",
      userId: alan.id,
      eventId: Thanksgiving.id,
    }),
    Chat.create({
      message: "I've got the cranberry sauce.",
      userId: alfredo.id,
      eventId: Christmas.id,
    }),
    Chat.create({
      message: "I'm excited for the pumpkin pie.",
      userId: arek.id,
      eventId: Holloween.id,
    }),
  ]);

  const eventUsers = await Promise.all([
    EventUser.create({
      eventId: Thanksgiving.id,
      userId: alan.id,
    }),
    EventUser.create({
      eventId: Christmas.id,
      userId: alfredo.id,
    }),
    EventUser.create({
      eventId: Holloween.id,
      userId: arek.id,
    }),
  ]);

  console.log(`seeded successfully`);
  return {
    events: {
      Thanksgiving,
      Christmas,
      Holloween,
    },
    tasks,
    chats,
    eventUsers,
    users: {
      alan,
      alfredo,
      arek,
      cody,
      murphy,
    },
  };
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log("seeding...");
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log("closing db connection");
    await db.close();
    console.log("db connection closed");
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
