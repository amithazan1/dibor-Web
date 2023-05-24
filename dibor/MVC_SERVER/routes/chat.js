const express = require('express');
var router = express.Router();
const chatController = require('../controllers/chat');

router.route('/')
.post(chatController.createChat);
//.get(chatController.getChat)

module.exports = router;