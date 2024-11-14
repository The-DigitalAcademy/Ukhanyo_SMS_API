const Register = require('../models/register');
const Subject = require('../models/subject');
const Student = require('../models/student');
const Teacher = require('../models/teacher');


exports.createRegister = async (req, res) => {
    try {
        const { courseId, date, studentAttendance, teacher } = req.body;

        const subject = await Subject.findOne(courseId);
        if (!subject) return res.status(404).json({ message: 'Course not found' });

        const register = new Register({
            class: subject.id,
            date,
            studentAttendance,
            teacher
        });

        await register.save();
        res.status(201).json(register);
    } catch (err) {
        res.status(500).json({ message: 'Error creating register', error: err.message });
    }
}


exports.getAllRegisters = async (req, res) => {
    try {
        const registers = await Register.find().populate('class').populate({path: 'studentAttendance.student', model: 'Student' })
        res.status(200).json(registers);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching registers', error: err.message });
    }
}


exports.getRegisterById = async (req, res) => {
    try {
        const registerId  = req.params.id;
        const register = await Register.findById(registerId).populate('class').populate({
            path:'studentAttendance.student', 
            populate:('user')
        });;
        if (!register) return res.status(404).json({ message: 'Register not found' });

        res.status(200).json(register);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching register', error: err.message });
    }
}


exports.getRegistersBySubject = async (req, res) => {
    try {
        const courseId = req.params.id;

        const course = await Subject.findById(courseId);
        if (!course) return res.status(404).json({ message: 'Course not found' });

        const registers = await Register.find({ class: courseId }).populate('class').populate({
            path:'studentAttendance.student', 
            populate:('user')
        });
        
        res.status(200).json(registers);

    } catch (err) {
        res.status(500).json({ message: 'Error fetching registers for the course', error: err.message });
    }
}

exports.getRegistersByTeacher = async (req, res) => {
    try {
        const teacherId = req.params.id;

        const teacher = await Teacher.findById(teacherId);
        if (!teacher) return res.status(404).json({ message: 'Teacher not found' });

        const registers = await Register.find({teacher: teacher.id }).populate('class').populate({
            path:'studentAttendance.student', 
            populate:('user')
        }).populate('teacher');
        res.status(200).json(registers);

    } catch (err) {
        res.status(500).json({ message: 'Error fetching registers for the course', error: err.message });
    }
}

exports.updateRegister = async (req, res) => {
    try {
        const registerId = req.params.id;
        
        const updatedRegister = await Register.findByIdAndUpdate(
            registerId,
            {...req.body},
            { new: true }
        ).populate('class').populate({path: 'studentAttendance.student', model: 'Student'}).populate('teacher');

        if (!updatedRegister) return res.status(404).json({ message: 'Register not found' });

        res.status(200).json(updatedRegister);
    } catch (err) {
        res.status(500).json({ message: 'Error updating register', error: err.message });
    }
}


exports.deleteRegister = async (req, res) => {
    try {
        const registerId = req.params.id;

        const deletedRegister = await Register.findByIdAndDelete(registerId);
        if (!deletedRegister) return res.status(404).json({ message: 'Register not found' });

        res.status(200).json({ message: 'Register deleted' });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting register', error: err.message });
    }
}