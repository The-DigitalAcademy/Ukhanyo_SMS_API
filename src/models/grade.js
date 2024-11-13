const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const gradeSchema = new mongoose.Schema({
    student: { type: Schema.Types.ObjectId, ref: 'Student', required: true },
    subject: { type: Schema.Types.ObjectId, ref: 'Subject', required: true },
    assessmentType: { type: String, required: true }, // e.g., 'test', 'assignment', 'exam'
    title: { type: String, required: true },
    score: { type: Number, required: true },
    totalPossible: { type: Number, required: true },
    date: { type: Date, required: true },
    comment: String,
    recordedBy: { type: Schema.Types.ObjectId, ref: 'Teacher', required: true }
});

const Grade = mongoose.model('Grade', gradeSchema);
module.exports = Grade;
