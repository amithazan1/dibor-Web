const authController = require("../controllers/auth");
const express = require("express");
const router = express.Router();

router.route("/login").post(authController.login);
router.route("/signup").post(authController.signUp);
router.route("/logout").post(authController.logout);

module.exports = router;
