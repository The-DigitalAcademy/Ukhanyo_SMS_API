const Grade = require('../models/grades');
const Subject = require('../models/subject');
const Student = require('../models/student');


exports.addGrade = async (req, res) => {
    try {
        const { description, type, term, studentId, subject, mark, maxMark, teacherId, comment} = req.body;

        const className = await Subject.findOne({subjectCode: subject});
        if (!className) return res.status(404).json({ message: 'Subject not found' });

        const student = await Student.findById(studentId);
        if (!student) return res.status(404).json({ message: 'Student not found' });

        const newGrade = new Grade({
            name: description,
            type,
            term,
            subject: className.id,
            student: studentId,
            mark,
            maxMark,
            teacherId,
            comment
        });

        await newGrade.save();
            

        res.status(201).json(newGrade);
    } catch (err) {
        res.status(500).json({ message: 'Error adding grade', error: err.message });
    }
}


exports.getCourseGrades = async (req, res) => {
    try {
        const { courseId } = req.params;
        const grades = await Grade.find({ class: courseId }).populate('student').populate({
            path: 'student', 
            populate: ('user')
        });

        res.status(200).json(grades);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching grades', error: err.message });
    }
}

exports.getAllStudentGrades = async (req, res) => {
    try {
        const studendId  = req.params.id;
        const student = await Student.findById(studendId).populate('user')
        if(!student) return res.status(404).json({message: "Could not find student!!!"});
        console.log(student)

        const grades = await Grade.find({student: student.id}).populate('subject').populate({
            path: 'student', 
            populate: ('user')
        });
        
        if(grades.length==0) return res.status(404).json({message: `Could not get grades for this student: ${student.user.name}`, })

        res.status(200).json(grades);

    } catch (err) {
        res.status(500).json({ message: 'Error fetching grades', error: err.message });
    }
}


exports.getStudentGrades = async (req, res) => {
    try {
        const { studentId } = req.params;
        const grades = await Grade.find({ student: studentId }).populate('class');
        res.status(200).json(grades);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching grades', error: err.message });
    }
}

exports.getStudentGradesForTeacher = async (req, res) => {
    try {
        const teacherId = req.params.id;

        const grades = await Grade.find({teacherId})
                                .populate('subject')
                                .populate('teacherId')
                                .populate({
                                    path: 'student', 
                                    populate: ('user')
                                })
        if(!grades){
            return res.status(404).json({message: "Could not find requested grades"})
        }
        res.status(200).json(grades);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching grades', error: err.message });
    }
}


exports.updateSudentGrade = async (req, res) => {
    try {
        const gradeId  = req.params.id;
        const { name, type, term, studentId, subject, mark, maxMark, teacherId, comment} = req.body;

        const className = await Subject.findOne({subjectCode: subject});
        if (!className) return res.status(404).json({ message: 'Subject not found' });

        const updatedGrade = await Grade.findByIdAndUpdate(
            gradeId,
            { name,
                type,
                term,
                subject: className.id,
                student: studentId,
                mark,
                maxMark,
                teacherId,
                comment
            },
            { new: true }
        );
        if (!updatedGrade) return res.status(404).json({ message: 'Grade not found' });

        res.status(200).json(updatedGrade);
    } catch (err) {
        res.status(500).json({ message: 'Error updating grade', error: err.message });
    }
}


exports.deleteGrade = async (req, res) => {
    try {
        const id = req.params.id;

        const deletedGrade = await Grade.findByIdAndDelete(id);
        if (!deletedGrade) return res.status(404).json({ message: 'Grade not found' });

        res.status(200).json({ message: 'Grade deleted' });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting grade', error: err.message });
    }
}
