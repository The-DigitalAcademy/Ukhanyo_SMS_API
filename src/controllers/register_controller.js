const Register = require('../models/register');


exports.createRegister = async (req, res) => {
    const { course, date, studentAttendance, recordedBy } = req.body;

    try {
        const newRegister = await Register.create({ course, date, studentAttendance, recordedBy });
        res.status(201).json(newRegister);
    } catch (error) {
        res.status(400).json({ message: "Error creating attendance register", error });
    }
}


exports.getAllRegisters = async (req, res) => {
    try {
        const registers = await Register.find().populate('course recordedBy studentAttendance.student');
        res.status(200).json(registers);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving attendance registers", error });
    }
}


exports.getRegisterById = async (req, res) => {
    const { id } = req.params;

    try {
        const register = await Register.findById(id).populate('course recordedBy studentAttendance.student');
        if (!register) return res.status(404).json({ message: "Register not found" });

        res.status(200).json(register);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving attendance register", error });
    }
}


exports.updateRegister = async (req, res) => {
    const { id } = req.params;
    const { course, date, studentAttendance, recordedBy } = req.body;

    try {
        const updatedRegister = await Register.findByIdAndUpdate(
            id, 
            { course, date, studentAttendance, recordedBy }, 
            { new: true }
        ).populate('course recordedBy studentAttendance.student');
        
        if (!updatedRegister) return res.status(404).json({ message: "Register not found" });

        res.status(200).json(updatedRegister);
    } catch (error) {
        res.status(400).json({ message: "Error updating attendance register", error });
    }
}


exports.deleteRegister = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedRegister = await Register.findByIdAndDelete(id);
        if (!deletedRegister) return res.status(404).json({ message: "Register not found" });

        res.status(200).json({ message: "Register deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting attendance register", error });
    }
}
