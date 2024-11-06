const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const studentSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    enrolledClasses: [{ type: Schema.Types.ObjectId, ref: 'Subject' }], // Link to classes
    serviceRequests: [{ type: Schema.Types.ObjectId, ref: 'ServiceRequest' }],
    student_number: { type: String, unique: true },
    // Other student-specific fields like marks or attendance could be added separately
});

studentSchema.pre("save", async function (next) {
    if (this.isNew) {
        const year = new Date().getFullYear().toString().slice(-2);  
        const sequence = Math.floor(Math.random() * 10000).toString().padStart(4, "0");  
        this.student_number = `UKST${year}${sequence}`;
    }
    next();
});

studentSchema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

module.exports = mongoose.model('Student', studentSchema);
