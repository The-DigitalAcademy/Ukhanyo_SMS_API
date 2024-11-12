const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const subjectSchema = new Schema({
    name: { type: String, required: true, unique: true },
    subjectCode: { type: String, required: true, unique: true },
    teacher: { type: Schema.Types.ObjectId, ref: "Teacher",  },
    students: [{ type: Schema.Types.ObjectId, ref: "Student" }],
    studyMaterials: [{ type: Schema.Types.ObjectId, ref: "StudyMaterial" }],
    announcements: [{ type: Schema.Types.ObjectId, ref: "Announcement" }],
    events: [{ type: Schema.Types.ObjectId, ref: "Event" }],
    marks: [{ type: Schema.Types.ObjectId, ref: "Grade" }],
    attendance: [{ type: Schema.Types.ObjectId, ref: "Attendance" }],
    
});

// subjectSchema.pre("save", async function (next) {
//   if (this.isNew) {
//       const year = new Date().getFullYear().toString().slice(-2);  
//       const sequence = Math.floor(Math.random() * 10000).toString().padStart(4, "0");  
//       this.subjectCode = `SUB${year}USR01${sequence}`;
//   }
//   next();
// });

subjectSchema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

module.exports = mongoose.model("Subject", subjectSchema);