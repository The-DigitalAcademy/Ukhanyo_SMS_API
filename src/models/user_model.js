const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: { type: String, required: true },
    last_name: { type: String, required: true },
    contact_no: { type: String, required: true },
    address: { type: String, required: true },
    dob: {  type: Date, require: true},
    id_number: { type: String, required: true, unique: true, index: true, match: /^[0-9]{13}$/,},
    address: {
      house_no: { type: String, require: true },
      street: { type: String, require: true  },
      surbub: { type: String, require: true },
      city: { type: String, require: true },
      postal_code: { type: String, require: true },
    },
    status: { type: String, enum: ['active', 'inactive', 'suspended'], default: 'active' },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false },
    role: { type: String, enum: ['admin', 'teacher', 'student'], required: true },
}, { timestamps: true });

userSchema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });
  
module.exports = mongoose.model('User', userSchema);