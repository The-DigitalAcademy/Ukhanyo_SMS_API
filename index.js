const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const connectionString = require('./src/config/db_config');
const port = 3300;
const app = express();
const pastPaperRoutes = require('./src/routes/past_paper_routes');
const adminRoutes = require('./src/routes/admin_routes');
const studentRoutes = require('./src/routes/student_routes')
const teacherRoutes = require('./src/routes/teacher_routes');
const service_request = require("./src/routes/service_req");
const subjectRoute = require('./src/routes/subject_routes')
const announcementRoute = require('./src/routes/announcement_routes')
const gradeRoutes = require('./src/routes/grade_routes')
const registerRoutes = require('./src/routes/register_routes')
const eventRoutes = require('./src/routes/event_routes')


app.use(express.json())
app.use(express.urlencoded())

app.use(cors())
app.use((_req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, x-access-token');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  next();
})



mongoose.connect(connectionString.url)
  .then(()=>{
    console.log("Connected to DB successfully")
  })
  .catch((err)=> console.log("Could not connect to DB due to the following ", err.errmsg))







app.get("/", (_req, res) => {
  
  res.send("The Api is running 😀",connectionString.url );
});

app.use('/api/pastpaper', pastPaperRoutes);
app.use('/api/subject', subjectRoute);
app.use('/api/admin', adminRoutes);
app.use('/api/student', studentRoutes);
app.use('/api/teacher', teacherRoutes);
app.use('/api/service_req', service_request)
app.use('/api/announcement', announcementRoute)
app.use('/api/grade', gradeRoutes)
app.use('/api/register', registerRoutes)
app.use('/api/event', eventRoutes)







app.listen(port, () => {
  console.log(`The server is running on ${port}`);
});

module.exports = app;