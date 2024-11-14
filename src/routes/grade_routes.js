const express = require('express');
const router = express.Router();
const gradeController = require('../controllers/grades');

router.get('/all', gradeController.getCourseGrades);

router.get('/student_grades/:id', gradeController.getAllStudentGrades);

router.get('/subject_grades/:id', gradeController.getStudentGrades);

router.post('/add', gradeController.addGrade);

router.put('/:id', gradeController.updateSudentGrade);

router.get('/teacher/:id', gradeController.getStudentGradesForTeacher);

router.delete('/:id', gradeController.deleteGrade);

module.exports = router;