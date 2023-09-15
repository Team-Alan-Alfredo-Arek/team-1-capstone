import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sendMessage, fetchMessages, addNewMessageThunk } from "../store/chat";
import { startListeningForMessages } from "../store/chat";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Button } from "react-bootstrap";
import { motion } from "framer-motion";
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
    dispatch(fetchMessages(id));

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
      dispatch(addNewMessageThunk(inputMessage, id));
      setInputMessage("");
    }
  };

  const bodyStyle = {
    fontFamily: "'Helvetica Neue', sans-serif",
    backgroundColor: "#ffffff",
    margin: 0,
    padding: 0,
    lineHeight: 1.6,
    color: "#333",
  };

  const navbarStyle = {
    backgroundColor: "#ffc71d",
    padding: "1rem 0",
  };

  const gradientCustomStyle = {
    background:
      "linear-gradient(to right, rgba(250, 112, 154, 0.7), rgba(254, 225, 64, 0.7))",
  };

  const chatContainerStyle = {
    display: "flex",
    flexDirection: "column",
    width: "400px",
    height: "500px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    overflow: "hidden",
  };

  const chatMessagesStyle = {
    flexGrow: 1,
    overflowY: "auto",
    padding: "1rem",
    ...gradientCustomStyle,
  };

  const chatInputStyle = {
    display: "flex",
    alignItems: "center",
    padding: "1rem",
    borderTop: "1px solid #eee",
  };

  const inputStyle = {
    flexGrow: 1,
    marginRight: "1rem",
    padding: "0.5rem",
    border: "1px solid #ccc",
    borderRadius: "4px",
  };

  return (
    <Container style={bodyStyle}>
      <Row className="justify-content-md-center">
        <Col md="auto">
          <div style={chatContainerStyle}>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={chatMessagesStyle}>
              {chat?.map((message, index) => (
                <div key={index}>
                  <strong>{message?.user?.username}: </strong>
                  {message?.message}
                </div>
              ))}
            </motion.div>
            <div style={chatInputStyle}>
              <input
                style={inputStyle}
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
              />
              <Button onClick={handleSendMessage}>Send</Button>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default ChatComponent;
