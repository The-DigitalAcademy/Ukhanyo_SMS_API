const express = require("express");
const router = express.Router();
const service_reqController = require("../controllers/service_request");

router.post("/one", service_reqController.createServiceRequest);

router.get("/all", service_reqController.getAllServiceRequests);

router.get("/one/:id", service_reqController.getServiceRequestById);

router.get("/student/:id", service_reqController.getServiceReqByStudentId);

// router.delete("/d_all", service_reqController.);

router.delete("/one/:id", service_reqController.deleteServiceRequest);

router.put("/one/:id", service_reqController.updateServiceRequestStatus);

module.exports = router;