import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sendMessage, fetchMessages, addNewMessageThunk } from "../store/chat";
import { startListeningForMessages } from "../store/chat";
import { useParams } from "react-router-dom";
import io from "socket.io-client";

function ChatComponent() {
  const [inputMessage, setInputMessage] = useState("");
  const { id } = useParams();

  const chat = useSelector((state) => state.chats);
  const auth = useSelector((state) => state.auth);
  const event = useSelector((state) => state.events).find(
    (e) => e.id === Number(id)
  );

  const dispatch = useDispatch();

  // Socket initialization
  const socket = io("http://localhost:3000"); // Replace with your server address

  useEffect(() => {
    dispatch(fetchMessages());

    dispatch(startListeningForMessages());

    socket.on("connect", () => {
      console.log("Connected to the server using Socket.io");
    });

    socket.on("message", (message) => {
      console.log("Message received from server:", message);
      dispatch(sendMessage(message));
    });

    return () => {
      socket.disconnect();
    };
  }, [dispatch]);

  const handleSendMessage = () => {
    if (inputMessage.trim() !== "") {
      dispatch(addNewMessageThunk(inputMessage));
      setInputMessage("");
    }
  };

  console.log("chat", chat);
  return (
    <div className="container mt-5">
      <div className="list-group">
        {chat?.map((message, index) => (
          <div className="list-group-item" key={index}>
            {message.message}
          </div>
        ))}
      </div>
      <div className="input-group mt-3">
        <input
          type="text"
          className="form-control"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
        />
        <div className="input-group-append">
          <button
            className="btn btn-outline-primary"
            onClick={handleSendMessage}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChatComponent;
