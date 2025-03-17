const chatService = require("../services/chat");

const getMessages = async (req, res) => {
  try {
    const { chatId } = req.body;

    // gel all messages in chat
    const messages = await chatService.getMessages(chatId);
    res.status(201).json({ messages });
  } catch (error) {
    console.error("Error in getMessages in chat controller:", error.message);
    res.status(500).json({ errors: [error.message] });
  }
};

module.exports = { getMessages };
