const mongoose = require("mongoose");

const teacherSchema = new mongoose.Schema({
  name: {
    type: String,
    
  },
  description: {
    type: String,
  },
  roles: {
    type: [{
        type: String,
        enum: ['user', 'admin']
    }],
    default: ['admin']
},

});

const Teacher = mongoose.model('admin', teacherSchema);

// Teacher.insertMany([{name:"Ms Mary Sobekwa",description:"Teaches grade 11& 12 pupils. Specializes in Mathematics and Life Sciences."}])

module.exports = Teacher;
