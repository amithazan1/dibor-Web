const express = require("express");
const router = express.Router();

const userController = require("../controllers/user");
const verifyToken = require("../middleware/protectRoute");

router.route("/getChats").get(verifyToken, userController.getAllUsers);

module.exports = router;
