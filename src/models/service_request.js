const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const serviceRequestSchema = new Schema({
    requestedBy: { 
        type: Schema.Types.ObjectId, 
        refPath: 'userType', 
        required: true 
    },
    userType: { 
        type: String, 
        required: true, 
        enum: ['Admin', 'admin', 'Student'] 
    },
    type: { 
        type: String, 
        required: true, 
        enum: ['technical', 'administrative', 'other'] 
    }, 
    description: { 
        type: String, 
        required: true 
    },
    status: { 
        type: String, 
        enum: ['pending', 'in-progress', 'completed'], 
        default: 'pending' 
    },
    priority: { 
        type: String, 
        enum: ['low', 'medium', 'high'], 
        default: 'medium' 
    },
    dateRequested: { 
        type: Date, 
        default: Date.now 
    },
    dateResolved: { 
        type: Date 
    }
}, { timestamps: true });

module.exports = mongoose.model('ServiceRequest', serviceRequestSchema);
