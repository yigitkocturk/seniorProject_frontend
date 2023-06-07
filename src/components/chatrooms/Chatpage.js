import React, { useEffect, useState } from "react";
import moment from "moment";
import io from "socket.io-client";
import "bootstrap/dist/css/bootstrap.css";
import alkol from '../images/alcohol.png';
import bagımlılık from '../images/all.webp';
import sigara from '../images/sigara.jpg';
import teknoloji from '../images/tek.png';
import kumar from '../images/kumar.png';
import alısveris from '../images/alışveris.png'
import kafein from '../images/kafein1.jpg'
import yeme from '../images/yeme.png'
import iliski from '../images/iliski.png'
import eroin from '../images/eroin.png'
import kokain from '../images/cocaine.jpg'
import esrar from '../images/esrar.png'
import Navbar from "../Navbar";


const roomImages = {
  Genel: bagımlılık,
  Sigara: sigara,
  Alkol: alkol,
  Kumar: kumar,
  Teknoloji: teknoloji,
  Alışveriş: alısveris,
  Kafein: kafein,
  Yeme: yeme,
  İlişki: iliski,
  Eroin: eroin,
  Esrar: esrar,
  Kokain: kokain
};

const ChatPage = () => {
  const [username, setUsername] = useState(localStorage.getItem("userName") || "");
  const [socket, setSocket] = useState(null);
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState("Genel");


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
        if (message.room === selectedRoom) {
          setMessages((messages) => [...messages, message]);
        }
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

  // Seçilen odanın görüntüsünü alır
  const getRoomImage = (room) => {
    return roomImages[room];
  };

  return (
    <div>
      <Navbar/>
    <div style={{ display: "flex", height: "100vh", alignItems: "center", justifyContent: "center", paddingTop: '10px' }}>
      <div style={{ display: "flex", width: "1000px", height: "600px", border: "1px solid white", borderRadius: "4px", overflow: "hidden", boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)" }}>
        <div style={{ backgroundColor: "#f8f9fa", borderRight: "1px solid #ccc", padding: "10px", flex: 1, overflowY: "auto", textAlign: "left", backgroundColor: '#fafafa' }}>
          <div style={{ fontWeight: "bold", marginBottom: "10px", fontSize: "18px" }}>Sohbet Odaları</div>
          {rooms.map((room) => (
            <div
              key={room}
              style={{
                cursor: "pointer",
                padding: "10px",
                marginBottom: "5px",
                backgroundColor: room === selectedRoom ? "#a6c1bd" : "#f8f9fa",
                color: room === selectedRoom ? "#fff" : "#000",
                fontSize: "16px",
                borderRadius: "4px",
                display: "flex",
                alignItems: "center",
              }}
              onClick={() => selectRoom(room)}
            >
              <div style={{ marginRight: "10px", width: "40px", height: "40px"}}>
                <img className="rounded-circle" src={getRoomImage(room)} alt={room} style={{ width: "100%", height: "100%", objectFit: "cover",  }} />
              </div>
              {room}
            </div>
          ))}
        </div>
        <div style={{ flex: 3, display: "flex", flexDirection: "column" }}>
          <div style={{ backgroundColor: "#a6c1bd", color: "#fff", padding: "15px", fontWeight: "bold", textAlign: "center", fontSize: "20px" }}>{selectedRoom} Bağımlı Odası</div>
          <div style={{ flex: 1, padding: "15px", overflowY: "auto", backgroundColor: "#f8f9fa" }}>
            {messages
              .filter((msg) => msg.room === selectedRoom)
              .reverse()
              .map(({ user, text, date }, index) => (
                <div key={index} style={{ marginBottom: "15px", display: "flex", flexDirection: user.name === username ? "row-reverse" : "row", alignItems: "center" }}>
                  <div style={{ backgroundColor: user.name === username ? "#a6c1bd" : "#fff", color: user.name === username ? "#fff" : "#000", padding: "10px", borderRadius: "8px", maxWidth: "80%", marginLeft: user.name === username ? "10px" : "0", marginRight: user.name === username ? "0" : "10px" }}>
                    <div style={{ fontWeight: "bold", marginBottom: "5px", fontSize: "14px" }}>{user.name}</div>
                    <div style={{ wordWrap: "break-word" }}>{text}</div>
                  </div>
                </div>
              ))}
          </div>
          <div style={{ display: "flex", alignItems: "center", padding: "15px", backgroundColor: "#fff" }}>
            <input
              type="text"
              style={{ flex: 1, marginRight: "10px", padding: "8px", border: "1px solid #ccc", borderRadius: "4px" }}
              placeholder="Mesajınızı yazınız..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button
              className="btn btn-primary"
              style={{ backgroundColor: "#a6c1bd", borderColor: "#a6c1bd", padding: "8px 12px", fontSize: "16px", borderRadius: "4px", color: "#fff" }}
              id="submit"
              type="submit"
              onClick={submit}
            >
              Gönder
            </button>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default ChatPage;
