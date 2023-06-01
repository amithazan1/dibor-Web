const express = require('express');
var router = express.Router();
const chatController = require('../controllers/chat');
const authorization = require('../controllers/authorization');

router.route('/')
.post(authorization.verifyToken,chatController.createChat)
.get(authorization.verifyToken,chatController.getChats);

router.route('/:id')
    .get(authorization.verifyToken,chatController.getChatById)
    .delete(authorization.verifyToken,chatController.deleteChatById);

router.route('/:id/Messages')
    .post(authorization.verifyToken,chatController.postMessage)
    .get(authorization.verifyToken,chatController.getMessages);

module.exports = router;