const mongoose = require("mongoose");

const educatorSchema = new mongoose.Schema({
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

const Educator = mongoose.model('admin', educatorSchema);

// Educator.insertMany([{name:"Ms Mary Sobekwa",description:"Teaches grade 11& 12 pupils. Specializes in Mathematics and Life Sciences."}])

module.exports = Educator;
