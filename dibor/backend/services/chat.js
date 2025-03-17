const Chat = require("../models/chat");

const getMessages = async (chatId) => {
  const chat = await Chat.findById(chatId)
    .populate("messages")
    .sort({ "messages.createdAt": 1 }); // Sort messages by timestamp (oldest first)

  if (!chat) {
    throw new Error("Chat not found");
  }

  return chat.messages; // Return only the messages array
};

module.exports = { getMessages };
