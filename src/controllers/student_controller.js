const Student = require("../models/student");

exports.createStudent = async (req, res) => {
    const { userId, studentId, dateOfBirth, grade, guardian } = req.body;
    
    if (!userId || !studentId || !grade) {
        return res.status(400).send({ message: "Required fields missing." });
    }

    try {
        const student = new Student({
            user: userId,
            studentId,
            dateOfBirth,
            grade,
            guardian,
            subjects: []
        });
        const result = await student.save();
        res.status(201).send({ student: result });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).send({ message: "Student ID already exists." });
        }
        res.status(500).send({ message: "Server error." });
    }
}

exports.getStudents = async (req, res) => {
    try {
        const students = await Student.find({})
            .populate('user', '-password')
            .populate('subjects.subject');
        res.status(200).send({ students });
    } catch (error) {
        res.status(500).send({ message: "Server error." });
    }
}

exports.getStudentById = async (req, res) => {
    const { id } = req.params;
    if (!id) {
        return res.status(400).send({ message: "Student ID is required." });
    }

    try {
        const student = await Student.findById(id)
            .populate('user', '-password')
            .populate('subjects.subject');
        if (!student) {
            return res.status(404).send({ message: "Student not found." });
        }
        res.status(200).send({ student });
    } catch (error) {
        res.status(500).send({ message: "Server error." });
    }
}

exports.updateStudent = async (req, res) => {
    const { id } = req.params;
    const { grade, guardian } = req.body;

    if (!id) {
        return res.status(400).send({ message: "Student ID is required." });
    }

    try {
        const student = await Student.findByIdAndUpdate(
            id,
            { grade, guardian },
            { new: true, runValidators: true }
        ).populate('user', '-password');
        
        if (!student) {
            return res.status(404).send({ message: "Student not found." });
        }
        res.status(200).send({ student });
    } catch (error) {
        res.status(500).send({ message: "Server error." });
    }
}

exports.getAllStudents = async (req, res) => {
    try {
        const students = await Student.find()
            .populate('user', '-password')
            .populate('subjects');
        res.status(200).send({ students });
    } catch (error) {
        res.status(500).send({ message: "Server error." });
    }
}

exports.deleteAllStudents = async (req, res) => {
    try {
        await Student.deleteMany({});
        res.status(200).send({ message: "All students deleted successfully." });
    } catch (error) {
        res.status(500).send({ message: "Server error." });
    }
}
// should these even exist??
exports.deleteStudent = async (req, res) => {
    const { id } = req.params;
    if (!id) {
        return res.status(400).send({ message: "Student ID is required." });
    }
    try {
        // First find the student to get the user ID
        const student = await Student.findById(id);
        if (!student) {
            return res.status(404).send({ message: "Student not found." });
        }

        await User.findByIdAndDelete(student.user);
        
        await Student.findByIdAndDelete(id);
        
        res.status(200).send({ message: "Student and associated user account deleted successfully." });
    } catch (error) {
        res.status(500).send({ message: "Server error." });
    }
}