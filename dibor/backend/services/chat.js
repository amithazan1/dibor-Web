const Chat = require("../models/chat");

const getMessages = async (receiverId, senderId) => {
  const chat = await Chat.findOne({
    participants: { $all: [senderId, receiverId] },
  })
    .populate("messages")
    .sort({ "messages.createdAt": 1 }); // Sort messages by timestamp (oldest first)

  if (!chat) {
    return [];
  }

  return chat.messages; // Return only the messages array
};

const getChats = async (userId) => {
  const chats = await Chat.find({ participants: userId }).populate(
    "participants",
    "username displayName profilePic"
  );

  if (!chats) {
    return [];
  }

  // Map the chats to the desired format
  const chatsList = chats.map((chat) => ({
    id: chat._id,
    participants: chat.participants,
  }));

  return chatsList;
};
module.exports = { getMessages, getChats };
