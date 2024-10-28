const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  organizer: {
    type: String,  
    default: "School Admin",
  },
  targetAudience: {
    type: String,  
    default: "all",
  },
});

module.exports = mongoose.model('Event', eventSchema);
