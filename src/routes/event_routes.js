const express = require('express');
const router = express.Router();
const eventController = require('../controllers/event_controller');


router.get('/all', eventController.geAllEvents);

router.get('/:id', eventController.getEventById);

router.post('/', eventController.createEvent);


router.put('/:id', eventController.updateEvent);

router.delete('/:id', eventController.deleteEvent);

module.exports = router;
