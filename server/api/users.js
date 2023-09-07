const router = require('express').Router()
const { models: { User }} = require('../db')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and username fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'username']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

//AK Copied from users api
// GET /api/users/:id
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findAll({
      where: {
        id: req.params.id,
      },
      include: [Student],
    });
    res.json(user[0]);
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
    const user = await User.findAll({
      where: {
        id: req.params.id,
      },
    });
    await User.destroy({ where: { id: req.params.id } });
    res.json(user[0]);
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
    await User.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    const user = await User.findAll({
      where: {
        id: req.params.id,
      },
      include: [Student],
    });

    res.json(user[0]);
  } catch (err) {
    res.status(500).json({
      message: "Could not edit the user with that id",
      error: err.message,
    });
  }
});

