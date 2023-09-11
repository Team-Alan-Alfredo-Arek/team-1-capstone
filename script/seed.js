"use strict";

const {
  db,
  models: { User, Task, Event },
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
      username: "alan",
      password: "123",
      isAdmin: true,
      imageUrl: "https://shorturl.at/jSUVZ",
    }),
    User.create({
      username: "alfredo",
      password: "123",
      isAdmin: true,
      imageUrl: "https://ca.slack-edge.com/E05LYDFST6K-U04SM5GVDK2-fbe8ec81b13d-512",
    }),
    User.create({
      username: "arek",
      password: "123",
      isAdmin: true,
      imageUrl: "https://shorturl.at/kvJKR",
    }),
    User.create({ username: "cody", password: "123" }),
    User.create({ username: "murphy", password: "123" }),
  ]);

  const events = await Promise.all([
    Event.create({
      name: "Thanksgiving Dinner",
      date: "2023-11-26, 12:00:00",
      location: "123 W 59th Street, NY 10001",
      description: "Thanksgiving dinner with family",

      userId: 1,
    }),
  ]);

  const tasks = await Promise.all([
    Task.create({
      name: "Buy Turkey",
      startDate: "2023-11-24, 12:00:00",
      dueDate: "2023-11-25, 12:00:00",
      description: "Buy a 15 pound turkey",
      eventId: 1,
      userId: alan.id,
    }),
    Task.create({
      name: "Bring Cranberry Sauce",
      startDate: "2023-11-24, 12:00:00",
      dueDate: "2023-11-25, 12:00:00",
      description: "Bring Jellied and whole berry cranberry, 2 lbs",
      eventId: 1,
      userId: alfredo.id,
    }),

    Task.create({
      name: "Bring Pumpkin Pie",
      startDate: "2023-11-24, 12:00:00",
      dueDate: "2023-11-25, 12:00:00",
      description: "Bring 2 pumpkin pies",
      eventId: 1,
      userId: arek.id,
    }),
  ]);

  console.log(`seeded successfully`);
  return {
    events: {
      thanksgiving: events[0],
    },
    tasks,
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
