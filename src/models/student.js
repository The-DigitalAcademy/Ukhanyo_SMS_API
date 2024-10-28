const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const studentSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    enrolledClasses: [{ type: Schema.Types.ObjectId, ref: 'Class' }], // Link to classes
    serviceRequests: [{ type: Schema.Types.ObjectId, ref: 'ServiceRequest' }],
    // Other student-specific fields like marks or attendance could be added separately
});

module.exports = mongoose.model('Student', studentSchema);
