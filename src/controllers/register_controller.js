const Register = require('../models/register');
const Course = require('../models/course');
const Student = require('../models/student');


exports.createRegister = async (req, res) => {
    try {
        const { courseId, date, studentAttendance } = req.body;

        const course = await Course.findById(courseId);
        if (!course) return res.status(404).json({ message: 'Course not found' });

        const register = new Register({
            class: courseId,
            date,
            studentAttendance
        });

        await register.save();
        res.status(201).json(register);
    } catch (err) {
        res.status(500).json({ message: 'Error creating register', error: err.message });
    }
}


exports.getAllRegisters = async (req, res) => {
    try {
        const registers = await Register.find().populate('class').populate('studentAttendance.student');
        res.status(200).json(registers);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching registers', error: err.message });
    }
}


exports.getRegisterById = async (req, res) => {
    try {
        const { registerId } = req.params;
        const register = await Register.findById(registerId).populate('class').populate('studentAttendance.student');
        if (!register) return res.status(404).json({ message: 'Register not found' });

        res.status(200).json(register);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching register', error: err.message });
    }
}


exports.getRegistersByCourse = async (req, res) => {
    try {
        const { courseId } = req.params;

        const course = await Course.findById(courseId);
        if (!course) return res.status(404).json({ message: 'Course not found' });

        const registers = await Register.find({ class: courseId }).populate('studentAttendance.student');
        res.status(200).json(registers);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching registers for the course', error: err.message });
    }
}


exports.updateRegister = async (req, res) => {
    try {
        const { registerId } = req.params;
        const { studentAttendance } = req.body;

        const updatedRegister = await Register.findByIdAndUpdate(
            registerId,
            { studentAttendance },
            { new: true }
        ).populate('class').populate('studentAttendance.student');

        if (!updatedRegister) return res.status(404).json({ message: 'Register not found' });

        res.status(200).json(updatedRegister);
    } catch (err) {
        res.status(500).json({ message: 'Error updating register', error: err.message });
    }
}


exports.deleteRegister = async (req, res) => {
    try {
        const { registerId } = req.params;

        const deletedRegister = await Register.findByIdAndDelete(registerId);
        if (!deletedRegister) return res.status(404).json({ message: 'Register not found' });

        res.status(200).json({ message: 'Register deleted' });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting register', error: err.message });
    }
}