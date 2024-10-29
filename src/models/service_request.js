const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const serviceRequestSchema = new Schema({
    requestedBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, required: true }, //"technical", "administrative"
    description: { type: String, required: true },
    status: { type: String, enum: ['pending', 'in-progress', 'completed'], default: 'pending' },
    dateRequested: { type: Date, default: Date.now }
});


module.exports = mongoose.model('ServiceRequest', serviceRequestSchema);
