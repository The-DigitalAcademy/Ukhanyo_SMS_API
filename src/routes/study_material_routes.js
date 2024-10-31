const express = require('express');
const router = express.Router();
const studyMaterialController = require('../controllers/study_material_controller');

router.post('/study-materials', studyMaterialController.createStudyMaterial);
router.get('/study-materials', studyMaterialController.getAllStudyMaterials);
router.get('/study-materials/:id', studyMaterialController.getStudyMaterialById);
router.put('/study-materials/:id', studyMaterialController.updateStudyMaterial);
router.delete('/study-materials/:id', studyMaterialController.deleteStudyMaterial);

module.exports = router;
