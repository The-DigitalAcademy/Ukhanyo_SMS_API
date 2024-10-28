const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const gradeSchema = new Schema({
    student: { 
        type: Schema.Types.ObjectId, 
        ref: 'Student', 
        required: true 
    },
    course: { 
        type: Schema.Types.ObjectId, 
        ref: 'Course', 
        required: true 
    },
    subject: { 
        type: String, 
        required: true 
    },
    mark: { 
        type: Number, 
        required: true 
    },
    maxMark: { 
        type: Number, 
        required: true 
    },
    gradedBy: { 
        type: Schema.Types.ObjectId, 
        ref: 'admin', 
        required: true 
    }
}, { timestamps: true });

module.exports = mongoose.model('Grade', gradeSchema);
