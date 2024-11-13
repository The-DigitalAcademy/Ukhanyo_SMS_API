const Teacher = require("../models/teacher");

exports.createTeacher = async (req, res) => {
    const { userId, employeeId, qualifications } = req.body;
    
    if (!userId || !employeeId) {
        return res.status(400).send({ message: "Required fields missing." });
    }

    try {
        const teacher = new Teacher({
            user: userId,
            employeeId,
            qualifications: qualifications || [],
            subjects: []
        });
        const result = await teacher.save();
        res.status(201).send({ teacher: result });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).send({ message: "Employee ID already exists." });
        }
        res.status(500).send({ message: "Server error." });
    }
}

exports.getTeachers = async (req, res) => {
    try {
        const teachers = await Teacher.find({})
            .populate('user', '-password')
            .populate('subjects');
        res.status(200).send({ teachers });
    } catch (error) {
        res.status(500).send({ message: "Server error." });
    }
}

exports.getTeacherById = async (req, res) => {
    const { id } = req.params;
    if (!id) {
        return res.status(400).send({ message: "Teacher ID is required." });
    }

    try {
        const teacher = await Teacher.findById(id)
            .populate('user', '-password')
            .populate('subjects');
        if (!teacher) {
            return res.status(404).send({ message: "Teacher not found." });
        }
        res.status(200).send({ teacher });
    } catch (error) {
        res.status(500).send({ message: "Server error." });
    }
}

exports.updateTeacher = async (req, res) => {
    const { id } = req.params;
    const { qualifications } = req.body;

    if (!id) {
        return res.status(400).send({ message: "Teacher ID is required." });
    }

    try {
        const teacher = await Teacher.findByIdAndUpdate(
            id,
            { qualifications },
            { new: true, runValidators: true }
        ).populate('user', '-password');
        
        if (!teacher) {
            return res.status(404).send({ message: "Teacher not found." });
        }
        res.status(200).send({ teacher });
    } catch (error) {
        res.status(500).send({ message: "Server error." });
    }
}