import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getEventsThunk, createEventThunk } from "../store/events";
import { Form, Button, Container, ListGroup, Modal } from "react-bootstrap";

export default function CreateEvent() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const [eventName, setEventName] = useState("");
  const [eventLocation, setEventLocation] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventGuestCount, setEventGuestCount] = useState(1);
  const [eventDescription, setEventDescription] = useState("");
  const [eventBudget, setEventBudget] = useState("");
  const [eventStatus, setEventStatus] = useState("");

  useEffect(() => {
    dispatch(getEventsThunk());
  }, [dispatch]);

  const handleCreateEvent = () => {
    dispatch(
      createEventThunk({
        name: eventName,
        location: eventLocation,
        date: eventDate,
        guestCount: eventGuestCount,
        description: eventDescription,
        budget: eventBudget,
        status: eventStatus,
        userId: auth.id,
      })
    );
    setEventName("");
    setEventLocation("");
    setEventDate("");
    setEventGuestCount(1);
    setEventDescription("");
    setEventBudget("");
    setEventStatus("");
  };

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toISOString().split("T")[0];
  };

  return (
    <Container>
      <h1>Create Event</h1>
      <Form>
        <Form.Group>
          <Form.Label>Event Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter event name"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Location</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter location"
            value={eventLocation}
            onChange={(e) => setEventLocation(e.target.value)}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Date</Form.Label>
          <Form.Control
            type="datetime-local"
            value={eventDate}
            onChange={(e) => setEventDate(e.target.value)}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Guest Count</Form.Label>
          <Form.Control
            type="number"
            value={eventGuestCount}
            onChange={(e) => setEventGuestCount(e.target.value)}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter description"
            value={eventDescription}
            onChange={(e) => setEventDescription(e.target.value)}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Budget</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter budget"
            value={eventBudget}
            onChange={(e) => setEventBudget(e.target.value)}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Status</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter status"
            value={eventStatus}
            onChange={(e) => setEventStatus(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" onClick={handleCreateEvent}>
          Create Event
        </Button>
      </Form>

      {/* List/Modal. */}
    </Container>
  );
}
