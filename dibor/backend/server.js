const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const messageRoute = require("./routes/message");
const chatRoute = require("./routes/chat");

const connectToMongoDB = require("./db/connectToMongoDB");

dotenv.config();
const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(cookieParser()); // Enables reading/writing cookies
app.use(
  cors({
    origin: "http://localhost:3000", // Frontend URL
    credentials: true, // Allow cookies
  })
);

app.use("/api/auth", authRoute);
app.use("/api/message", messageRoute);
app.use("/api/chat", chatRoute);
app.use("/api/user", userRoute);

app.listen(PORT, () => {
  connectToMongoDB();
  console.log("Server listening in port", PORT);
});

/** 
 * 
 * 
 * const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
require("custom-env").env(process.env.NODE_ENV, "./config");
mongoose.connect(process.env.CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(express.static("public"));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.get("*", (req, res) => {
  // Redirect to the home page or any other desired URL
  res.redirect("/");
});

//socket io
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: "http://localhost:12345",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  // Create an object to store the active chat rooms and the users who have joined each room
  const activeChatRooms = {};

  socket.on("enterChat", (data) => {
    const roomId = data;
    const userId = socket.id;

    // Check if the room exists in the activeChatRooms object
    if (activeChatRooms[roomId]) {
      // Check if the user has already joined the room
      if (activeChatRooms[roomId].includes(userId)) {
        return;
      }

      // Add the user to the room's user list
      activeChatRooms[roomId].push(userId);
    } else {
      // Create a new room and add the user to the user list
      activeChatRooms[roomId] = [userId];
    }

    // Join the room
    socket.join(roomId);
  });

  socket.on("enterUserChat", (data) => {
    const roomId = data;
    const userId = socket.id;

    // Check if the room exists in the activeChatRooms object
    if (activeChatRooms[roomId]) {
      // Check if the user has already joined the room
      if (activeChatRooms[roomId].includes(userId)) {
        return;
      }

      // Add the user to the room's user list
      activeChatRooms[roomId].push(userId);
    } else {
      // Create a new room and add the user to the user list
      activeChatRooms[roomId] = [userId];
    }

    // Join the room
    socket.join(roomId);
  });

  socket.on("sendMessage", (data) => {
    socket.to(data.chatRoom).emit("recivedMessage", data.chatRoom);
    socket.to(data.userRoom).emit("recivedMessageAlert", {
      from: data.from,
      message: data.message,
      time: data.time,
    });
  });

  socket.on("deleteUserChat", (data) => {
    socket.to(data.username).emit("deleteChat", data);
  });
  socket.on("disconnect", () => {
    const rooms = Object.keys(socket.rooms);
    rooms.forEach((room) => {
      if (room !== socket.id) {
        socket.leave(room);
      }
    });
  });
});

server.listen(3001, () => {
  console.log("Socket.IO server listening on port 3001");
});
*/
