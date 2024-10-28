const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const registerSchema = new Schema({
    course: { 
        type: Schema.Types.ObjectId, 
        ref: 'Course', 
        required: true 
    },
    date: { 
        type: Date, 
        required: true 
    },
    studentAttendance: [{
        student: { 
            type: Schema.Types.ObjectId, 
            ref: 'Student', 
            required: true 
        },
        present: { 
            type: Boolean, 
            required: true 
        },
        remarks: { 
            type: String, 
            default: "" 
        }
    }],
    recordedBy: { 
        type: Schema.Types.ObjectId, 
        ref: 'admin', 
        required: true 
    }
}, { timestamps: true });

module.exports = mongoose.model('Register', registerSchema);
