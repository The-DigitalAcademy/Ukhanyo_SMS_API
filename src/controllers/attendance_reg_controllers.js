const Attendance = require('../models/Attendance');

exports.getAllAttendanceRecords = async (req, res) => {
  try {
    const attendanceRecords = await Attendance.find();
    res.status(200).json(attendanceRecords);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAttendanceByStudent = async (req, res) => {
  try {
    const attendanceRecords = await Attendance.find({ studentId: req.params.studentId });
    res.status(200).json(attendanceRecords);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.getAttendanceByCourse = async (req, res) => {
  try {
    const attendanceRecords = await Attendance.find({ courseId: req.params.courseId });
    res.status(200).json(attendanceRecords);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.markAttendance = async (req, res) => {
  const { studentId, courseId, date, status, remarks } = req.body;

  const newAttendance = new Attendance({
    studentId,
    courseId,
    date,
    status,
    remarks,
  });

  try {
    const savedAttendance = await newAttendance.save();
    res.status(201).json(savedAttendance);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update an attendance record
exports.updateAttendance = async (req, res) => {
  const { studentId, courseId, date, status, remarks } = req.body;

  try {
    const updatedAttendance = await Attendance.findByIdAndUpdate(
      req.params.id,
      { studentId, courseId, date, status, remarks },
      { new: true }
    );

    if (!updatedAttendance) {
      return res.status(404).json({ message: "Attendance record not found" });
    }
    res.status(200).json(updatedAttendance);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteAttendance = async (req, res) => {
  try {
    const deletedAttendance = await Attendance.findByIdAndDelete(req.params.id);

    if (!deletedAttendance) {
      return res.status(404).json({ message: "Attendance record not found" });
    }
    res.status(200).json({ message: "Attendance record deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
