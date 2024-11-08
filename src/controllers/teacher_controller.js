const Teacher = require('../models/teacher');
const Course = require('../models/course');
const User = require('../models/user_model');
const Subject = require('../models/subject');


exports.createTeacher = async (req, res) => {
    try {
        const { uuid, subjects } = req.body;

        const user = await User.findOne({uuid});
        if (!user) return res.status(404).json({ message: 'User not found' });

        const subjectArray = await Subject.find({ "subjectCode" : { "$in" : subjects } })
        let subjectIDarr = [];

        if(subjectArray.length > 0){
            for(const element of subjectArray) {
            subjectIDarr.push(element.id)
          }
        }

        const teacher = new Teacher({
            user: user.id,
            classes: subjectIDarr
        });

        await teacher.save();
        res.status(201).json(teacher);
    } catch (err) {
        res.status(500).json({ message: 'Error creating teacher', error: err.message });
    }
}


exports.getAllTeachers = async (req, res) => {
    try {
      
        const teachers = await Teacher.find().populate('user').populate('classes');
        res.status(200).json(teachers);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching teachers', error: err.message });
    }
}


exports.getTeacherById = async (req, res) => {
    try {
        const teacherId  = req.params.id

        const teacher = await Teacher.findById(teacherId).populate('user');
        
        if (!teacher) return res.status(404).json({ message: 'Teacher not found' });

        res.status(200).json(teacher);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching teacher', error: err.message });
    }
}


exports.getTeacherCourses = async (req, res) => {
    try {
        const { teacherId } = req.params;
        const teacher = await Teacher.findById(teacherId).populate('classes');
        if (!teacher) return res.status(404).json({ message: 'Teacher not found' });

        const courses = await Course.find({ teacher: teacherId });
        res.status(200).json(courses);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching teacher courses', error: err.message });
    }
}


exports.updateTeacherDetails = async (req, res) => {
    try {
        const { teacherId } = req;
        console.log(teacherId)
        const { subjects } = req.body;
        let subjectIDarr = [];

        if(!subjects){
            return res.json({message: "No subjects was provided"})
        }

        const subjectArray = await Subject.find({ "subjectCode" : { "$in" : subjects } })
       
        for(const element of subjectArray) {
            subjectIDarr.push(element.id)
          }

        const updatedTeacher = await Teacher.findByIdAndUpdate(
            teacherId,
            { classes: subjectIDarr },
            { new: true }
        ).populate('user').populate('classes');
        if (!updatedTeacher) return res.status(404).json({ message: 'Teacher not found' });

        res.status(200).json(updatedTeacher);
    } catch (err) {
        res.status(500).json({ message: 'Error updating teacher courses', error: err.message });
    }
}



exports.removeTeacher = async (req, res)=>{
    const { teacherId } = req.params.id
    try {
        
        const deletedTeacher = await Teacher.findOneAndDelete({teacherId});
        if (!deletedTeacher) return res.status(404).json({ message: 'Teacher not found' });

        res.status(200).json({ message: 'Teacher deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting teacher', error: err.message });
    }
}
