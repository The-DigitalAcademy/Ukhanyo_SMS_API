const {Attendance} = require('../models/attendance');

exports.createAttendance = async (req, res) => {
    const { student, subject, date, status, recordedBy } = req.body;
    
    if (!student || !subject || !date || !status || !recordedBy) {
        return res.status(400).send({ message: "Required fields missing." });
    }

    try {
        // Check for existing attendance record
        const existingRecord = await Attendance.findOne({
            student,
            subject,
            date: new Date(date)
        });

        if (existingRecord) {
            return res.status(400).send({ 
                message: "Attendance record already exists for this student on this date." 
            });
        }

        const attendance = new Attendance({
            student,
            subject,
            date,
            status,
            recordedBy,
            note: req.body.note
        });
        const result = await attendance.save();
        res.status(201).send({ attendance: result });
    } catch (error) {
        res.status(500).send({ message: "Server error." });
    }
}

exports.getAttendance = async (req, res) => {
    const { subject, date, student } = req.query;
    let query = {};

    if (subject) query.subject = subject;
    if (date) query.date = new Date(date);
    if (student) query.student = student;

    try {
        const attendance = await Attendance.find(query)
            .populate('student')
            .populate('subject')
            .populate('recordedBy');
        res.status(200).send({ attendance });
    } catch (error) {
        res.status(500).send({ message: "Server error." });
    }
}

exports.getAttendanceById = async (req, res) => {
    const { id } = req.params;
    if (!id) {
        return res.status(400).send({ message: "Attendance ID is required." });
    }

    try {
        const attendance = await Attendance.findById(id)
            .populate('student')
            .populate('subject')
            .populate('recordedBy');
        if (!attendance) {
            return res.status(404).send({ message: "Attendance record not found." });
        }
        res.status(200).send({ attendance });
    } catch (error) {
        res.status(500).send({ message: "Server error." });
    }
}

exports.updateAttendance = async (req, res) => {
    const { id } = req.params;
    const { status, note } = req.body;

    if (!id) {
        return res.status(400).send({ message: "Attendance ID is required." });
    }

    try {
        const attendance = await Attendance.findByIdAndUpdate(
            id,
            { status, note },
            { new: true, runValidators: true }
        )
        .populate('student')
        .populate('subject')
        .populate('recordedBy');
        
        if (!attendance) {
            return res.status(404).send({ message: "Attendance record not found." });
        }
        res.status(200).send({ attendance });
    } catch (error) {
        res.status(500).send({ message: "Server error." });
    }
}

exports.getAllAttendance = async (req, res) => {
    try {
        const attendance = await Attendance.find()
            .populate('student', '-password')
            .populate('subject')
            .populate('recordedBy', '-password')
            .sort({ date: -1 });
        res.status(200).send({ attendance });
    } catch (error) {
        res.status(500).send({ message: "Server error." });
    }
}

exports.deleteAllAttendance = async (req, res) => {
    try {
        await Attendance.deleteMany({});
        res.status(200).send({ message: "All attendance records deleted successfully." });
    } catch (error) {
        res.status(500).send({ message: "Server error." });
    }
}

exports.deleteAttendance = async (req, res) => {
    const { id } = req.params;
    if (!id) {
        return res.status(400).send({ message: "Attendance ID is required." });
    }
    try {
        const attendance = await Attendance.findByIdAndDelete(id);
        if (!attendance) {
            return res.status(404).send({ message: "Attendance record not found." });
        }
        res.status(200).send({ message: "Attendance record deleted successfully." });
    } catch (error) {
        res.status(500).send({ message: "Server error." });
    }
}

exports.deleteAttendance = async (req, res) => {
    const { id } = req.params;
    if (!id) {
        return res.status(400).send({ message: "Attendance ID is required." });
    }
    try {
        const attendance = await Attendance.findByIdAndDelete(id);
        if (!attendance) {
            return res.status(404).send({ message: "Attendance record not found." });
        }
        res.status(200).send({ message: "Attendance record deleted successfully." });
    } catch (error) {
        res.status(500).send({ message: "Server error." });
    }
}