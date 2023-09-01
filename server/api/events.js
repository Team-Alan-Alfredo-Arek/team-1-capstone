const router = require('express').Router();
const { models: { Event }} = require('../db');

// Create a new event
router.post('/', async (req, res, next) => {
  try {
    const event = await Event.create(req.body);
    res.status(201).json(event);
  } catch (error) {
    next(error);
  }
});

// Read all events
router.get('/', async (req, res, next) => {
  try {
    const events = await Event.findAll();
    res.json(events);
  } catch (error) {
    next(error);
  }
});

// Read a single event by ID
router.get('/:id', async (req, res, next) => {
  try {
    const event = await Event.findByPk(req.params.id);
    if (event) {
      res.json(event);
    } else {
      res.status(404).send('Event not found');
    }
  } catch (error) {
    next(error);
  }
});

// Update an event by ID
router.put('/:id', async (req, res, next) => {
  try {
    const event = await Event.findByPk(req.params.id);
    if (event) {
      await event.update(req.body);
      res.json(event);
    } else {
      res.status(404).send('Event not found');
    }
  } catch (error) {
    next(error);
  }
});

// Delete an event by ID
router.delete('/:id', async (req, res, next) => {
  try {
    const event = await Event.findByPk(req.params.id);
    if (event) {
      await event.destroy();
      res.status(204).end();
    } else {
      res.status(404).send('Event not found');
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
