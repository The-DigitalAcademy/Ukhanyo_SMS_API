const express = require('express');
const router = express.Router();
const pastPaperController = require('../controllers/past_paper_controller');

router.post('/one', pastPaperController.createPaper);

router.get('/all', pastPaperController.getAllPapers);

router.get('/one/:id', pastPaperController.getPaperById);

router.put('/one/:id', pastPaperController.updatePaper);

router.delete('/one/:id', pastPaperController.deletePaper);

router.delete('/all', pastPaperController.deleteAllPapers);

router.put('/all', pastPaperController.updateAllPapers);
router.post('/add', pastPaperController.createPaper);
router.get('/papers', pastPaperController.getAllPapers);
router.get('/paper/:id', pastPaperController.getPaperById);
router.put('/update/:id', pastPaperController.updatePaper);
router.delete('/delete/:id', pastPaperController.deletePaper);
router.delete('/delete', pastPaperController.deleteAllPapers);



module.exports = router;