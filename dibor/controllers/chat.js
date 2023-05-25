const chatService = require('../services/chat');
const createChat = async (req, res) => {
    console.log("trying to create");
res.json(await chatService.createChat(req.body.username,req.headers.authorization));
};

const getChats = async (req, res) => {
    console.log("trying to get chats");
res.json(await chatService.getChats());
};

const getChatById = async (req, res) => {
    console.log("trying to get chat with id");
res.json(await chatService.getChatById(req.params.id));
};

const deleteChatById = async (req, res) => {
    console.log("trying to delete chat with id");
res.json(await chatService.deleteChatById(req.params.id));
};

const postMessage = async (req, res) => {
    console.log("trying to postMessage");
res.json(await chatService.postMessage(req.params.id,req.body.msg));
};

const getMessages = async (req, res) => {
    console.log("trying to getMessages");
res.json(await chatService.getMessages(req.params.id));
};

module.exports= {createChat , getChats,getChatById,deleteChatById,postMessage,getMessages}