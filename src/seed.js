const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const User = require('./models/user');
const Teacher = require('./models/teacher');
const Student = require('./models/student');
const Subject = require('./models/subject');
const Announcement = require('./models/announcement');
const Event = require('./models/event');
const Grade = require('./models/grade');
const Attendance = require('./models/attendance');
const StudyMaterial = require('./models/study_material');
const ServiceRequest = require('./models/service_request');

async function seedDatabase() {
    try {
        // Clear existing data
        await Promise.all([
            User.deleteMany({}),
            Teacher.deleteMany({}),
            Student.deleteMany({}),
            Subject.deleteMany({}),
            Announcement.deleteMany({}),
            Event.deleteMany({}),
            Grade.deleteMany({}),
            Attendance.deleteMany({}),
            StudyMaterial.deleteMany({}),
            ServiceRequest.deleteMany({})
        ]);

        // Create admin user
        const adminPassword = await bcrypt.hash('admin123', 10);
        const admin = await User.create({
            email: 'admin@school.com',
            password: adminPassword,
            firstName: 'Admin',
            lastName: 'User',
            phoneNumber: '123-456-7890',
            role: 'admin'
        });

        // Create teachers
        const teacherUsers = await User.insertMany([
            {
                email: 'smith@school.com',
                password: await bcrypt.hash('teacher123', 10),
                firstName: 'John',
                lastName: 'Smith',
                phoneNumber: '123-456-7891',
                role: 'teacher'
            },
            {
                email: 'jones@school.com',
                password: await bcrypt.hash('teacher123', 10),
                firstName: 'Sarah',
                lastName: 'Jones',
                phoneNumber: '123-456-7892',
                role: 'teacher'
            }
        ]);

        const teachers = await Teacher.insertMany(
            teacherUsers.map((user, index) => ({
                user: user._id,
                employeeId: `T${2024}${index + 1}`,
                qualifications: ['M.Ed', 'B.Sc'],
            }))
        );

        // Create students
        const studentUsers = await User.insertMany([
            {
                email: 'alice@school.com',
                password: await bcrypt.hash('student123', 10),
                firstName: 'Alice',
                lastName: 'Johnson',
                role: 'student'
            },
            {
                email: 'bob@school.com',
                password: await bcrypt.hash('student123', 10),
                firstName: 'Bob',
                lastName: 'Wilson',
                role: 'student'
            },
            {
                email: 'carol@school.com',
                password: await bcrypt.hash('student123', 10),
                firstName: 'Carol',
                lastName: 'Davis',
                role: 'student'
            }
        ]);

        const students = await Student.insertMany(
            studentUsers.map((user, index) => ({
                user: user._id,
                studentId: `S${2024}${index + 1}`,
                dateOfBirth: new Date(2006, index, 1),
                guardian: {
                    name: `Parent ${index + 1}`,
                    relationship: 'Parent',
                    contact: `123-555-${1000 + index}`,
                    email: `parent${index + 1}@example.com`
                }
            }))
        );

        // Create subjects
        const subjects = await Subject.insertMany([
            {
                name: 'Mathematics',
                description: 'Advanced Mathematics including Algebra and Calculus',
                grade: 11,
                teacher: teachers[0]._id,
                students: students.map(student => student._id)
            },
            {
                name: 'Physics',
                description: 'Physics principles and practical applications',
                grade: 11,
                teacher: teachers[1]._id,
                students: students.map(student => student._id)
            }
        ]);

        // Update teachers with subjects
        await Promise.all(
            teachers.map((teacher, index) =>
                Teacher.findByIdAndUpdate(teacher._id, {
                    subjects: [subjects[index]._id]
                })
            )
        );

        // Update students with subjects
        await Promise.all(
            students.map(student =>
                Student.findByIdAndUpdate(student._id, {
                    subjects: subjects.map(subject => subject._id)
                })
            )
        );

        // Create announcements
        await Announcement.insertMany([
            {
                title: 'End of Term Exams',
                content: 'End of term examinations will begin next week. Please check the schedule.',
                createdBy: admin._id,
                targetAudience: ['all'],
                expiryDate: new Date(2024, 11, 31)
            },
            {
                title: 'Parent-Teacher Meeting',
                content: 'Parent-teacher meetings are scheduled for next Friday.',
                createdBy: teachers[0]._id,
                targetAudience: ['teachers', 'students'],
                expiryDate: new Date(2024, 11, 15)
            }
        ]);

        // Create events
        await Event.insertMany([
            {
                title: 'Annual Sports Day',
                description: 'Annual sports competition for all students',
                startDate: new Date(2024, 11, 20),
                type: 'sports',
                targetAudience: ['all']
            },
            {
                title: 'Science Fair',
                description: 'Annual science project exhibition',
                startDate: new Date(2024, 11, 25),
                type: 'academic',
                targetAudience: ['teachers', 'students']
            }
        ]);

        // Create grades
        await Grade.insertMany(
            students.flatMap(student =>
                subjects.map(subject => ({
                    student: student._id,
                    subject: subject._id,
                    assessmentType: 'test',
                    title: 'Midterm Exam',
                    score: Math.floor(Math.random() * 30) + 70, // Random score between 70-100
                    totalPossible: 100,
                    date: new Date(2024, 10, 15),
                    recordedBy: subject.teacher
                }))
            )
        );

        // Create attendance records
        await Attendance.insertMany(
            students.flatMap(student =>
                subjects.map(subject => ({
                    student: student._id,
                    subject: subject._id,
                    date: new Date(2024, 10, 15),
                    status: Math.random() > 0.1 ? 'present' : 'absent',
                    recordedBy: subject.teacher
                }))
            )
        );

        // Create study materials
        await StudyMaterial.insertMany(
            subjects.map((subject, index) => ({
                title: `${subject.name} Study Guide`,
                description: `Comprehensive study guide for ${subject.name}`,
                subject: subject._id,
                fileUrl: `https://example.com/materials/${index + 1}`,
                uploadedBy: subject.teacher
            }))
        );

        // Create service requests
        await ServiceRequest.insertMany([
            {
                requesterId: students[0]._id,
                type: 'administrative',
                title: 'Transcript Request',
                description: 'Need official transcript for college application',
                status: 'pending',
                priority: 'high'
            },
            {
                requesterId: teachers[0]._id,
                type: 'technical',
                title: 'Projector Maintenance',
                description: 'Classroom projector needs maintenance',
                status: 'in-progress',
                priority: 'medium',
                assignedTo: admin._id
            }
        ]);

        console.log('Database seeded successfully!');
    } catch (error) {
        console.error('Error seeding database:', error);
    }
}

// Connect to MongoDB and seed the database
mongoose.connect(process.env.DB_URL, {
    dbName: "ukhanyo"
})
.then(() => {
    console.log('Connected to MongoDB');
    return seedDatabase();
})
.then(() => {
    console.log('Seeding completed');
    process.exit(0);
})
.catch(error => {
    console.error('Error:', error);
    process.exit(1);
});