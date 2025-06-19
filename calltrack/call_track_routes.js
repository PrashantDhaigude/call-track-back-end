const express = require("express");
const router = express.Router();
const controller = require("./call_tack_controller");

router.post("/call/store", controller.createCallTrack);
router.get("/call/list", controller.getAllCallTracks);
router.get("/call/list/:id", controller.getCallTrackById);
 

module.exports = router;
