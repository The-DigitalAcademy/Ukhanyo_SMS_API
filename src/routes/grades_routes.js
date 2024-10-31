const express = require('express');
const router = express.Router();
const gradeController = require('../controllers/grades_controller');

router.post('/grades', gradeController.createGrade);
router.get('/grades', gradeController.getAllGrades);
router.get('/grades/:id', gradeController.getGradeById);
router.put('/grades/:id', gradeController.updateGrade);
router.delete('/grades/:id', gradeController.deleteGrade);

module.exports = router;
