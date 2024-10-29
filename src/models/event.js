const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema({
    class: { type: Schema.Types.ObjectId, ref: 'Class', required: true },
    name: { type: String, required: true },
    date: { type: Date, required: true },
    description: { type: String }
});

eventSchema.method("toJSON", function() {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});
module.exports = mongoose.model('Event', eventSchema);
