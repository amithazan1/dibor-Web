const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const Chat = new Schema({
 id: {
    type: Number,
    required: true,
  },
  users: [
    {
      User: {
        username: {
          type: String,
        },
        displayName: {
          type: String,
        },
        profilePic: {
          type: String
        },
      },
    },
  ],
  messages: [
    {
      Message: {
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
              type: String
            },
            displayName: {
              type: String
            },
            profilePic: {
              type: String
            },
        },
        content: {
          type: String,
        },
      },
    },
  ],
});
module.exports = mongoose.model('Chat', Chat);