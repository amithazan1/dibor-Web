const chatService = require('../services/chat');
const createChat = async (req, res) => {
    const user = await chatService.createChat(req.body.username, req.headers.authorization);
    if (user === -1) {
        return res.status(401).json({ errors: ['Unauthorized'] })
    } else  if (user === -2) {
        return res.status(500).json({ errors: ['Internal Server Error'] })
    } else if (user === -3) {
        return res.status(400).json({ errors: ['Thou shalt not talk with thy self'] })
    } else {
        res.json(user);
    }
};

const getChats = async (req, res) => {
    const response = await chatService.getChats(req.headers.authorization);
    if (response === -1) {
        return res.status(401).json({ errors: ['Unauthorized'] })
    } else {
        res.json(response);

    }
};

const getChatById = async (req, res) => {
    const response = await chatService.getChatById(req.params.id, req.headers.authorization);
    if (response === -1) {
        return res.status(401).json({ errors: ['Unauthorized'] })
    } else {
        res.json(response);
    }

};

const deleteChatById = async (req, res) => {
    const response = await chatService.deleteChatById(req.params.id, req.headers.authorization);
    if (response === -1) {
        return res.status(401).json({ errors: ['Unauthorized'] })
    } else {
        res.json(response);
    }
};

const postMessage = async (req, res) => {
    
 const response = await chatService.postMessage(req.params.id, req.body.msg, req.headers.authorization);
     if (response === -1) {
        return res.status(401).json({ errors: ['Unauthorized'] })
    } else {
        res.json(response);

    }};

const getMessages = async (req, res) => {
    const response = await chatService.getMessages(req.params.id, req.headers.authorization);
     if (response === -1) {
        return res.status(401).json({ errors: ['Unauthorized'] })
    } else {
        res.json(response);

    }};

module.exports= {createChat , getChats,getChatById,deleteChatById,postMessage,getMessages}