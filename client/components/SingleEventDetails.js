import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSingleEventThunk } from "../store/events";
import { fetchTasks } from "../store/task";
import { useParams } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { motion } from "framer-motion";
import TaskComponent from "./Task";

const SingleEventDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const event = useSelector((state) => state.events).find(
    (e) => e.id === Number(id)
  );

  useEffect(() => {
    if (id) {
      dispatch(getSingleEventThunk(id));
      dispatch(fetchTasks());
    }
  }, [dispatch, id]);

  if (!event) return null;

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toISOString().split("T")[0];
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
        <Row className="mb-3" key={event.id} style={eventCardStyle}>
          <Col>
            <h2>{event.name}</h2>
            <p>Date: {formatDate(event.date)}</p>
            <p>Guest Count: {event.guestCount}</p>
            <p>Location: {event.location}</p>
            <p>{event.description}</p>
          </Col>
        </Row>
      </motion.div>

      <TaskComponent />
    </Container>
  );
};

export default SingleEventDetails;
