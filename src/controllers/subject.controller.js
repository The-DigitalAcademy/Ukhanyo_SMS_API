const Subject = require('../models/subject');
const Student = require('../models/student');
const Teacher = require('../models/teacher');
const StudyMaterial = require('../models/study_material');
const Register = require('../models/register');


exports.createSubject = async (req, res) => {
    try {
        const { name, subjectCode } = req.body;

        // const teacher = await Teacher.findOne(teacherId);
        // if (!teacher) return res.status(404).json({ message: 'Teacher not found' });

        const subject = new Subject({
            name,
            subjectCode
        });

        await subject.save();
        res.status(201).json(subject);
    } catch (err) {
        res.status(500).json({ message: 'Error creating subject', error: err.message });
    }
}


exports.getAllSubjects = async (req, res) => {
    try {
        const subject = await Subject.find().populate('teacher').populate('students');
        res.status(200).json(subject);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching subject', error: err.message });
    }
}


exports.getSubjectById = async (req, res) => {
    try {
        const courseId = req.params.id;
        const course = await Subject.findById(courseId).populate('teacher').populate('students');
        if (!course) return res.status(404).json({ message: 'Course not found' });

        res.status(200).json(course);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching course', error: err.message });
    }
}


exports.getSubjectStudents = async (req, res) => {
    try {
        const courseId = req.params.id;
        const course = await Subject.findById(courseId).populate('students');
        if (!course) return res.status(404).json({ message: 'Course not found' });

        res.status(200).json(course.students);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching students', error: err.message });
    }
}

exports.updateSubject = async (req, res)=>{
    try {
        const courseId = req.params.id;
        const subject = await Subject.findByIdAndUpdate(courseId,{...req.body},{new: true} ).populate('students');
        if (!subject) return res.status(404).json({ message: 'Subject not found'});

        res.status(200).json(subject);
    } catch (error) {
        res.status(500).json({ message: 'Error trying to update subject', error: err.message });

    }
}


exports.addStudyMaterial = async (req, res) => {
    try {
        const { courseId, title, description, fileUrl } = req.body;
        const teacherId = req.user._id;

        const course = await Subject.findById(courseId);
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
}


exports.getStudyMaterials = async (req, res) => {
    try {
        const { courseId } = req.params;
        const studyMaterials = await StudyMaterial.find({ class: courseId });
        res.status(200).json(studyMaterials);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching study materials', error: err.message });
    }
}


exports.deleteCourse = async (req, res) => {
    try {
        const courseId = req.params.id;
        const course = await Subject.findByIdAndDelete(courseId);

        if (!course) return res.status(404).json({ message: 'Subject not found' });
        
        res.status(200).json({ message: 'Subject deleted' });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting subject', error: err.message });
    }
}
