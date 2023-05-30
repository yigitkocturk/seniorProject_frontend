import React, { useEffect, useState } from "react";
import moment from "moment";
import io from "socket.io-client";
import "bootstrap/dist/css/bootstrap.css";
import "./Chat.css";

const Client = () => {
  const [username, setUsername] = useState(localStorage.getItem("userName") || "");
  const [socket, setSocket] = useState(null);
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (!username) {
      const storedUsername = localStorage.getItem("username");
      if (storedUsername) {
        setUsername(storedUsername);
      } else {
        const newUsername = prompt("What is your username?");
        setUsername(newUsername);
        localStorage.setItem("username", newUsername);
      }
    }
  }, [username]);

  useEffect(() => {
    if (username) {
      const newSocket = io("http://localhost:3001", {
        transports: ["websocket", "polling"],
      });
      setSocket(newSocket);

      return () => {
        newSocket.close();
      };
    }
  }, [username]);

  useEffect(() => {
    if (socket) {
      socket.on("connect", () => {
        socket.emit("username", username);
      });

      socket.on("users", (users) => {
        setUsers(users);
      });

      socket.on("message", (message) => {
        setMessages((messages) => [...messages, message]);
      });

      socket.on("connected", (user) => {
        setUsers((users) => [...users, user]);
      });

      socket.on("disconnected", (id) => {
        setUsers((users) => {
          return users.filter((user) => user.id !== id);
        });
      });
    }
  }, [socket]);

  const submit = (event) => {
    event.preventDefault();
    if (socket && message) {
      socket.emit("send", message);
      setMessage(""); // Mesaj gönderildikten sonra mesaj alanını temizler
    }
  };

  return (
    <div className="container">
      <div className="chat-container">
        <div className="chat-header">General Chat</div>
        <div className="chat-messages">
          {messages.map(({ user, text }, index) => (
            <div key={index} className="row mb-2">
              <div className="col-md-3">{user.name}</div>
              <div className="col-md-2">{text}</div>
            </div>
          ))}
        </div>
        <div className="chat-input">
          <input
            type="text"
            className="form-control"
            placeholder="Mesajınızı girin"
            value={message} // input alanına değer atanması
            onChange={(e) => setMessage(e.target.value)} // değerin güncellenmesi
          />
          <button className="btn btn-primary" id="submit" type="submit" onClick={submit}>
            Gönder
          </button>
        </div>
      </div>
    </div>
  );
};

export default Client;
