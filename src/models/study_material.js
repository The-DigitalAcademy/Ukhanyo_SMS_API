const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const studyMaterialSchema = new Schema({
    course: { 
        type: Schema.Types.ObjectId, 
        ref: 'Course', 
        required: true 
    },
    title: { 
        type: String, 
        required: true 
    },
    description: { 
        type: String 
    },
    fileUrl: { 
        type: String, 
        required: true 
    },
    uploadedBy: { 
        type: Schema.Types.ObjectId, 
        ref: 'admin', 
        required: true 
    },
    dateUploaded: { 
        type: Date, 
        default: Date.now 
    }
}, { timestamps: true });

module.exports = mongoose.model('StudyMaterial', studyMaterialSchema);
