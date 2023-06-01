import React, { useEffect, useState } from "react";
import moment from "moment";
import io from "socket.io-client";
import "bootstrap/dist/css/bootstrap.css";

const ChatPage = () => {
  const [username, setUsername] = useState(localStorage.getItem("userName") || "");
  const [socket, setSocket] = useState(null);
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState("General");

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

      socket.on("rooms", (rooms) => {
        setRooms(rooms);
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

  const selectRoom = (room) => {
    setSelectedRoom(room);
    socket.emit("joinRoom", room);
  };

  return (
    <div style={{ display: "flex", height: "100vh", alignItems: "center", justifyContent: "center" }}>
      <div style={{ display: "flex", width: "800px", height: "500px", border: "1px solid #ccc", borderRadius: "4px", overflow: "hidden" }}>
        <div style={{ backgroundColor: "#f8f9fa", borderRight: "1px solid #ccc", padding: "10px", flex: 1, overflowY: "auto" }}>
          <div style={{ fontWeight: "bold", marginBottom: "10px" }}>Rooms</div>
          {rooms.map((room) => (
            <div
              key={room}
              style={{ cursor: "pointer", padding: "5px", marginBottom: "5px", backgroundColor: room === selectedRoom ? "#007bff" : "", color: room === selectedRoom ? "#fff" : "" }}
              onClick={() => selectRoom(room)}
            >
              {room}
            </div>
          ))}
        </div>
        <div style={{ flex: 3, display: "flex", flexDirection: "column" }}>
          <div style={{ backgroundColor: "#007bff", color: "#fff", padding: "10px", fontWeight: "bold" }}>{selectedRoom} Chat</div>
          <div style={{ flex: 1, padding: "10px", overflowY: "auto" }}>
            {messages
              .filter((msg) => msg.room === selectedRoom)
              .reverse()
              .map(({ user, text, date }, index) => (
                <div key={index} style={{ marginBottom: "10px" }}>
                  <div style={{ fontWeight: "bold" }}>{user.name}</div>
                  <div>{text}</div>
                </div>
              ))}
          </div>
          <div style={{ display: "flex", alignItems: "center", padding: "10px" }}>
            <input
              type="text"
              style={{ flex: 1, marginRight: "10px" }}
              placeholder="Enter your message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button
              className="btn btn-primary"
              style={{ backgroundColor: "#007bff", borderColor: "#007bff" }}
              id="submit"
              type="submit"
              onClick={submit}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
