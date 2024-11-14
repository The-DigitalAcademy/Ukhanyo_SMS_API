const Grade = require('../models/grade');

exports.createGrade = async (req, res) => {
    const { student, subject, assessmentType, title, score, totalPossible, date, recordedBy } = req.body;
    
    if (!student || !subject || !assessmentType || !title || !score || !totalPossible || !date || !recordedBy) {
        return res.status(400).send({ message: "Required fields missing." });
    }

    try {
        const grade = new Grade({
            student,
            subject,
            assessmentType,
            title,
            score,
            totalPossible,
            date,
            recordedBy,
            comment: req.body.comment
        });
        const result = await grade.save();
        res.status(201).send({ grade: result });
    } catch (error) {
        res.status(500).send({ message: "Server error." });
    }
}

exports.getGrades = async (req, res) => {
    const { student, subject } = req.query;
    let query = {};

    if (student) query.student = student;
    if (subject) query.subject = subject;

    try {
        const grades = await Grade.find(query)
            .populate('student')
            .populate('subject')
            .populate('recordedBy');
        res.status(200).send({ grades });
    } catch (error) {
        res.status(500).send({ message: "Server error." });
    }
}

exports.getGradeById = async (req, res) => {
    const { id } = req.params;
    if (!id) {
        return res.status(400).send({ message: "Grade ID is required." });
    }

    try {
        const grade = await Grade.findById(id)
            .populate('student')
            .populate('subject')
            .populate('recordedBy');
        if (!grade) {
            return res.status(404).send({ message: "Grade not found." });
        }
        res.status(200).send({ grade });
    } catch (error) {
        res.status(500).send({ message: "Server error." });
    }
}

exports.updateGrade = async (req, res) => {
    const { id } = req.params;
    const { score, totalPossible, comment } = req.body;

    if (!id) {
        return res.status(400).send({ message: "Grade ID is required." });
    }

    try {
        const grade = await Grade.findByIdAndUpdate(
            id,
            { score, totalPossible, comment },
            { new: true, runValidators: true }
        )
        .populate('student')
        .populate('subject')
        .populate('recordedBy');
        
        if (!grade) {
            return res.status(404).send({ message: "Grade not found." });
        }
        res.status(200).send({ grade });
    } catch (error) {
        res.status(500).send({ message: "Server error." });
    }
}

exports.getAllGrades = async (req, res) => {
    try {
        const grades = await Grade.find()
            .populate('student', '-password')
            .populate('subject')
            .populate('recordedBy', '-password')
            .sort({ date: -1 });
        res.status(200).send({ grades });
    } catch (error) {
        res.status(500).send({ message: "Server error." });
    }
}

exports.deleteAllGrades = async (req, res) => {
    try {
        await Grade.deleteMany({});
        res.status(200).send({ message: "All grades deleted successfully." });
    } catch (error) {
        res.status(500).send({ message: "Server error." });
    }
}

exports.deleteGrade = async (req, res) => {
    const { id } = req.params;
    if (!id) {
        return res.status(400).send({ message: "Grade ID is required." });
    }
    try {
        const grade = await Grade.findByIdAndDelete(id);
        if (!grade) {
            return res.status(404).send({ message: "Grade not found." });
        }
        res.status(200).send({ message: "Grade deleted successfully." });
    } catch (error) {
        res.status(500).send({ message: "Server error." });
    }
}
