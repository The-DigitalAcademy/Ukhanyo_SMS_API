const Grade = require('../models/grades');


exports.createGrade = async (req, res) => {
    const { student, course, subject, mark, maxMark, gradedBy } = req.body;

    try {
        const newGrade = await Grade.create({ student, course, subject, mark, maxMark, gradedBy });
        res.status(201).json(newGrade);
    } catch (error) {
        res.status(400).json({ message: "Error creating grade", error });
    }
}


exports.getAllGrades = async (req, res) => {
    try {
        const grades = await Grade.find().populate('student course gradedBy');
        res.status(200).json(grades);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving grades", error });
    }
}


exports.getGradeById = async (req, res) => {
    const { id } = req.params;

    try {
        const grade = await Grade.findById(id).populate('student course gradedBy');
        if (!grade) return res.status(404).json({ message: "Grade not found" });
        
        res.status(200).json(grade);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving grade", error });
    }
}


exports.updateGrade = async (req, res) => {
    const { id } = req.params;
    const { student, course, subject, mark, maxMark, gradedBy } = req.body;

    try {
        const updatedGrade = await Grade.findByIdAndUpdate(
            id, 
            { student, course, subject, mark, maxMark, gradedBy }, 
            { new: true }
        );
        if (!updatedGrade) return res.status(404).json({ message: "Grade not found" });

        res.status(200).json(updatedGrade);
    } catch (error) {
        res.status(400).json({ message: "Error updating grade", error });
    }
}


exports.deleteGrade = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedGrade = await Grade.findByIdAndDelete(id);
        if (!deletedGrade) return res.status(404).json({ message: "Grade not found" });

        res.status(200).json({ message: "Grade deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting grade", error });
    }
}
