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
const seedDatabase = require("./src/config/seed");


app.use(cors())
app.use((_req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, x-access-token');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  next();
})

app.use(express.json());

// console.log(connectionString.url)

mongoose.connect(connectionString.url)
  .then(()=>{
    console.log("Cnnected to DB successfully")
  })
  .catch((err)=> console.log("Could not connect to DB due to the following ", err.errmsg))







app.get("/", (_req, res) => {
  res.send("The Api is running!");
});

app.use('/api/pastpaper', pastPaperRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/student', studentRoutes);
app.use('/api/teacher', teacherRoutes);



app.listen(port, () => {
  console.log(`The server is running on ${port}`);
});

module.exports = app;