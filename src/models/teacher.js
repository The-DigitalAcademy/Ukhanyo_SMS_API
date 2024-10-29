const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const teacherSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    classes: [{type: Schema.Types.ObjectId, ref: 'Course', required: true}],
});

module.exports = mongoose.model('Teacher', teacherSchema);
