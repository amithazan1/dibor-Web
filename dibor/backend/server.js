const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");

const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const messageRoute = require("./routes/message");
const chatRoute = require("./routes/chat");

const connectToMongoDB = require("./db/connectToMongoDB");
const { app, server } = require("./socket/socket");

dotenv.config();
const PORT = process.env.PORT || 5000;

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

app.use(express.static(path.join(__dirname, "..", "frontend", "dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "frontend", "dist", "index.html"));
});

server.listen(PORT, () => {
  connectToMongoDB();
  console.log("Server listening in port", PORT);
});
