const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const teacherSchema = new mongoose.Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    employeeId: { type: String, required: true, unique: true },
    qualifications: [String],
    subjects: [{ type: Schema.Types.ObjectId, ref: 'Subject' }]
});

const Teacher = mongoose.model('Teacher', teacherSchema);
module.exports = Teacher;
