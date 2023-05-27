const chatService = require('../services/chat');
const createChat = async (req, res) => {
    console.log("trying to create");
res.json(await chatService.createChat(req.body.username,req.headers.authorization));
};

const getChats = async (req, res) => {
    console.log("trying to get chats");
res.json(await chatService.getChats(req.headers.authorization));
};

const getChatById = async (req, res) => {
    console.log("trying to get chat with id");
res.json(await chatService.getChatById(req.params.id,req.headers.authorization));
};

const deleteChatById = async (req, res) => {
    console.log("trying to delete chat with id");
res.json(await chatService.deleteChatById(req.params.id,req.headers.authorization));
};

const postMessage = async (req, res) => {
    console.log("trying to postMessage");
res.json(await chatService.postMessage(req.params.id,req.body.msg,req.headers.authorization));
};

const getMessages = async (req, res) => {
    console.log("trying to getMessages");
res.json(await chatService.getMessages(req.params.id,req.headers.authorization));
};

module.exports= {createChat , getChats,getChatById,deleteChatById,postMessage,getMessages}