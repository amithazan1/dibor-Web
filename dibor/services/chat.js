const { Chat, SingleUserChat ,Message} = require('../models/chat');
const {getUserByUsername} = require('../services/form');
const { key } = require('../controllers/authorization');
const jwt = require("jsonwebtoken")
const createChat = async (username,currentUser) => {


  //here i get the user through the token and add it in the users array
  // temp will make it as user admin


    if (currentUser === username) {
    return -3;
    }
  
    const chatCount = await Chat.countDocuments();
  const creatingUser = await getUserByUsername(currentUser);
  const otherUser = await getUserByUsername(username);
  if (otherUser === -1) {
        return -2
  }
  


  const chatSave = new Chat({
    id: chatCount + 1,
    users: [
      {
          username: creatingUser.username,
          displayName: creatingUser.displayName,
          profilePic: creatingUser.profilePic,
        
      },
      {
          username: otherUser.username,
          displayName: otherUser.displayName,
          profilePic: otherUser.profilePic,
        
      },

    ],
    messages: [],
  });

   await chatSave.save();
  
  // Check the number of chats for the user in the database 

  const chat = new SingleUserChat({
       id: chatCount + 1,
        user: {
          username: otherUser.username,
          displayName: otherUser.displayName,
          profilePic: otherUser.profilePic,
        },
    
       messages: [],
  });

  return chat
};

const getChats = async (currentUser) => {

   // Find all chats where the given username is in the users array
const chats = await Chat.find({
  'users.username': currentUser
});

    // Map the chats to the desired format
    const chatList = chats.map((chat) => ({
      id: chat.id,
      user: getOtherUser(chat.users,currentUser),
      lastMessage: getLastMessage(chat.messages),
    }));

   return chatList
};

const getChatById = async (id) => {
 
  
  const chat = await Chat.findOne({ id: id });
  
  return chat;
};

const deleteChatById = async (id, currentUser) => {

  const chat = await Chat.deleteOne({ id: id ,'users.username': currentUser});
  return chat;
};

const postMessage = async (id, message, currentUser) => {
  
    const senderUser = await getUserByUsername(currentUser);

  const chat = await Chat.findOne({ id: id });
    if (chat == null) {
    return -1;
    }
    const msg = new Message({
     id: chat.messages.length + 1,
    created: new Date(),
    sender: {
      username: senderUser.username,
      displayName: senderUser.displayName,
      profilePic: senderUser.profilePic,
    },
    content: message,
  
    });

  chat.messages.push(msg);
  await chat.save();

  return msg;

};



const getMessages = async (id) => {
   
  const chat = await Chat.findOne({ id: id });
  if (chat)
    return chat.messages;
  else
    return -1
};


// Helper function to get the other user in the chat
const getOtherUser = (users, username) => {
  const otherUser = users.find((user) => user.username !== username);
  return otherUser;


};

// Helper function to get the last message in the chat
const getLastMessage = (messages) => {
    if (messages === null || messages.length === 0) {
    return null;
  }
  return messages[messages.length - 1];
};


module.exports = { createChat , getChats, getChatById,deleteChatById,postMessage,getMessages};
