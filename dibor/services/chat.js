const { Chat, SingleUserChat ,Message} = require('../models/chat');


const createChat = async (username,authorization) => {

  const token = authorization.split(" ")[1];
  try {
    // Verify the token is valid
    const data = jwt.verify(token, key);
    console.log('The logged in user is: ' + data.username);
    // Token validation was successful. Continue to the actual function (index)
   } catch (err) {
return{}   }

  //here i get the user through the token and add it in the users array
  // temp will make it as user admin
    const chatCount = await Chat.countDocuments();
  const user = "admin";
  const chatSave = new Chat({
    id: chatCount + 1,
    users: [
      {
          username: username,
          displayName: 'Display Name',
          profilePic: 'default-profile-pic.jpg',
        
      },
      {
          username: user,
          displayName: 'Display Name',
          profilePic: 'default-profile-pic.jpg',
        
      },

    ],
    messages: [],
  });

   await chatSave.save();
  
  // Check the number of chats for the user in the database 

  const chat = new SingleUserChat({
       id: chatCount + 1,
        user: {
          username: username,
          displayName: 'Display Name',
          profilePic: 'default-profile-pic.jpg',
        },
    
       messages: [],
  });

  return chat
};

const getChats = async (authorization) => {
 const token = authorization.split(" ")[1];
  try {
    // Verify the token is valid
    const data = jwt.verify(token, key);
    console.log('The logged in user is: ' + data.username);
    // Token validation was successful. Continue to the actual function (index)
   } catch (err) {
    return {}
  }
  username = "admin2"
  
   // Find all chats where the given username is in the users array
const chats = await Chat.find({
  'users.username': username
});

    // Map the chats to the desired format
    const chatList = chats.map((chat) => ({
      id: chat.id,
      user: getOtherUser(chat.users, username),
      lastMessage: getLastMessage(chat.messages),
    }));

   return chatList
};

const getChatById = async (id, authorization) => {
   const token = authorization.split(" ")[1];
  try {
    // Verify the token is valid
    const data = jwt.verify(token, key);
    console.log('The logged in user is: ' + data.username);
    // Token validation was successful. Continue to the actual function (index)
   } catch (err) {
    return {}
  }
  
  const chat = await Chat.findOne({ id: id });
  return chat;
};

const deleteChatById = async (id, authorization) => {
   const token = authorization.split(" ")[1];
  try {
    // Verify the token is valid
    const data = jwt.verify(token, key);
    console.log('The logged in user is: ' + data.username);
    // Token validation was successful. Continue to the actual function (index)
   } catch (err) {
    return {}
  }
  
  const chat = await Chat.deleteOne({ id: id });
  return chat;
};

const postMessage = async (id, message, authorization) => {
   const token = authorization.split(" ")[1];
  try {
    // Verify the token is valid
    const data = jwt.verify(token, key);
    console.log('The logged in user is: ' + data.username);
    // Token validation was successful. Continue to the actual function (index)
   } catch (err) {
    return {}
  }
  
  const chat = await Chat.findOne({ id: id });

    const msg = new Message({
     id: chat.messages.length + 1,
    created: new Date(),
    sender: {
      username: "message.sender.username",
      displayName: "message.sender.displayName",
      profilePic: "message.sender.profilePic",
    },
    content: message,
  
    });

  chat.messages.push(msg);
  await chat.save();

  return msg;

};



const getMessages = async (id, authorization) => {
   const token = authorization.split(" ")[1];
  try {
    // Verify the token is valid
    const data = jwt.verify(token, key);
    console.log('The logged in user is: ' + data.username);
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
