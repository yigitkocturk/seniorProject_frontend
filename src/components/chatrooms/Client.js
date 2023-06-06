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
  const [selectedRoom, setSelectedRoom] = useState("General");

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

      socket.on("messages", (messages) => {
        setMessages(messages);
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
    if (socket && message && selectedRoom) {
      socket.emit("send", { message, room: selectedRoom });
      setMessage("");
      setMessages((messages) => [
        ...messages.reverse(),
        { user: { name: username }, text: message, date: moment().toISOString(), room: selectedRoom },
      ].reverse());
    }
  };

  return (
    <div className="container" style={{ backgroundColor: '#fafafa' }}>
      <div className="chat-container" style={{ borderRadius: '10px' }}>
        <div className="chat-header" style={{ backgroundColor: '#e0efed', borderRadius: '10px 10px 0 0' }}>Genel Sohbet</div>
        <div className="chat-messages" style={{ backgroundColor: '#fafafa', borderRadius: '0 0 10px 10px' }}>
          {[...messages]
            .filter((msg) => msg.room === selectedRoom)
            .reverse()
            .map(({ user, text, date }, index, array) => (
              <div key={index} className="row mb-2">
                <div className="col-md-3">{user.name}</div>
                <div className="col-md-2">{text}</div>
                {/* <div className="col-md-2">{moment(date).format("YYYY-MM-DD HH:mm:ss")}</div> */}
              </div>
            ))
          }
        </div>
        <div className="chat-input" style={{ borderRadius: '0 0 10px 10px' }}>
          <input
            type="text"
            className="form-control"
            placeholder="Mesajınızı girin..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button className="button1" id="submit" type="submit" onClick={submit}>
            Gönder
          </button>
        </div>
      </div>
    </div>
  );
};

export default Client;