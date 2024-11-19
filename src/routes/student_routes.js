const express = require("express");
const router = express.Router();
const studentController = require("../controllers/student_controller");

router.post("/one", studentController.createStudent);

router.get("/all", studentController.getAllStudents);

router.get("/one/:id", studentController.getOneStudent);


router.delete("/all", studentController.deleteAllStudents);

router.delete("/one/:id", studentController.deleteStudents);

router.put("/class/:id", studentController.updateStudentClasses);

module.exports = router;
