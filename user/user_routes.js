const express = require("express");
const router = express.Router();
const userController = require("./user_controller");

router.post("/user/store", userController.createUser);
router.get("/user/list", userController.getUsers);
router.get("/user/list/:id", userController.getUserById);
router.put("/user/update", userController.updateUser);
router.delete("/user/delete", userController.deleteUser);

module.exports = router;
