const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: { type: String, required: true },
    last_name: { type: String, required: true },
    contact_no: { type: String, required: true },
    dob: {  type: Date, require: true},
    gender: { type: String, require: true },
    id_number: { type: String, required: true, unique: true, index: true, match: /^[0-9]{13}$/,},
    address: {
      street: { type: String, require: true  },
      suburb: { type: String, require: true },
      city: { type: String, require: true },
      postal_code: { type: String, require: true },
    },
    uuid : {type: String, unique: true},
    status: { type: String, enum: ['active', 'inactive', 'suspended'], default: 'active' },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false },
    role: { type: String, enum: ['admin', 'teacher', 'student'], required: true },
}, { timestamps: true });

userSchema.pre("save", async function (next) {
  if (this.isNew) {
      const year = new Date().getFullYear().toString().slice(-2);  
      const sequence = Math.floor(Math.random() * 10000).toString().padStart(4, "0");  
      this.uuid = `UK${year}USR01${sequence}`;
  }
  next();
});

userSchema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });
  
module.exports = mongoose.model('User', userSchema);