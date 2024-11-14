const {Subject} = require('../models/subject');

exports.createSubject = async (req, res) => {
    const { name, description, grade, teacher } = req.body;
    
    if (!name || !grade || !teacher) {
        return res.status(400).send({ message: "Required fields missing." });
    }

    try {
        const subject = new Subject({
            name,
            description,
            grade,
            teacher,
            students: []
        });
        const result = await subject.save();
        res.status(201).send({ subject: result });
    } catch (error) {
        res.status(500).send({ message: "Server error." });
    }
}

exports.getSubjects = async (req, res) => {
    try {
        const subjects = await Subject.find({})
            .populate('teacher')
            .populate('students');
        res.status(200).send({ subjects });
    } catch (error) {
        res.status(500).send({ message: "Server error." });
    }
}

exports.getSubjectById = async (req, res) => {
    const { id } = req.params;
    if (!id) {
        return res.status(400).send({ message: "Subject ID is required." });
    }

    try {
        const subject = await Subject.findById(id)
            .populate('teacher')
            .populate('students');
        if (!subject) {
            return res.status(404).send({ message: "Subject not found." });
        }
        res.status(200).send({ subject });
    } catch (error) {
        res.status(500).send({ message: "Server error." });
    }
}

exports.updateSubject = async (req, res) => {
    const { id } = req.params;
    const { name, description, grade } = req.body;

    if (!id) {
        return res.status(400).send({ message: "Subject ID is required." });
    }

    try {
        const subject = await Subject.findByIdAndUpdate(
            id,
            { name, description, grade },
            { new: true, runValidators: true }
        )
        .populate('teacher')
        .populate('students');
        
        if (!subject) {
            return res.status(404).send({ message: "Subject not found." });
        }
        res.status(200).send({ subject });
    } catch (error) {
        res.status(500).send({ message: "Server error." });
    }
}

exports.getAllSubjects = async (req, res) => {
    try {
        const subjects = await Subject.find()
            .populate('teacher', '-password')
            .populate('students', '-password')
            .populate('studyMaterials');
        res.status(200).send({ subjects });
    } catch (error) {
        res.status(500).send({ message: "Server error." });
    }
}

exports.deleteAllSubjects = async (req, res) => {
    try {
        await Subject.deleteMany({});
        res.status(200).send({ message: "All subjects deleted successfully." });
    } catch (error) {
        res.status(500).send({ message: "Server error." });
    }
}

exports.deleteSubject = async (req, res) => {
    const { id } = req.params;
    if (!id) {
        return res.status(400).send({ message: "Subject ID is required." });
    }
    try {
        const subject = await Subject.findByIdAndDelete(id);
        if (!subject) {
            return res.status(404).send({ message: "Subject not found." });
        }

        // should probably wipe from all teachers/students who had this. future me!!!

        res.status(200).send({ message: "Subject deleted successfully." });
    } catch (error) {
        res.status(500).send({ message: "Server error." });
    }
}