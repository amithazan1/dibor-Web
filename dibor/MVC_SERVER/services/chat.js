const Chat = require('../models/chat');

const createChat = async (username) => {
    //need to check that user exists
const chat = new Chat({
    id: null, // Assuming 'id' field is nullable
    users: [
      {
        User: {
          username: username,
          displayName: 'Display Name', // Provide a default display name if necessary
          profilePic: 'default-profile-pic.jpg', // Provide a default profile picture if necessary
        },
      },
    ],
    messages: [],
  });

  return await chat.save();
};

module.exports= {createChat}