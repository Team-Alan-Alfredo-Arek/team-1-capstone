const router = require('express').Router();

// Import your sub-routers here
const userRoutes = require('./users');
const eventRoutes = require('./events');

// Use them in your main router
router.use('/users', userRoutes);
router.use('/events', eventRoutes);

module.exports = router;
