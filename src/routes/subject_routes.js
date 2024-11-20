const express = require("express");
const router = express.Router();
const subjectController = require("../controllers/subject.controller");

router.post("/one", subjectController.createSubject);

router.get("/all", subjectController.getAllSubjects);

router.get("/one/:id", subjectController.getSubjectById);

router.put("/one/:id", subjectController.updateSubject); 

module.exports = router;
// 