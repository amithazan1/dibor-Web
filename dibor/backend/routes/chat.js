const express = require("express");
const router = express.Router();

const chatController = require("../controllers/chat");
const verifyToken = require("../middleware/protectRoute");

router.route("/getAllMessages").get(verifyToken, chatController.getMessages);

module.exports = router;
