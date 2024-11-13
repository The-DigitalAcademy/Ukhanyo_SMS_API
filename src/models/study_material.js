const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const studyMaterialSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: String,
    subject: { type: Schema.Types.ObjectId, ref: 'Subject', required: true },
    fileUrl: { type: String, required: true },
    uploadedBy: { type: Schema.Types.ObjectId, ref: 'Teacher', required: true },
    uploadDate: { type: Date, default: Date.now },
    lastUpdated: { type: Date, default: Date.now }
});

const StudyMaterial = mongoose.model('StudyMaterial', studyMaterialSchema);
module.exports = StudyMaterial;
