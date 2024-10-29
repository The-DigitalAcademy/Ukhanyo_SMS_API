const express = require("express");
const router = express.Router();
const teacherController = require("../controllers/teacher_controller");

router.post("/add", teacherController.createTeacher);

router.get("/get-all", teacherController.getAllTeachers);

router.get("/get-one/:id", teacherController.getTeacher);

router.put("/update/:id", teacherController.updateTeacher);

module.exports = router;
