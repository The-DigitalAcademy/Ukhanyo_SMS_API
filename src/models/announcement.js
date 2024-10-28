const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const announcementSchema = new Schema({
    class: { type: Schema.Types.ObjectId, ref: 'Class', required: true },
    title: { type: String, required: true },
    message: { type: String, required: true },
    date: { type: Date, default: Date.now },
    createdBy: { type: Schema.Types.ObjectId, ref: 'Teacher', required: true } // figure out how to do multiple ref
});

module.exports = mongoose.model('Announcement', announcementSchema);
