const { Chat, SingleUserChat ,Message} = require('../models/chat');
const {getUserByUsername} = require('../services/form');

const { key } = require("../controllers/token");
const jwt = require("jsonwebtoken")
const createChat = async (username, authorization) => {
          console.log("creating");

  const token = authorization.split(" ")[1];
  let data;
  try {
    // Verify the token is valid
                console.log("the key ");

            console.log(key);



    data = jwt.verify(token, key);

    // Token validation was successful. Continue to the actual function (index)
  } catch (err) {
    
    return -1
  }

  //here i get the user through the token and add it in the users array
  // temp will make it as user admin
    const chatCount = await Chat.countDocuments();
  const creatingUser = await getUserByUsername(data.UserName);
  const otherUser = await getUserByUsername(username);
  console.log(otherUser);
  if (otherUser == null || otherUser.length == 0) {
        return -1
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
    return {}
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
    return {}
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
    return {}
  }
  
  const chat = await Chat.deleteOne({ id: id });
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
    return {}
  }
    const senderUser = await getUserByUsername(data.UserName);

  const chat = await Chat.findOne({ id: id });

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
    console.log('The logged in user is: ' + data.UserName);
    // Token validation was successful. Continue to the actual function (index)
   } catch (err) {
    return {}
  }
  
  const chat = await Chat.findOne({ id: id });
  if (chat)
    return chat.messages;
  else
    return ""
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
