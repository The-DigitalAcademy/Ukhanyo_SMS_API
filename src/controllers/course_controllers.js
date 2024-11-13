const Course = require('../models/course');


exports.getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.status(200).json(course);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.createCourse = async (req, res) => {
  const { courseName, description, credits, instructor, duration, schedule } = req.body;

  const newCourse = new Course({
    courseName,
    description,
    credits,
    instructor,
    duration,
    schedule,
  });

  try {
    const savedCourse = await newCourse.save();
    res.status(201).json(savedCourse);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


exports.updateCourse = async (req, res) => {
  const { courseName, description, credits, instructor, duration, schedule } = req.body;

  try {
    const updatedCourse = await Course.findByIdAndUpdate(
      req.params.id,
      { courseName, description, credits, instructor, duration, schedule },
      { new: true }
    );

    if (!updatedCourse) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.status(200).json(updatedCourse);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.deleteCourse = async (req, res) => {
  try {
    const deletedCourse = await Course.findByIdAndDelete(req.params.id);

    if (!deletedCourse) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.status(200).json({ message: "Course deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
