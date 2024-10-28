const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const studyMaterialSchema = new Schema({
    class: { type: Schema.Types.ObjectId, ref: 'Class', required: true },
    title: { type: String, required: true },
    description: { type: String },
    fileUrl: { type: String, required: true }, // Link to file storage??? or upload files directly??
    uploadedBy: { type: Schema.Types.ObjectId, ref: 'Teacher', required: true },
    dateUploaded: { type: Date, default: Date.now }
});

module.exports = mongoose.model('StudyMaterial', studyMaterialSchema);
