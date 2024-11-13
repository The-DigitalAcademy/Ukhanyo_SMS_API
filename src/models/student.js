const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const studentSchema = new mongoose.Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    studentId: { type: String, required: true, unique: true },
    dateOfBirth: Date,
    guardian: {
        name: String,
        relationship: String,
        contact: String,
        email: String
    },
    subjects:[{ type: Schema.Types.ObjectId, ref: 'Subject', require: true}]
});

const Student = mongoose.model("Student", studentSchema);
module.exports = Student;
