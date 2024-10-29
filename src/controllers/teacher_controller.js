const Teacher = require("../models/teacher");

exports.createTeacher = async (req, res) => {
  const newTeacher = new Teacher(req.body);
  try {
    const savedTeacher= await newTeacher.save();
    res.json(savedTeacher);
  } catch (error) {
    res.json({ message: error.message });
  }
};

exports.getAllTeachers = async (req, res) => {
  try {
    const teachers = await Teacher.find();
    res.send(teachers);
  } catch (error) {
    res
      .status(500)
      .send({ message: "Could not fetch teachers", error: error.message });
  }
};

exports.getTeacher = async (req, res) => {
  try {
    const { id } = req.params;
    const teacher = await Teacher.findById(id);
    if (!teacher) {
      return res.status(404).send({ message: "Teacher not found" });
    }
    res.json(teacher);
  } catch (error) {
    res
      .status(500)
      .send({ message: "Could not fetch teacher", error: error.message });
  }
};

exports.updateTeacher = async (req, res) => {
  try {
    const updatedTeacher= await Teacher.updateOne({ _id: req.params.id });
    res.json(updatedTeacher);
  } catch (error) {
    res.json({ message: error.message });
  }
};
