const express = require('express');
const router = express.Router();
const attendanceController = require('../controllers/attendanceController');

router.get('/', attendanceController.getAllAttendanceRecords);

router.get('/student/:studentId', attendanceController.getAttendanceByStudent);

router.get('/course/:courseId', attendanceController.getAttendanceByCourse);

router.post('/', attendanceController.markAttendance);

router.put('/:id', attendanceController.updateAttendance);

router.delete('/:id', attendanceController.deleteAttendance);

module.exports = router;
