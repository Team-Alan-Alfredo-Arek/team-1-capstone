const router = require("express").Router();
const {
  models: { Task },
} = require("../db");

router.post("/", async (req, res, next) => {
  try {
    const task = await Task.create(req.body);
    res.status(201).json(task);
  } catch (error) {
    next(error);
  }
});

router.get("/", async (req, res, next) => {
  try {
    const tasks = await Task.findAll();
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
    const task = await Task.findByPk(req.params.id);
    await task.destroy();
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
