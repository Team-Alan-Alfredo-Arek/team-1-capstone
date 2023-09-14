const router = require("express").Router();
const {
  models: { Chat, User, Event },
} = require("../db");

router.get("/", async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const user = await User.findByToken(token);
    const event = await Event.findByPk(req.params.id);
    const chats = await Chat.findAll({
      where: {
        userId: user.id,
        eventId: event.id,
      },
      include: [User, Event],
    });

    res.json(chats);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1]; // Assuming 'Bearer {token}' format
    const user = await User.findByToken(token);
    const event = await Event.findByPk(req.params.id);
    const chat = await Chat.create({
      message: req.body.message,
      userId: user.id,
      eventId: event.id,
    });

    const chatId = await Chat.findByPk(chat.id, {
      include: [User, Event],
    });

    res.status(201).json(chatId);
  } catch (error) {
    next(error);
  }
});

// Delete a message from an event's chat
router.delete("/:id", async (req, res, next) => {
  try {
    const messageId = req.params.id;

    await Chat.destroy({ where: { id: messageId } });

    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
