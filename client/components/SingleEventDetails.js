import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSingleEventThunk, fetchTasks } from '../store';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Button, Modal } from 'react-bootstrap';
import { motion } from 'framer-motion';
import TaskComponent from './Task';
import Recipes from './Recipes';

const SingleEventDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState({});

  const toggleModal = (type) => {
    setShowModal({ ...showModal, [type]: !showModal[type] });
  };

  const event = useSelector((state) => state.events).find(
    (e) => e.id === Number(id)
  );

  useEffect(() => {
    if (id) {
      dispatch(getSingleEventThunk(id));
      dispatch(fetchTasks());
    }
  }, [dispatch, id]);

  if (!event) return <p>Loading...</p>;

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toISOString().split('T')[0];
  };

  const eventCardStyle = {
    border: '1px solid #ddd',
    padding: '10px',
    margin: '10px 0',
    borderRadius: '5px',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.3)',
  };

  return (
    <Container>
      <motion.div
        className="box"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.6,
          ease: 'easeOut',
          opacity: { delay: 0.2 },
          scale: {
            type: 'spring',
            damping: 8,
            stiffness: 70,
            restDelta: 0.01,
          },
        }}
      >
        <Row className="mb-3" style={eventCardStyle}>
          <Col>
            <h2>{event.name}</h2>
            <p>Date: {formatDate(event.date)}</p>
            <p>Guest Count: {event.guestCount}</p>
            <p>Budget: {event.budget}</p>
            <p>Location: {event.location}</p>
            <p>{event.description}</p>
          </Col>
        </Row>

        {/* Buttons */}
        <Button variant="primary" onClick={() => toggleModal('suggestions')}>
          Event Suggestions
        </Button>
        <Button variant="success" onClick={() => toggleModal('recipes')}>
          Fun Recipes
        </Button>
        <Button variant="warning" onClick={() => toggleModal('chat')}>
          Chat with Crew
        </Button>

        {/* Modals */}
        <Modal show={showModal.suggestions} onHide={() => toggleModal('suggestions')}>
          <Modal.Header closeButton>
            <Modal.Title>Event Suggestions</Modal.Title>
          </Modal.Header>
          <Modal.Body>Your suggested events will appear here.</Modal.Body>
        </Modal>

        <Modal show={showModal.recipes} onHide={() => toggleModal('recipes')}>
          <Modal.Header closeButton>
            <Modal.Title>Fun Recipes</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Recipes /> 
          </Modal.Body>
        </Modal>

        <Modal show={showModal.chat} onHide={() => toggleModal('chat')}>
          <Modal.Header closeButton>
            <Modal.Title>Chat with Crew</Modal.Title>
          </Modal.Header>
          <Modal.Body>Your chat with the crew will appear here.</Modal.Body>
        </Modal>

      </motion.div>

      <TaskComponent />
    </Container>
  );
};

export default SingleEventDetails;
