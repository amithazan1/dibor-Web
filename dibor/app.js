const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const chat = require('./routes/chat');



require('custom-env').env(process.env.NODE_ENV, './config');
mongoose.connect(process.env.CONNECTION_STRING,
{ useNewUrlParser: true,
        useUnifiedTopology: true
    });

/*    build of the app will be in the public
app.use(express.static('public'))
*/
var app = express();
app.use(cors());
app.use(bodyParser.urlencoded({extended : true}));
app.use(express.json());
app.use('/api/Chats', chat);

//socket io
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET","POST"],
    },
});

io.on("connection", (socket) => {
    console.log(`user connected: ${socket.id}`);
    
       socket.on("enterChat", (data) => {
        socket.join(data);
        
       });
    
    socket.on("sendMessage", (data) => {
        console.log(data);
        socket.to(data.room).emit("recivedMessage",data)
        
    });
    
     

});


server.listen(3001, () => {
  console.log('Socket.IO server listening on port 3001');
});

app.listen(process.env.PORT);