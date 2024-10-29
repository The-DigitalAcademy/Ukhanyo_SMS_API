const mongoose = require('mongoose');
const User = require('../models/user_model');
const Teacher = require('../models/teacher');
const Student = require('../models/student');
const Course = require('../models/course');
const Register = require('../models/register');
const StudyMaterial = require('../models/study_material');
const Event = require('../models/event');
const Announcement = require('../models/announcement');
const Grade = require('../models/grades');
const ServiceRequest = require('../models/service_request');
const Admin = require('../models/admin');

const { hashPassword } = require('../middleware/auth_middleware');

const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') })
require('dotenv').config();


const connectDB = async function(){
    try {
        await mongoose.connect(process.env.MONGO_DB_CONNSTR, {
            dbName: "ukhanyo"
        });
    } catch (error) {
        console.log(error);
        console.log('error connecting to db');
    }
    
    console.log("connection to db initialised!");
    
}

connectDB();

// Function to seed the database with values for all models
const seedDatabase = async () => {
    try {
        // Clear existing data
        await User.deleteMany({});
        await Teacher.deleteMany({});
        await Student.deleteMany({});
        await Course.deleteMany({});
        await Register.deleteMany({});
        await StudyMaterial.deleteMany({});
        await Event.deleteMany({});
        await Announcement.deleteMany({});
        await Grade.deleteMany({});
        await ServiceRequest.deleteMany({});
        await Admin.deleteMany({});

        // Seed Users (Teachers, Students, Admins)
        const users = await User.insertMany([
            { name: 'Teacher One', email: 'teacher1@ukhanyo.org', password: hashPassword('teacherpass1'), role: 'teacher' },
            { name: 'Teacher Two', email: 'teacher2@ukhanyo.org', password: hashPassword('teacherpass2'), role: 'teacher' },
            { name: 'Student One', email: 'student1@ukhanyo.org', password: hashPassword('studentpass1'), role: 'student' },
            { name: 'Student Two', email: 'student2@ukhanyo.org', password: hashPassword('studentpass2'), role: 'student' },
        ]);

        const teachers = await Teacher.insertMany([
            { user: users[0]._id, classes: [] },
            { user: users[1]._id, classes: [] }
        ]);
        
        const students = await Student.insertMany([
            { user: users[2]._id, enrolledClasses: [] },
            { user: users[3]._id, enrolledClasses: [] }
        ]);
        

        // Seed Courses
        const courses = await Course.insertMany([
            { name: 'Mathematics', teacher: users[0]._id, students: [users[2]._id, users[3]._id] },
            { name: 'Science', teacher: users[1]._id, students: [users[2]._id] }
        ]);

        // Seed Registers
        const registers = await Register.insertMany([
            {
                class: courses[0]._id, 
                date: new Date(), 
                studentAttendance: [
                    { student: users[2]._id, present: true },  // Present = true
                    { student: users[3]._id, present: false }  // Absent = false
                ]
            },
            {
                class: courses[1]._id, 
                date: new Date(), 
                studentAttendance: [
                    { student: users[2]._id, present: true }
                ]
            }
        ]);
        

        // Seed Study Materials
        await StudyMaterial.insertMany([
            { title: 'Algebra Basics', class: courses[0]._id, description: 'Introduction to algebra.', fileUrl: 'path/to/algebra.pdf', uploadedBy: users[0]._id },
            { title: 'Physics Fundamentals', class: courses[1]._id, description: 'Basic physics concepts.', fileUrl: 'path/to/physics.pdf', uploadedBy: users[1]._id }
        ]);
        

        // Seed Events
        await Event.insertMany([
            { name: 'Math Exam', class: courses[0]._id, date: new Date('2024-10-30') },
            { name: 'Science Fair', class: courses[1]._id, date: new Date('2024-11-10') }
        ]);
        

        // Seed Announcements
        await Announcement.insertMany([
            { class: courses[0]._id, title: 'Upcoming Math Exam', message: 'Prepare for the exam on 30th October.', createdBy: users[0]._id },
            { class: courses[1]._id, title: 'Science Fair Details', message: 'The science fair will be held on 10th November.', createdBy: users[1]._id }
        ]);
        

        // Seed Grades
        await Grade.insertMany([
            { subject: 'Math', student: users[2]._id, mark: 85, maxMark: 100 },
            { subject: 'Math', student: users[3]._id, mark: 78, maxMark: 100 },
            { subject: 'Science', student: users[2]._id, mark: 92, maxMark: 100 }
        ]);
        

        // Seed Service Requests
        await ServiceRequest.insertMany([
            { requestedBy: users[2]._id, type: 'academic', description: 'Request for additional study materials for Math.' },
            { requestedBy: users[3]._id, type: 'academic', description: 'Request for Science tutoring.' }
        ]);
        

        // Seed Admins
        // First, create an admin user in the User collection
        const adminUser = await User.create({
            name: 'Admin One',
            email: 'admin1@ukhanyo.org',
            password: hashPassword('adminpass1'),
            role: 'admin'
        });

        // Then, link the admin schema to the user
        await Admin.create({
            user: adminUser._id
        });


        console.log("Database seeded successfully!");
    } catch (error) {
        console.error("Error seeding the database:", error);
    }
};

// seedDatabase();

module.exports = seedDatabase;
