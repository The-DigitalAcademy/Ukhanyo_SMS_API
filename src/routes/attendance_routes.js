const express = require('express');
const router = express.Router();
const attendanceController = require('../controllers/attendance_controller');

router.post('/attendance', attendanceController.createAttendance);
// router.get('/attendance', attendanceController.getAllAttendance);
router.get('/attendance/:id', attendanceController.getAttendanceById);
router.put('/attendance/:id', attendanceController.updateAttendance);
// router.delete('/attendance/:id', attendanceController.deleteAttendance);

module.exports = router;