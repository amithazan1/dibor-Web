const Chat = require("../models/chat");
const Message = require("../models/message");

const sendMessage = async (senderId, receiverId, content) => {
  let chat = await Chat.findOne({
    participants: { $all: [receiverId, senderId] },
  });
  if (!chat) {
    chat = await new Chat({ participants: [senderId, receiverId] }).save();
    //throw new Error("Chat does not exist. Please create a chat first.");
  }

  // Create and save the message
  const message = await new Message({ senderId, receiverId, content }).save();

  if (!message) {
    throw new Error("Error in message creating in the services");
  }

  // Add message to chat and save
  chat.messages.push(message._id);
  await chat.save();

  return message; // Return the saved message
};

module.exports = { sendMessage };
