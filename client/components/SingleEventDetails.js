import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSingleEventThunk, fetchTasks } from "../store";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Button, Modal } from "react-bootstrap";
import { motion } from "framer-motion";
import TaskComponent from "./Task";
import EventIdeas from "./EventIdeas";
import ChatComponent from "./Chat";
import GenerateTask from "./generateTask";
import { getUsers } from "../store/users";
import { addUserToEventThunk } from "../store";

const styles = {
  eventCard: {
    border: "1px solid #ddd",
    padding: "10px",
    margin: "10px 0",
    borderRadius: "5px",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.3)",
    background: "#fafafa", // a light grey background
    color: "#333",
  },
  chatContainer: {
    position: "fixed",
    bottom: "20px",
    right: "20px",
    width: "300px",
    maxHeight: "500px",
    border: "1px solid #ddd",
    borderRadius: "10px",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.3)",
    background: "#fff",
    overflow: "hidden",
  },
  chatButton: {
    position: "fixed",
    bottom: "20px",
    right: "20px",
    zIndex: 10,
  },
  chatContent: {
    overflowY: "auto",
    height: "400px",
    padding: "10px",
  },
  dropdown: {
    padding: "10px",
    width: "200px",
    border: "1px solid #ddd",
    borderRadius: "5px",
    margin: "10px 0",
    cursor: "pointer",
  },
  button: {
    margin: "10px",
    padding: "8px 16px",
    fontSize: "16px",
  },
};

const SingleEventDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState({});
  const [chatOpen, setChatOpen] = useState(false);

  const toggleModal = useCallback((type) => {
    setShowModal((prevModal) => ({ ...prevModal, [type]: !prevModal[type] }));
  }, []);

  const event = useSelector((state) => state.events).find(
    (e) => e.id === Number(id)
  );

  const [selectedUser, setSelectedUser] = useState(null);
  const users = useSelector((state) => state.users.users);

  useEffect(() => {
    if (id) {
      dispatch(getSingleEventThunk(id));
      dispatch(fetchTasks());
      dispatch(getUsers());
      dispatch(addUserToEventThunk(selectedUser, id));
    }
  }, [dispatch, id]);

  if (!event) return <p>Loading...</p>;

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toISOString().split("T")[0];
  };

  return (
    <Container>
      <motion.div
        className="box"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.6,
          ease: "easeOut",
          opacity: { delay: 0.2 },
          scale: {
            type: "spring",
            damping: 8,
            stiffness: 70,
            restDelta: 0.01,
          },
        }}>
        <Row className="mb-3" style={styles.eventCard}>
          <Col>
            <h2>{event.name}</h2>
            <p>Date: {formatDate(event.date)}</p>
            <p>Guest Count: {event.guestCount}</p>
            <p>Budget: {event.budget}</p>
            <p>Location: {event.location}</p>
            <p>{event.description}</p>
          </Col>
        </Row>
        <select
          style={styles.dropdown}
          onChange={(e) => setSelectedUser(e.target.value)}>
          <option value={null}>Select a user</option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.username}
            </option>
          ))}
        </select>

        <button
          style={styles.button}
          onClick={() => {
            if (selectedUser) {
              dispatch(addUserToEventThunk(selectedUser, id));
            } else {
              console.error("User ID is null or not selected.");
            }
          }}>
          Add User to Event
        </button>

        {/* Buttons */}
        <Button variant="success" onClick={() => toggleModal("ideas")}>
          Event Ideas!
        </Button>
        <Button variant="primary" onClick={() => toggleModal("tasks")}>
          Generate Tasks
        </Button>
        <Button
          style={styles.chatButton}
          variant="warning"
          onClick={() => setChatOpen((prev) => !prev)}>
          Chat board
        </Button>

        {/* Modals */}
        <Modal show={showModal.ideas} onHide={() => toggleModal("ideas")}>
          <Modal.Header closeButton>
            <Modal.Title>Event Ideas!</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <EventIdeas />
          </Modal.Body>
        </Modal>

        <Modal show={showModal.tasks} onHide={() => toggleModal("tasks")}>
          <Modal.Header closeButton>
            <Modal.Title>Generate Task</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <GenerateTask />
          </Modal.Body>
        </Modal>
      </motion.div>

      <TaskComponent />
      {chatOpen && (
        <div style={styles.chatContainer}>
          <ChatComponent />
        </div>
      )}
    </Container>
  );
};

export default SingleEventDetails;
