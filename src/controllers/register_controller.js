const Register = require('../models/register');
const Student = require('../models/student');
const Subject = require('../models/subject');

// Create a new register
exports.createRegister = async (req, res) => {
    try {
        const { student, subject, date, status, note, recordedBy } = req.body;

        const studentExists = await Student.findById(student);
        if (!studentExists) return res.status(404).json({ message: 'Student not found' });

        const subjectExists = await Subject.findById(subject);
        if (!subjectExists) return res.status(404).json({ message: 'Subject not found' });

        const register = new Register({
            student,
            subject,
            date,
            status,
            note,
            recordedBy
        });

        await register.save();
        res.status(201).json(register);
    } catch (err) {
        res.status(500).json({ message: 'Error creating register', error: err.message });
    }
};


exports.getAllRegisters = async (req, res) => {
    try {
        const registers = await Register.find()
            .populate('student')
            .populate('subject')
            .populate('recordedBy');
        res.status(200).json(registers);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching registers', error: err.message });
    }
};


exports.getRegisterById = async (req, res) => {
    try {
        const register = await Register.findById(req.params.id)
            .populate('student')
            .populate('subject')
            .populate('recordedBy');
            
        if (!register) {
            return res.status(404).json({ message: 'Register not found' });
        }
        res.status(200).json(register);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching register', error: err.message });
    }
};


exports.updateRegister = async (req, res) => {
    try {
        const { student, subject, date, status, note, recordedBy } = req.body;

        if (student) {
            const studentExists = await Student.findById(student);
            if (!studentExists) return res.status(404).json({ message: 'Student not found' });
        }

        if (subject) {
            const subjectExists = await Subject.findById(subject);
            if (!subjectExists) return res.status(404).json({ message: 'Subject not found' });
        }

        const register = await Register.findByIdAndUpdate(
            req.params.id,
            {
                student,
                subject,
                date,
                status,
                note,
                recordedBy
            },
            { new: true, runValidators: true }
        ).populate('student').populate('subject').populate('recordedBy');

        if (!register) {
            return res.status(404).json({ message: 'Register not found' });
        }
        res.status(200).json(register);
    } catch (err) {
        res.status(500).json({ message: 'Error updating register', error: err.message });
    }
};


exports.deleteRegister = async (req, res) => {
    try {
        const register = await Register.findByIdAndDelete(req.params.id);
        if (!register) {
            return res.status(404).json({ message: 'Register not found' });
        }
        res.status(200).json({ message: 'Register deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting register', error: err.message });
    }
};


exports.getRegistersByStudent = async (req, res) => {
    try {
        const registers = await Register.find({ student: req.params.studentId })
            .populate('subject')
            .populate('recordedBy');
        res.status(200).json(registers);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching student registers', error: err.message });
    }
};


exports.getRegistersBySubject = async (req, res) => {
    try {
        const registers = await Register.find({ subject: req.params.subjectId })
            .populate('student')
            .populate('recordedBy');
        res.status(200).json(registers);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching subject registers', error: err.message });
    }
};