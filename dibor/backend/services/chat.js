const Chat = require("../models/chat");

const getMessages = async (receiverId, senderId) => {
  const chat = await Chat.findOne({
    participants: { $all: [senderId, receiverId] },
  })
    .populate("messages")
    .sort({ "messages.createdAt": 1 }); // Sort messages by timestamp (oldest first)

  if (!chat) {
    throw new Error("Chat not found");
  }

  return chat.messages; // Return only the messages array
};

module.exports = { getMessages };
