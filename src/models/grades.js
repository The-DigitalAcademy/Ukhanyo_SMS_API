const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const gradeSchema = new Schema({
    student: { type: Schema.Types.ObjectId, ref: 'Student', required: true },
    subject: { type: String, required: true },
    mark: { type: Number, required: true },
    maxMark: { type: Number, required: true }
});

module.exports = mongoose.model('Grades', gradeSchema);
