const { Chat, SingleUserChat ,Message} = require('../models/chat');
const {getUserByUsername} = require('../services/form');

const { key } = require("../controllers/token");
const jwt = require("jsonwebtoken")
const createChat = async (username, authorization) => {

  const token = authorization.split(" ")[1];
  let data;
  try {
    data = jwt.verify(token, key);

    // Token validation was successful. Continue to the actual function (index)
  } catch (err) {
    
    return -1
  }

  if (data.UserName === username) {
    return -3;
  }
  //here i get the user through the token and add it in the users array
  // temp will make it as user admin
    const chatCount = await Chat.countDocuments();
  const creatingUser = await getUserByUsername(data.UserName);
  const otherUser = await getUserByUsername(username);
  if (otherUser == null || otherUser.length == 0) {
        return -2
  }
  


  const chatSave = new Chat({
    id: chatCount + 1,
    users: [
      {
          username: creatingUser[0].username,
          displayName: creatingUser[0].displayName,
          profilePic: creatingUser[0].profilePic,
        
      },
      {
          username: otherUser[0].username,
          displayName: otherUser[0].displayName,
          profilePic: otherUser[0].profilePic,
        
      },

    ],
    messages: [],
  });

   await chatSave.save();
  
  // Check the number of chats for the user in the database 

  const chat = new SingleUserChat({
       id: chatCount + 1,
        user: {
          username: otherUser[0].username,
          displayName: otherUser[0].displayName,
          profilePic: otherUser[0].profilePic,
        },
    
       messages: [],
  });

  return chat
};

const getChats = async (authorization) => {
    let data;

 const token = authorization.split(" ")[1];
  try {
    // Verify the token is valid
     data = jwt.verify(token, key);
    // Token validation was successful. Continue to the actual function (index)
   } catch (err) {
    return -1
  }
  
   // Find all chats where the given username is in the users array
const chats = await Chat.find({
  'users.username': data.UserName
});

    // Map the chats to the desired format
    const chatList = chats.map((chat) => ({
      id: chat.id,
      user: getOtherUser(chat.users, data.UserName),
      lastMessage: getLastMessage(chat.messages),
    }));

   return chatList
};

const getChatById = async (id, authorization) => {
  const token = authorization.split(" ")[1];
    let data;

  try {
    // Verify the token is valid
     data = jwt.verify(token, key);
    // Token validation was successful. Continue to the actual function (index)
   } catch (err) {
    return -1
  }
  
  const chat = await Chat.findOne({ id: id });
  
  return chat;
};

const deleteChatById = async (id, authorization) => {
    let data;

   const token = authorization.split(" ")[1];
  try {
    // Verify the token is valid
     data = jwt.verify(token, key);
    // Token validation was successful. Continue to the actual function (index)
   } catch (err) {
    return -1
  }
  const chat = await Chat.deleteOne({ id: id ,'users.username': data.UserName});
  return chat;
};

const postMessage = async (id, message, authorization) => {
  const token = authorization.split(" ")[1];
    let data;

  try {
    // Verify the token is valid
     data = jwt.verify(token, key);
    // Token validation was successful. Continue to the actual function (index)
   } catch (err) {
    return -1;
  }
    const senderUser = await getUserByUsername(data.UserName);

  const chat = await Chat.findOne({ id: id });
    if (chat == null) {
    return -1;
    }
    const msg = new Message({
     id: chat.messages.length + 1,
    created: new Date(),
    sender: {
      username: senderUser[0].username,
      displayName: senderUser[0].displayName,
      profilePic: senderUser[0].profilePic,
    },
    content: message,
  
    });

  chat.messages.push(msg);
  await chat.save();

  return msg;

};



const getMessages = async (id, authorization) => {
    let data;

   const token = authorization.split(" ")[1];
  try {
    // Verify the token is valid
     data = jwt.verify(token, key);
    // Token validation was successful. Continue to the actual function (index)
   } catch (err) {
    return -1
  }
  
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
