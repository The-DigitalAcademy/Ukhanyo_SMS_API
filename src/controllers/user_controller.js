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