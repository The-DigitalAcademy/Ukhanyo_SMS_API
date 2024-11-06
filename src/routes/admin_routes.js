const express = require("express");
const router = express.Router();
const adminController = require("../controllers/admin_controller");

router.post("/add-user", adminController.createUser);

router.get("/get-all", adminController.getAllUsers);

router.get("/user/:uuid", adminController.getOneUser);

router.delete("/delete-all", adminController.deleteAllUsers);

router.delete("/delete-one/:id", adminController.deleteUsers);

router.put("/update/:id", adminController.updateUsers);

module.exports = router;