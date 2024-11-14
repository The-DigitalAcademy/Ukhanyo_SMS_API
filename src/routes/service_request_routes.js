const express = require('express');
const router = express.Router();
const serviceRequestController = require('../controllers/service_request_controller');

router.post('/service-requests', serviceRequestController.createServiceRequest);
router.get('/service-requests', serviceRequestController.getAllServiceRequests);
router.get('/service-requests/:id', serviceRequestController.getServiceRequestById);
router.put('/service-requests/:id', serviceRequestController.updateServiceRequest);
router.delete('/service-requests/:id', serviceRequestController.deleteServiceRequest);

module.exports = router;
