const express = require('express');
const router = express.Router();
const registerController = require('../controllers/register_controller');

router.get('/all', registerController.getAllRegisters);

router.get('/:id', registerController.getRegisterById);

router.get('/subject/:id', registerController.getRegistersBySubject);

// router.get('/teacher/:id', registerController.getRegistersByTeacher);

router.post('/add', registerController.createRegister);

router.put('/update/:id', registerController.updateRegister);

router.delete('/:id', registerController.deleteRegister);



module.exports = router;