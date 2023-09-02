const router = require("express").Router();
const {
  models: { Task, User },
} = require("../db");

router.post("/", async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1]; // Assuming 'Bearer {token}' format
    const user = await User.findByToken(token);
    const task = await Task.create({
      name: req.body.name,
      description: req.body.description,
      startDate: req.body.startDate,
      dueDate: req.body.dueDate,
      userId: user.id,
    });

    const taskId = await Task.findByPk(task.id, {
      include: [User],
    });

    res.status(201).json(taskId);
  } catch (error) {
    next(error);
  }
});

router.get("/", async (req, res, next) => {
  try {
    const tasks = await Task.findAll({
      include: [User],
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

    console.log("task", task);

    await task.destroy();
    res.sendStatus(204);
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
