const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const registerSchema = new mongoose.Schema({
    student: { type: Schema.Types.ObjectId, ref: 'Student', required: true },
    subject: { type: Schema.Types.ObjectId, ref: 'Subject', required: true },
    date: { type: Date, required: true },
    status: { type: String, enum: ['present', 'absent', 'late'], required: true },
    note: String,
    recordedBy: { type: Schema.Types.ObjectId, ref: 'Teacher', required: true },
    createdAt: { type: Date, default: Date.now },
});

const Register = mongoose.model('Register', registerSchema);
module.exports = Register;