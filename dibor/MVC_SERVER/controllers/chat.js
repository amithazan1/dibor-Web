const chatService = require('../services/chat');
const createChat = async (req, res) => {
res.json(await chatService.createChat(req.body.username));
};

module.exports= {createChat}