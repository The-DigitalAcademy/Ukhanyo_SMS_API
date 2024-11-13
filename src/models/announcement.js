// models/Announcement.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const announcementSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    targetAudience: [{
        type: String,
        enum: ['all', 'teachers', 'students', 'admins']
    }],
    createdAt: { type: Date, default: Date.now },
    expiryDate: Date,
    isActive: { type: Boolean, default: true }
});

const Announcement = mongoose.model('Announcement', announcementSchema);
module.exports = Announcement;
