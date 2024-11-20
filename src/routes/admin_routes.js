const express = require("express");
const router = express.Router();
const adminController = require("../controllers/admin_controller");

router.post("/add", adminController.createUser);
router.post("/many", adminController.bulkCreateUsers)

router.get("/users", adminController.getAllUsers);

router.get("/user/:uuid", adminController.getOneUser);

router.delete("/users", adminController.deleteAllUsers);

router.delete("/user/:id", adminController.deleteUsers);

router.put("/update/:id", adminController.updateUsers);

module.exports = router;