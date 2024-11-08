const Student = require("../models/student");
const Subject = require("../models/subject");
const User = require('../models/user_model')

exports.createStudent = async (req, res) => {
    const {uuid, subjects}= req.body 
    const subjectArray = await Subject.find({ "subjectCode" : { "$in" : subjects } })
    let subjectIDarr = [];


   try {
    const user = await User.findOne({uuid})
    console.log(user)

    if(!user){
      return res.status(404).json({message: "Could not find user"})
    }

    if(subjectArray.length > 0){
      for(const element of subjectArray) {
      subjectIDarr.push(element.id)
    }
    }
    
    const newStudent = new Student({user: user.id, enrolledClasses: subjectIDarr});
    const savedStudent = await newStudent.save();

    res.status(200).json(savedStudent);
  } catch (error) {
    res.json({ message: error.message });
  }
};

exports.getAllStudents = async (req, res) => {
  try {
    const students = await Student.find().populate('user').populate('enrolledClasses');
    res.send(students);
  } catch (error) {
    res
      .status(500)
      .send({ message: "Could not fetch students", error: error.message });
  }
};


exports.getOneStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const student = await Student.findById(id).populate("user").populate('enrolledClasses');
    if (!student) {
      return res.status(404).send({ message: "Student not found" });
    }
    student.dob = student.user.dob.toISOString().split('T')[0];
    res.status(200).json(student);
  } catch (error) {
    res
      .status(500)
      .send({ message: "Could not fetch student", error: error.message });
  }
};

exports.updateStudents = async (req, res) => {
  try {
    const updatedStudent = await Student.updateOne({ _id: req.params.id });
    res.status(200).json(updatedStudent);
  } catch (error) {
    res.json({ message: error.message });
  }
};

exports.deleteAllStudents = async (req, res) => {
  try {
    await Student.deleteMany({});
    res.send({ message: "All students deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Could not delete", error: error.message });
  }
};

exports.deleteStudents = async (req, res) => {
  try {
    const removedStudent = await Student.deleteOne({ _id: req.params.id });
    res.json(removedStudent);
  } catch (error) {
    res.json({ message: error.message });
  }
};