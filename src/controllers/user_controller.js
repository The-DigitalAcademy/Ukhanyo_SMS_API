const {User} = require('../models/user');

exports.createUser = async (req, res) => {
    const { email, password, firstName, lastName, phoneNumber, role } = req.body;
    
    if (!email || !password || !firstName || !lastName || !role) {
        return res.status(400).send({ message: "Required fields missing." });
    }

    try {
        const user = new User({
            email,
            password, // TODO: Should be hashed before saving
            firstName,
            lastName,
            phoneNumber,
            role
        });
        const result = await user.save();
        res.status(201).send({ user: result });
    } catch (error) {
        if (error.code === 11000) { // MongoDB duplicate key error code
            return res.status(400).send({ message: "Email already exists." });
        }
        res.status(500).send({ message: "Server error." });
    }
}

exports.getUsers = async (req, res) => {
    try {
        const users = await User.find({}, '-password');
        res.status(200).send({ users });
    } catch (error) {
        res.status(500).send({ message: "Server error." });
    }
}

exports.getUserById = async (req, res) => {
    const { id } = req.params;
    if (!id) {
        return res.status(400).send({ message: "User ID is required." });
    }

    try {
        const user = await User.findById(id, '-password');
        if (!user) {
            return res.status(404).send({ message: "User not found." });
        }
        res.status(200).send({ user });
    } catch (error) {
        res.status(500).send({ message: "Server error." });
    }
}

exports.updateUser = async (req, res) => {
    const { id } = req.params;
    const { firstName, lastName, phoneNumber } = req.body;

    if (!id) {
        return res.status(400).send({ message: "User ID is required." });
    }

    try {
        const user = await User.findByIdAndUpdate(
            id,
            { firstName, lastName, phoneNumber },
            { new: true, runValidators: true }
        );
        if (!user) {
            return res.status(404).send({ message: "User not found." });
        }
        res.status(200).send({ user });
    } catch (error) {
        res.status(500).send({ message: "Server error." });
    }
}

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find()
            .select('-password')
            .sort({ dateJoined: -1 });
        res.status(200).send({ users });
    } catch (error) {
        res.status(500).send({ message: "Server error." });
    }
}

exports.deleteAllUsers = async (req, res) => {
    try {
        await User.deleteMany({});
        res.status(200).send({ message: "All users deleted successfully." });
    } catch (error) {
        res.status(500).send({ message: "Server error." });
    }
}

// should these even exist??
exports.deleteUser = async (req, res) => {
    const { id } = req.params;
    if (!id) {
        return res.status(400).send({ message: "User ID is required." });
    }
    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).send({ message: "User not found." });
        }

        // Delete associated records based on user role
        switch (user.role) {
            case 'student':
                await Student.findOneAndDelete({ user: id });
                break;
            case 'teacher':
                await Teacher.findOneAndDelete({ user: id });
                break;
        }

        await User.findByIdAndDelete(id);
        
        res.status(200).send({ message: "User and associated records deleted successfully." });
    } catch (error) {
        res.status(500).send({ message: "Server error." });
    }
}