const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const studentSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    enrolledClasses: [{ type: Schema.Types.ObjectId, ref: 'Class' }], // Link to classes
    serviceRequests: [{ type: Schema.Types.ObjectId, ref: 'ServiceRequest' }],
    // Other student-specific fields like marks or attendance could be added separately
});
studentSchema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

module.exports = mongoose.model('Student', studentSchema);
