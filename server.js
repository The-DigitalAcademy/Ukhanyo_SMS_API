const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const {connectionString} = require('./src/config/db_config');
const port = 3300;
const app = express();


app.use(cors())
app.use((_req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, x-access-token');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  next();
})

app.use(express.json());

// console.log(connectionString.url)

mongoose.connect(connectionString.url, {dbName: 'ukhanyo'});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});


app.get("/", (_req, res) => {
  res.send("The Api is running!");
});

app.use('/api', require('./src/routes/announcement_routes'));
app.use('/api', require('./src/routes/attendance_routes'));
app.use('/api', require('./src/routes/event_routes'));
app.use('/api', require('./src/routes/grade_routes'));
app.use('/api', require('./src/routes/student_routes'));
app.use('/api', require('./src/routes/study_material_routes'));
app.use('/api', require('./src/routes/subject_routes'));
app.use('/api', require('./src/routes/teacher_routes'));
app.use('/api', require('./src/routes/user_routes'));


app.listen(port, () => {
  console.log(`The server is running on ${port}`);
});

module.exports = app;