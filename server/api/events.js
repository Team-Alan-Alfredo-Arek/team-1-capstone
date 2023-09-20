const router = require("express").Router();
const {
  models: { Event, Task, User, EventUser },
} = require("../db");

// Create a new event
router.post("/", async (req, res, next) => {
  try {
    const event = await Event.create(req.body);
    res.status(201).json(event);
  } catch (error) {
    next(error);
  }
});

router.post("/:id/addUser/:userId", async (req, res, next) => {
  try {
    const { id, userId } = req.params;
    const event = await Event.findByPk(id);
    const user = await User.findByPk(userId);

    if (!event || !user) {
      return res
        .status(404)
        .json({ success: false, message: "Event or User not found" });
    }

    const eventUser = await EventUser.findOne({
      where: {
        eventId: event.id,
        userId: user.id,
      },
    });

    if (eventUser) {
      return res
        .status(400)
        .json({ success: false, message: "User already added to event" });
    }

    await event.addUser(user);
    res.status(201).json({ success: true, event: event });
  } catch (error) {
    next(error);
  }
});

// Read all events
router.get("/", async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const user = await User.findByToken(token);

    const events = await Event.findAll({
      where: {
        userId: user.id,
      },
      include: [
        Task,
        { model: User, as: "users", through: { attributes: [] } },
      ],
    });

    res.json(events);
  } catch (error) {
    next(error);
  }
});
// Read a single event by ID
// Read a single event by ID
router.get("/:id", async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const user = await User.findByToken(token);

    const event = await Event.findByPk(req.params.id, {
      include: [
        Task,
        { model: User, as: "users", through: { attributes: [] } },
      ],
    });

    if (!event) {
      return res.status(404).send("Event not found");
    }

    // Check if the event belongs to the logged-in user
    if (event.userId !== user.id) {
      return res.status(403).send("Unauthorized access");
    }

    res.json(event);
  } catch (error) {
    next(error);
  }
});

// Update an event by ID
router.put("/:id", async (req, res, next) => {
  try {
    const event = await Event.findByPk(req.params.id);
    if (event) {
      await event.update(req.body);
      res.json(event);
    } else {
      res.status(404).send("Event not found");
    }
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const event = await Event.findByPk(req.params.id);
    if (!event) {
      return res.status(404).send("Event not found");
    }
    await event.destroy();
    res.status(204).end();
  } catch (error) {
    console.log("Error deleting event: ", error);
    res.status(500).send("Internal server error");
  }
});

module.exports = router;
