const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const courseSchema = new Schema({
    name: { 
        type: String, 
        required: true 
    },
    teacher: { 
        type: Schema.Types.ObjectId, 
        ref: "admin", 
        required: true 
    },
    students: [{ 
        type: Schema.Types.ObjectId, 
        ref: "Student" 
    }],
    studyMaterials: [{ 
        type: Schema.Types.ObjectId, 
        ref: "StudyMaterial" 
    }],
    announcements: [{ 
        type: Schema.Types.ObjectId, 
        ref: "Announcement" 
    }],
    events: [{ 
        type: Schema.Types.ObjectId, 
        ref: "Event" 
    }],
    grades: [{ 
        type: Schema.Types.ObjectId, 
        ref: "Grade" 
    }],
    attendanceRecords: [{ 
        type: Schema.Types.ObjectId, 
        ref: "Register" 
    }],
}, { timestamps: true });

module.exports = mongoose.model("Course", courseSchema);
