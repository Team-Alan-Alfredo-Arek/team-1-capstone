import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getEventsThunk } from "../store/events";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { fetchTasks, deleteEventThunk } from "../store";
import { motion } from "framer-motion";

const Events = () => {
  const events = useSelector((state) => state.events);
  const tasks = useSelector((state) => state.tasks);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getEventsThunk());
    dispatch(fetchTasks());
  }, [dispatch]);

  const handleDelete = (eventId) => {
    dispatch(deleteEventThunk(eventId));
  };

  const eventCardStyle = {
    border: "1px solid #ddd",
    padding: "10px",
    margin: "10px 0",
    borderRadius: "5px",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.3)",
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
          opacity: {
            delay: 0.2,
          },
          scale: {
            type: "spring",
            damping: 8,
            stiffness: 70,
            restDelta: 0.01,
          },
        }}>
        {events?.map((event) => (
          <Row className="mb-3" key={event?.id} style={eventCardStyle}>
            <Col>
              <p>{event?.date}</p>
              <h3>{event?.name}</h3>
              <p>{event?.description}</p>
              <Link to={`/events/${event?.id}`}>
                <Button> Event Details</Button>
                <Button
                  variant="danger"
                  onClick={() => handleDelete(event?.id)}>
                  Delete
                </Button>
              </Link>
            </Col>
          </Row>
        ))}
      </motion.div>
    </Container>
  );
};
export default Events;
