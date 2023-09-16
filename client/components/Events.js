import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getEventsThunk } from "../store/events";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { fetchTasks, deleteEventThunk } from "../store";
import { motion, wrap } from "framer-motion";

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

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const year = date.getFullYear();

    return `${month}-${day}-${year}`;
  };

  return (
    <Container fluid>
      <Row className="justify-content-center">
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
          {events?.map((event) => (
            <Row md={10} key={event?.id}>
              <div className="event-card" style={eventCardStyle}>
                <p className="event-date">{formatDate(event?.date)}</p>
                <h4 className="event-name">{event?.name}</h4>
                <p className="event-description">{event?.description}</p>
                <div className="event-actions">
                  <Link to={`/events/${event?.id}`}>
                    <Button className="details-btn mx-2">Event Details</Button>
                  </Link>
                  <Button
                    className="delete-btn mx-2"
                    variant="danger"
                    onClick={() => handleDelete(event?.id)}>
                    Delete
                  </Button>
                </div>
              </div>
            </Row>
          ))}
        </motion.div>
      </Row>
    </Container>
  );
};

export default Events;
