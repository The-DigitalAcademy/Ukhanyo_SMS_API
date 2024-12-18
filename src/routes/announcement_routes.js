const express = require('express');
const router = express.Router();
const announcementController = require('../controllers/announcement_controller');

router.get('/all', announcementController.getAllAnnouncements);

router.get('/:id', announcementController.getAnnouncementById);

router.get('/teacher/:id', announcementController.getAnnouncementsByTeacher)

router.get('/student/:id', announcementController.getAnnouncementsBySubject)


router.post('/add', announcementController.addAnnouncement);

router.put('/:id', announcementController.updateAnnouncement);

router.delete('/:id', announcementController.deleteAnnouncement);

module.exports = router;
