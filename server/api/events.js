const nodemailer = require("nodemailer");

const router = require("express").Router();
const {
  models: { Event, Task, User, EventUser },
} = require("../db");

// Create a new event
router.post("/", async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const user = await User.findByToken(token);

    //moved from events store
    if (req.body.emailList.length > 0) {
      const recipients = req.body.emailList; //array
      delete req.body.emailList;
      //cycle through emailList and send emails IF emaillist.length>0
      // Create a transporter using your email service's SMTP settings
      const transporter = nodemailer.createTransport({
        service: "gmail", // e.g., 'gmail', 'yahoo', etc.
        auth: {
          user: "sahng.ho.koh@gmail.com", // Your email address
          pass: "lynj ldwo vbdv wvts", // Your email password
        },
      });

      // Iterate through the recipients and send individual emails
      recipients.forEach((recipient) => {
        // Extract the first part of the email address (before the "@")
        const recipientName = recipient.split("@")[0];

        // Define your email message
        const mailOptions = {
          from: "sahng.ho.koh@gmail.com", // Sender's email address
          to: recipient, // Individual recipient
          subject: `Hello ${recipientName}`, // Subject with recipient's name
          text: `Hi ${recipientName},\n\nThis is a personalized email sent from PlanPerfect!\n, please visit: "http://planperfect.onrender.com/#/signup/${recipient}"`,
        };

        // Send the email
        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.error(`Error sending email to ${recipient}:`, error);
          } else {
            console.log(`Email sent to ${recipient}:`, info.response);
          }
        });
      });
    }
    const event = await Event.create(req.body);
    await EventUser.create({
      eventId: event.id,
      userId: user.id,
    });

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
      include: [
        Task,
        {
          model: User,
          where: { id: user.id },
          through: { attributes: [] },
        },
      ],
    });

    res.json(events);
  } catch (error) {
    next(error);
  }
});

// Read a single event by ID
router.get("/:id", async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const user = await User.findByToken(token);

    const event = await Event.findByPk(req.params.id, {
      include: [Task],
    });

    if (!event) {
      return res.status(404).send("Event not found");
    }

    // Check if the event belongs to the logged-in user

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
