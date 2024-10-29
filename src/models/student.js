const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  fullName: {
    type: String,
  },
  yearOfStudy: {
    type: String,
  },
  marks: {
    type: String,
  },

  average: {
    type: String,
  },
  roles: {
    type: [{
        type: String,
        enum: ['user', 'admin']
    }],
    default: ['user']
}
});

const Student = mongoose.model("Student", studentSchema);


module.exports = Student;
