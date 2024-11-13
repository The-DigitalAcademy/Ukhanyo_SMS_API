const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const serviceRequestSchema = new mongoose.Schema({
    requesterId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, enum: ['administrative', 'technical', 'other'], required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    status: { 
        type: String, 
        enum: ['pending', 'in-progress', 'resolved', 'cancelled'],
        default: 'pending'
    },
    priority: { type: String, enum: ['low', 'medium', 'high'], default: 'medium' },
    assignedTo: { type: Schema.Types.ObjectId, ref: 'User' },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    resolution: String,
    attachments: [String]
});

const ServiceRequest = mongoose.model('ServiceRequest', serviceRequestSchema);
module.exports = ServiceRequest;
