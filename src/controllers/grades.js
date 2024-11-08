const Grade = require('../models/grades');
const Subject = require('../models/subject');
const Student = require('../models/student');


exports.addGrade = async (req, res) => {
    try {
        const { name, type, studentId, subject, grade, maxGrade, teacherId, comment} = req.body;

        const className = await Subject.findOne({subjectCode: subject});
        if (!className) return res.status(404).json({ message: 'Subject not found' });

        const student = await Student.findById(studentId);
        if (!student) return res.status(404).json({ message: 'Student not found' });

        const newGrade = new Grade({
            name,
            type,
            term,
            subject: className.id,
            student: studentId,
            grade,
            maxGrade,
            teacherId,
            comment
        });

        await newGrade.save();

        res.status(201).json(newGrade);
    } catch (err) {
        res.status(500).json({ message: 'Error adding grade', error: err.message });
    }
}


exports.getCourseGrades = async (req, res) => {
    try {
        const { courseId } = req.params;
        const grades = await Grade.find({ class: courseId }).populate('student');
        res.status(200).json(grades);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching grades', error: err.message });
    }
}


exports.getStudentGrades = async (req, res) => {
    try {
        const { studentId } = req.params;
        const grades = await Grade.find({ student: studentId }).populate('class');
        res.status(200).json(grades);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching grades', error: err.message });
    }
}


exports.updateGrade = async (req, res) => {
    try {
        const { gradeId } = req.params;
        const { subject, grade, maxGrade } = req.body;

        const updatedGrade = await Grade.findByIdAndUpdate(
            gradeId,
            { subject, grade, maxGrade },
            { new: true }
        );
        if (!updatedGrade) return res.status(404).json({ message: 'Grade not found' });

        res.status(200).json(updatedGrade);
    } catch (err) {
        res.status(500).json({ message: 'Error updating grade', error: err.message });
    }
}


exports.deleteGrade = async (req, res) => {
    try {
        const { gradeId } = req.params;

        const deletedGrade = await Grade.findByIdAndDelete(gradeId);
        if (!deletedGrade) return res.status(404).json({ message: 'Grade not found' });

        res.status(200).json({ message: 'Grade deleted' });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting grade', error: err.message });
    }
}
