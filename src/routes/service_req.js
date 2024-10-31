const express = require("express");
const router = express.Router();
const service_reqController = require("../controllers/service_request");

router.post("/add/", service_reqController.createServiceRequest);

router.get("/get-all", service_reqController.getAllServiceRequests);

router.get("/get-one/:id", service_reqController.getServiceRequestById);

// router.delete("/delete-all", service_reqController.);

router.delete("/delete-one/:id", service_reqController.deleteServiceRequest);

router.put("/update/:id", service_reqController.updateServiceRequestStatus);

module.exports = router;