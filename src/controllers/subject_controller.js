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