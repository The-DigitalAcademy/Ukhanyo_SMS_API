const Teacher = require('../models/teacher');
const Course = require('../models/course');
const User = require('../models/user_model');


exports.createTeacher = async (req, res) => {
    try {
        const { userId, courses } = req.body;

        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: 'User not found' });

        const teacher = new Teacher({
            user: userId,
            classes: courses
        });

        await teacher.save();
        res.status(201).json(teacher);
    } catch (err) {
        res.status(500).json({ message: 'Error creating teacher', error: err.message });
    }
}


exports.getAllTeachers = async (req, res) => {
    try {
        const teachers = await Teacher.find().populate('user').populate('classes');
        res.status(200).json(teachers);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching teachers', error: err.message });
    }
}


exports.getTeacherById = async (req, res) => {
    try {
        const { teacherId } = req.params;
        const teacher = await Teacher.findById(teacherId).populate('user').populate('classes');
        
        if (!teacher) return res.status(404).json({ message: 'Teacher not found' });

        res.status(200).json(teacher);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching teacher', error: err.message });
    }
}


exports.getTeacherCourses = async (req, res) => {
    try {
        const { teacherId } = req.params;
        const teacher = await Teacher.findById(teacherId).populate('classes');
        if (!teacher) return res.status(404).json({ message: 'Teacher not found' });

        const courses = await Course.find({ teacher: teacherId });
        res.status(200).json(courses);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching teacher courses', error: err.message });
    }
}


exports.updateTeacherCourses = async (req, res) => {
    try {
        const { teacherId } = req.params;
        const { courses } = req.body;

        const updatedTeacher = await Teacher.findByIdAndUpdate(
            teacherId,
            { classes: courses },
            { new: true }
        ).populate('user').populate('classes');
        if (!updatedTeacher) return res.status(404).json({ message: 'Teacher not found' });

        res.status(200).json(updatedTeacher);
    } catch (err) {
        res.status(500).json({ message: 'Error updating teacher courses', error: err.message });
    }
}


exports.deleteTeacher = async (req, res) => {
    try {
        const { teacherId } = req.params;

        const deletedTeacher = await Teacher.findByIdAndDelete(teacherId);
        if (!deletedTeacher) return res.status(404).json({ message: 'Teacher not found' });

        res.status(200).json({ message: 'Teacher deleted' });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting teacher', error: err.message });
    }
}
