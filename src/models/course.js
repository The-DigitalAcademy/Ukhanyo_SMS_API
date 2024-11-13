const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  courseName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  credits: {
    type: Number,
    required: true,
  },
  instructor: {
    type: String,
    required: true,
  },
  duration: {
    type: String,  
    required: true,
  },
  schedule: {
    type: String,  
  },
});

module.exports = mongoose.model('Course', courseSchema);
