const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server, {
  transports: ["websocket", "polling"],
});

const users = {};

io.on("connection", (socket) => {
  socket.on("username", (username) => {
    const user = {
      name: username,
      id: socket.id,
    };
    users[socket.id] = user;
    io.emit("connected", user);
    io.emit("users", Object.values(users));
  });

  socket.on("send", (message) => {
    io.emit("message", {
      text: message,
      date: new Date().toISOString(),
      user: users[socket.id],
    });
  });

  socket.on("disconnect", () => {
    const disconnectedUser = users[socket.id];
    delete users[socket.id];
    io.emit("disconnected", disconnectedUser.id);
  });
});

const port = process.env.PORT || 3001;
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
