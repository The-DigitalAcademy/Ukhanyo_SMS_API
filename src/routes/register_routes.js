const express = require('express');
const router = express.Router();
const registerController = require('../controllers/register_controller');

router.post('/registers', registerController.createRegister);
router.get('/registers', registerController.getAllRegisters);
router.get('/registers/:id', registerController.getRegisterById);
router.put('/registers/:id', registerController.updateRegister);
router.delete('/registers/:id', registerController.deleteRegister);

module.exports = router;
