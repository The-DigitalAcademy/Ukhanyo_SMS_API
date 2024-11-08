const express = require('express');
const router = express.Router();
const gradeController = require('../controllers/grades');

router.get('/all', gradeController);

router.get('/student_grades/:id', gradeController.getStudentGrades);
router.get('/subject_grades/:id', gradeController.getStudentGrades);

router.post('/add', gradeController.addGrade);

router.put('/:id', gradeController.updateGrade);

router.delete('/:id', gradeController.deleteGrade);

module.exports = router;