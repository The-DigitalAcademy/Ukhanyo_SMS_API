const express = require("express");
const router = express.Router();
const teacherController = require("../controllers/teacher_controller");

router.post("/add", teacherController.createTeacher);

router.get("/all", teacherController.getAllTeachers);

router.get("/:id", teacherController.getTeacherById);

router.get("/subjects/:id", teacherController.getTeacherSubjects);

router.put("/update/:id", teacherController.updateTeacherDetails); 

router.delete("/:id", teacherController.removeTeacher); 


module.exports = router;
