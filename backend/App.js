//modules
const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./Db/Db");
const DummyData = require("./Chats");
const userRoute = require("./Routes/UserRoutes");
const chatRoute = require("./Routes/ChatRoutes");
const messageRoutes = require("./Routes/messageRoutes");
const path = require("path");

//middleware
app.use(cors());
app.use(express.json());

//routes

app.use("/api/user", userRoute);
app.use("/api/chats", chatRoute);
app.use("/api/message", messageRoutes);

// -----------------------------Deployment---------------------------------------------

// if (process.env.NODE_ENV === "production") {
//   app.use(express.static("frontend/build"));
//   // app.get("*", (req, res) => {
//   //   res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
//   // });
// }

// -----------------------------Deployment---------------------------------------------

//port
port = process.env.PORT || 3000;
const server = app.listen(port, () =>
  console.log(`Listening on port ${port}...`)
);
const io = require("socket.io")(server, {
  pingTimeout: 60000,
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("connected to socket");

  socket.on("setup", (userData) => {
    socket.join(userData._id);
    socket.emit("connected", userData._id);
  });

  socket.on("join chat", (room) => {
    socket.join(room);
    console.log("User joined room: " + room);
  });

  socket.on("typing", (room) => socket.in(room).emit("typing"));
  socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

  socket.on("new message", (newMessageRecieved) => {
    var chat = newMessageRecieved.chat;

    if (!chat.users) return console.log("chat.users not defined");

    chat.users.forEach((user) => {
      if (user._id == newMessageRecieved.sender._id) return;

      socket.in(user._id).emit("message recieved", newMessageRecieved);
    });
  });

  socket.off("setup", () => {
    console.log("USER DISCONNECTED");
    socket.leave(userData._id);
  });
});

//connect to mongodb
const db = () => {
  try {
    connectDB(process.env.MONGODB_URI);
  } catch (error) {
    console.log(error);
  }
};

db();
