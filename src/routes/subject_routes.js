const express = require("express");
const router = express.Router();
const subjectController = require("../controllers/subject.controller");

router.post("/add", subjectController.createSubject);

router.get("/all", subjectController.getAllSubjects);

router.get("/one/:id", subjectController.getSubjectById);

// router.put("/update/:id", teacherController.); 

module.exports = router;