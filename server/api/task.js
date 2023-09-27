const router = require("express").Router();
const {
  models: { Task, User, Event },
} = require("../db");

router.post("/", async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1]; // Assuming 'Bearer {token}' format
    const user = await User.findByToken(token);
    const event = await Event.findByPk(req.body.eventId);

    const task = await Task.create({
      name: req.body.name,
      description: req.body.description,
      startDate: req.body.startDate,
      dueDate: req.body.dueDate,
      status: req.body.status,
      userId: user.id,
      eventId: event.id,
    });

    const taskId = await Task.findByPk(task.id, {
      include: [User],
    });

    res.status(201).json(taskId);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const user = await User.findByToken(token);
    const event = await Event.findByPk(req.params.id);
    const tasks = await Task.findAll({
      where: {
        eventId: event.id,
      },
      include: [User, Event],
    });

    res.json(tasks);
  } catch (error) {
    next(error);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const task = await Task.findByPk(req.params.id);
    await task.update(req.body);
    res.json(task);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const data = req.params.id;
    const task = await Task.findByPk(data);

    if (!task) return res.sendStatus(404);

    await task.destroy();
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
