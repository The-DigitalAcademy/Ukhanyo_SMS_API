const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema({
    class: { type: Schema.Types.ObjectId, ref: 'Class', required: true },
    name: { type: String, required: true },
    date: { type: Date, required: true },
    description: { type: String }
});

module.exports = mongoose.model('Event', eventSchema);
