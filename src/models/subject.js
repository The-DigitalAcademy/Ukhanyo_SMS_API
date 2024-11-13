const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const subjectSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: String,
    grade: Number,
    teacher: { type: Schema.Types.ObjectId, ref: 'Teacher', required: true },
    students: [{ type: Schema.Types.ObjectId, ref: 'Student' }],
    studyMaterials: [{ type: Schema.Types.ObjectId, ref: "StudyMaterial" }],
    createdAt: { type: Date, default: Date.now }
});

const Subject = mongoose.model("Subject", subjectSchema);
module.exports = Subject;
