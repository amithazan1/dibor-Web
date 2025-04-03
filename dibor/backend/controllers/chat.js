const chatService = require("../services/chat");

const getMessages = async (req, res) => {
  try {
    const { id: receiverId } = req.params;
    const senderId = req.userId;

    // gel all messages in chat
    const messages = await chatService.getMessages(receiverId, senderId);
    res.status(201).json({ messages });
  } catch (error) {
    console.error("Error in getMessages in chat controller:", error.message);
    res.status(500).json({ errors: [error.message] });
  }
};

module.exports = { getMessages };
