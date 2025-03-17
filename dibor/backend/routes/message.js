const express = require("express");
const router = express.Router();

const messageController = require("../controllers/message");
const verifyToken = require("../middleware/protectRoute");

router.route("/send").post(verifyToken, messageController.sendMessage);

module.exports = router;
