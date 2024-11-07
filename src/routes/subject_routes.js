const express = require("express");
const router = express.Router();
const subjectController = require("../controllers/subject.controller");

router.post("/add", subjectController.createSubject);

router.get("/get-all", subjectController.getAllSubjects);

// router.get("/get-one/:id", subjectController.getTeacherById);

// router.put("/update/:id", teacherController.); 

module.exports = router;