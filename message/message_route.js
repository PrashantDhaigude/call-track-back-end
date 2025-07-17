const express = require("express");
const router = express.Router();
const userController = require("./message_controller");

router.post("/message/store", userController.createMessage);
router.get("/message/list", userController.getMessages);
// router.get("/message/list/:id", userController.getUserById);
// router.put("/message/update", userController.updateUser);
// router.delete("/message/delete", userController.deleteUser);

module.exports = router;
