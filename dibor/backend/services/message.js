const Chat = require("../models/chat");
const Message = require("../models/message");
const { io, getUserSocketId } = require("../socket/socket");

const sendMessage = async (senderId, receiverId, content) => {
  let chat = await Chat.findOne({
    participants: { $all: [receiverId, senderId] },
  });
  if (!chat) {
    chat = await new Chat({ participants: [senderId, receiverId] }).save();
    chat = await chat.populate("participants", "-password");
    // Emit new chat to both participants
    const newChatSender = {
      id: chat._id,
      chatWith: chat.participants.find((user) => user._id == receiverId),
    };

    const senderSocketId = getUserSocketId(senderId);
    io.to(senderSocketId).emit("newChat", newChatSender);

    const newChatReceiver = {
      id: chat._id,
      chatWith: chat.participants.find((user) => user._id == senderId),
    };

    const receiverSocketId = getUserSocketId(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newChat", newChatReceiver);
    }
  }

  // Create the message
  const newMessage = new Message({ senderId, receiverId, content });

  if (!newMessage) {
    throw new Error("Error in message creating in the services");
  }

  // Add message to chat and save
  chat.messages.push(newMessage._id);

  // this will run in parallel
  await Promise.all([chat.save(), newMessage.save()]);

  // SOCKET IO
  const receiverSocketId = getUserSocketId(receiverId);
  if (receiverSocketId) {
    io.to(receiverSocketId).emit("newMessage", newMessage);
  }

  return newMessage; // Return the saved message
};

module.exports = { sendMessage };
