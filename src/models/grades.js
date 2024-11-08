const mongoose = require('mongoose');
const teacher = require('./teacher');
const Schema = mongoose.Schema;

const gradeSchema = new Schema({
    name: { type: String, required: true },
    type: { type: String, required: true },
    term: { type: String, required: true },
    student: { type: Schema.Types.ObjectId, ref: 'Student', required: true },
    subject: { type: Schema.Types.ObjectId, ref: 'Subject', required: true},
    mark: { type: Number, required: true },
    maxMark: { type: Number, required: true },
    teacherId: {type: Schema.Types.ObjectId, ref: 'Student', required: true },
    comment: { type: String, required: true },
});
gradeSchema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });
module.exports = mongoose.model('Grades', gradeSchema);
