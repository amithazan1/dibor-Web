const express = require('express');
var router = express.Router();
const chatController = require('../controllers/chat');

router.route('/')
.post(chatController.createChat)
.get(chatController.getChats);

router.route('/:id')
    .get(chatController.getChatById)
    .delete(chatController.deleteChatById);

router.route('/:id/Messages')
    .post(chatController.postMessage)
    .get(chatController.getMessages);

module.exports = router;