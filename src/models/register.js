const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const registerSchema = new Schema({
    class: { type: Schema.Types.ObjectId, ref: 'Class', required: true },
    date: { type: Date, required: true },
    studentAttendance: [{
      student: { type: Schema.Types.ObjectId, ref: 'Student', required: true },
      present: { type: Boolean, required: true }
    }]
});

module.exports = mongoose.model('Register', registerSchema);