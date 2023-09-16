const router = require("express").Router();
const {
  models: { User },
} = require("../db");
module.exports = router;

router.get("/", async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and username fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      //attributes: ['id', 'username']
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
});

//AK Copied from users api
// GET /api/users/:id
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (user) {
      res.json(user);
    } else {
      res.status(404).send("User not found");
    }
  } catch (err) {
    res.status(500).json({
      message: "Could not get user with that id",
      error: err.message,
    });
  }
});
// POST /api/users
router.post("/", async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({
      message: "Could not create user",
      error: err.message,
    });
  }
});

// DEL /api/users/:id
router.delete("/:id", async (req, res) => {
  try {
    const rowsDeleted = await User.destroy({ where: { id: req.params.id } });
    if (rowsDeleted) {
      res.json({ message: "User deleted successfully" });
    } else {
      res.status(404).send("User not found");
    }
  } catch (err) {
    res.status(500).json({
      message: "Could not delete the user with that id",
      error: err.message,
    });
  }
});
// PUT /api/users/:id
router.put("/:id", async (req, res) => {
  try {
    const [numberOfAffectedRows, updatedUsers] = await User.update(req.body, {
      where: {
        id: req.params.id,
      },
      returning: true,
    });
    if (numberOfAffectedRows > 0) {
      res.json(updatedUsers[0]);
    } else {
      res.status(404).send("User not found");
    }
  } catch (err) {
    res.status(500).json({
      message: "Could not edit the user with that id",
      error: err.message,
    });
  }
});
