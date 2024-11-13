const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    phoneNumber: String,
    role: { type: String, enum: ['admin', 'teacher', 'student'], required: true },
    profilePicture: String,
    dateJoined: { type: Date, default: Date.now },
    isActive: { type: Boolean, default: true },
    lastLogin: Date
});

const User =  mongoose.model('User', userSchema);
module.exports = User;
