import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  sendMessage,
  fetchMessages,
  addNewMessageThunk,
  startListeningForMessages,
} from "../store/chat";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Button } from "react-bootstrap";
import { motion } from "framer-motion";
import io from "socket.io-client";

function ChatComponent() {
  const [inputMessage, setInputMessage] = useState("");
  const [chatOpen, setChatOpen] = useState(true); // for the chat visibility
  const { id } = useParams();
  const chat = useSelector((state) => state.chats);
  const auth = useSelector((state) => state.auth);
  const event = useSelector((state) => state.events).find(
    (e) => e.id === Number(id)
  );
  const dispatch = useDispatch();

  // Socket initialization
  const socket = io(process.env.SOCKET || "http://localhost:3000");

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

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
      e.preventDefault(); // Prevent the default action (like a form submit) from happening
    }
  };

  const styles = {
    bodyStyle: {
      fontFamily: "'Helvetica Neue', sans-serif",
      backgroundColor: "#f5f6f7",
      margin: 0,
      padding: "2rem 0",
      height: "100vh",
      color: "#333",
    },
    chatContainer: {
      display: "flex",
      flexDirection: "column",
      width: "500px",
      height: "450px",
      border: "1px solid #ddd",
      borderRadius: "8px",
      boxShadow: "0 3px 8px rgba(0, 0, 0, 0.15)",
      backgroundColor: "white",
      overflow: "hidden",
    },
    chatHeader: {
      padding: "10px",
      borderBottom: "1px solid #ddd",
      backgroundColor: "#f0f0f0",
      textAlign: "left",
      fontWeight: "bold",
    },
    chatContent: {
      overflowY: "auto",
      height: "360px",
      padding: "10px",
    },
    messageStyle: {
      marginBottom: "0.5rem",
      padding: "0.5rem",
      borderRadius: "15px",
      background: "#f0f0f0",
      maxWidth: "80%",
      alignSelf: "flex-start",
    },
    chatInputStyle: {
      display: "flex",
      alignItems: "center",
      padding: "0.6rem 1rem",
      borderTop: "1px solid #eee",
    },
    inputStyle: {
      flexGrow: 1,
      marginRight: "0.8rem",
      padding: "0.8rem 1rem",
      border: "none",
      borderRadius: "20px",
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    },
  };

  return (
    <Container style={styles.bodyStyle}>
      <Row className="justify-content-md-center">
        <Col md="auto">
          {chatOpen && (
            <div style={styles.chatContainer}>
              <div style={styles.chatHeader}>
                Chat board
                <span
                  style={{ float: "right", cursor: "pointer" }}
                  onClick={() => setChatOpen(false)}>
                  X
                </span>
              </div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                style={styles.chatContent}>
                {chat?.map((message, index) => (
                  <div style={styles.messageStyle} key={index}>
                    <strong>{message?.user?.username}: </strong>
                    {message?.message}
                  </div>
                ))}
              </motion.div>
              <div style={styles.chatInputStyle}>
                <input
                  style={styles.inputStyle}
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress} // Add this line
                />
              </div>
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default ChatComponent;
