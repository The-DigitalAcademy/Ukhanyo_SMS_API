const mongoose = require('mongoose');
const user_model = require('./user_model');
const Schema = mongoose.Schema;

const registerSchema = new Schema({
    class: { type: Schema.Types.ObjectId, ref: 'Subject', required: true },
    date: { type: Date, default: Date.now },
    studentAttendance: [{
      student: { type: Schema.Types.ObjectId, ref: 'Student', required: true },
      isPresent: { type: Boolean, required: true }
    }],
    teacher: { type: Schema.Types.ObjectId, ref: 'Teacher', required: true}
});

registerSchema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

module.exports = mongoose.model('Register', registerSchema);