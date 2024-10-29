const express = require("express");
const router = express.Router();
const studentController = require("../controllers/student_controller");

router.post("/add", studentController.createStudent);

router.get("/get-all", studentController.getAllStudents);

router.get("/get-one/:id", studentController.getOneStudent);

router.delete("/delete-all", studentController.deleteAllStudents);

router.delete("/delete-one/:id", studentController.deleteStudents);

router.put("/update/:id", studentController.updateStudents);

module.exports = router;
