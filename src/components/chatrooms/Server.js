const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const mysql = require('mysql');

const app = express();
const server = http.createServer(app);
const io = socketIO(server, {
  transports: ["websocket", "polling"],
});

const connection = mysql.createConnection({
  host: 'localhost',
  port: '3306',
  user: 'root',
  password: '123456789',
  database: 'senior',
});

connection.connect((error) => {
  if (error) {
    console.error('MySQL connection error:', error);
  } else {
    console.log('Connected to MySQL database');
  }
});

const users = {};
const rooms = ["Genel", "Alkol", "Sigara", "Kumar", "Teknoloji", "Alışveriş", "Kafein","Yeme", "İlişki",  "Eroin", "Kokain", "Esrar"];

io.on("connection", (socket) => {
  socket.on("username", (username) => {
    const user = {
      name: username,
      id: socket.id,
    };
    users[socket.id] = user;
    io.emit("connected", user);
    io.emit("users", Object.values(users));
    io.emit("rooms", rooms);

    connection.query('SELECT * FROM messages ORDER BY id DESC', (error, results, fields) => {
      if (error) {
        console.error('Error retrieving messages from database:', error);
      } else {
        const messagesFromDB = results.map((row) => ({
          text: row.message,
          date: row.date,
          user: {
            name: row.username,
            id: row.userid,
          },
          room: row.room 
        }));
        socket.emit("messages", messagesFromDB);
      }
    });
  });

  socket.on("joinRoom", (room) => { 
    socket.join(room);
  });

  socket.on("send", ({ message, room }) => { 
    const newMessage = {
      username: users[socket.id].name,
      message: message,
      room: room 
    };

    connection.query('INSERT INTO messages SET ?', newMessage, (error, results, fields) => {
      if (error) {
        console.error('Error saving message to database:', error);
      } else {
        console.log('Message saved to database:', newMessage);
      }
    });

    io.to(room).emit("message", {
      text: message,
      date: new Date().toISOString(),
      user: users[socket.id],
      room: room 
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
