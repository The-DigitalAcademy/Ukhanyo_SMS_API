const express = require('express');
const router = express.Router();
const subjectController = require('../controllers/subject_controller');

router.post('/subjects', subjectController.createSubject);
router.get('/subjects', subjectController.getAllSubjects);
router.get('/subjects/:id', subjectController.getSubjectById);
router.put('/subjects/:id', subjectController.updateSubject);
router.delete('/subjects/:id', subjectController.deleteSubject);

module.exports = router