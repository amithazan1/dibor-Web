const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ChatSchema = new Schema({
  id: {
    type: Number,
    required: true,
  },
  users: [
    {
     
        username: {
          type: String,
        },
        displayName: {
          type: String,
        },
        profilePic: {
          type: String,
        },
      },
  ],
  messages: [
    {
      
        id: {
          type: Number,
          required: true,
        },
        created: {
          type: Date,
          required: true,
        },
        sender: {
          username: {
            type: String,
          },
          displayName: {
            type: String,
          },
          profilePic: {
            type: String,
          },
        },
        content: {
          type: String,
        },
      
    },
  ],
});

const SingleUserChatSchema = new Schema({
  id: {
    type: Number,
    required: true,
  },
  user: {
    username: {
      type: String,
    },
    displayName: {
      type: String,
    },
    profilePic: {
      type: String,
    },
  },
  messages: [
    {
     
        id: {
          type: Number,
          required: true,
        },
        created: {
          type: Date,
          required: true,
        },
        sender: {
          username: {
            type: String,
          },
          displayName: {
            type: String,
          },
          profilePic: {
            type: String,
          },
        },
        content: {
          type: String,
        },
     
    },
  ],
    

});

const MessageSchema = new Schema({
 
 
        id: {
          type: Number,
          required: true,
        },
        created: {
          type: Date,
          required: true,
        },
        sender: {
          username: {
            type: String,
          },
          displayName: {
            type: String,
          },
          profilePic: {
            type: String,
          },
        },
        content: {
          type: String,
        },

});

const Message = mongoose.model('Message', MessageSchema);
const Chat = mongoose.model('Chat', ChatSchema);
const SingleUserChat = mongoose.model('SingleUserChat', SingleUserChatSchema);

module.exports = { Chat, SingleUserChat,Message };
