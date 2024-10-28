const Course = require('../models/course');
const Student = require('../models/student');
const Teacher = require('../models/admin');
const StudyMaterial = require('../models/study_material');
const Register = require('../models/register');

exports.createCourse = async (req, res) => {
    try {
        const { name, teacherId, studentIds } = req.body;

        const teacher = await Teacher.findById(teacherId);
        if (!teacher) return res.status(404).json({ message: 'Teacher not found' });

        const course = new Course({
            name,
            teacher: teacherId,
            students: studentIds
        });

        await course.save();
        res.status(201).json(course);
    } catch (err) {
        res.status(500).json({ message: 'Error creating course', error: err.message });
    }
};

exports.getAllCourses = async (req, res) => {
    try {
        const courses = await Course.find();
        // .populate('teacher').populate('students');
        res.status(200).json(courses);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching courses', error: err.message });
    }
};

exports.getCourseById = async (req, res) => {
    try {
        const { courseId } = req.params;
        const course = await Course.findById(courseId).populate('teacher');
        // .populate('students');
        if (!course) return res.status(404).json({ message: 'Course not found' });

        res.status(200).json(course);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching course', error: err.message });
    }
};

exports.getCourseStudents = async (req, res) => {
    try {
        const { courseId } = req.params;
        const course = await Course.findById(courseId).populate('students');
        if (!course) return res.status(404).json({ message: 'Course not found' });

        res.status(200).json(course.students);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching students', error: err.message });
    }
};

// move these??
exports.addStudyMaterial = async (req, res) => {
    try {
        const { courseId, title, description, fileUrl } = req.body;
        const teacherId = req.user._id;

        const course = await Course.findById(courseId);
        if (!course) return res.status(404).json({ message: 'Course not found' });

        const studyMaterial = new StudyMaterial({
            class: courseId,
            title,
            description,
            fileUrl,
            uploadedBy: teacherId
        });

        await studyMaterial.save();

        course.studyMaterials.push(studyMaterial._id);
        await course.save();

        res.status(201).json(studyMaterial);
    } catch (err) {
        res.status(500).json({ message: 'Error adding study material', error: err.message });
    }
};

exports.getStudyMaterials = async (req, res) => {
    try {
        const { courseId } = req.params;
        const studyMaterials = await StudyMaterial.find({ class: courseId });
        res.status(200).json(studyMaterials);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching study materials', error: err.message });
    }
};

exports.deleteCourse = async (req, res) => {
    try {
        const { courseId } = req.params;
        const course = await Course.findByIdAndDelete(courseId);

        if (!course) return res.status(404).json({ message: 'Course not found' });
        
        res.status(200).json({ message: 'Course deleted' });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting course', error: err.message });
    }
};
