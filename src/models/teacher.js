const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const teacherSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    classes: [{type: Schema.Types.ObjectId, ref: 'Course', required: true}],
});

teacherSchema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

module.exports = mongoose.model('Teacher', teacherSchema);
