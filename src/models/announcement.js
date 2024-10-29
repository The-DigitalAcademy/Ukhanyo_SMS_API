// models/Announcement.js
const mongoose = require('mongoose');

const announcementSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  author: {
    type: String,
    required: true,
  },
  targetAudience: {
    type: String,  // e.g., "students", "teachers", "all"
    default: "all",
  },
});

module.exports = mongoose.model('Announcement', announcementSchema);
