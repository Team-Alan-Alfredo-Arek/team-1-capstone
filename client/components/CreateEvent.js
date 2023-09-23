import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getEventsThunk, createEventThunk, createEventUserList } from "../store/events";
import { Form, Button, Container, ListGroup, Modal } from "react-bootstrap";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

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
  //ak new data for guestlist
  const [eventEmailListText, setEventEmailListText] = useState("");


  useEffect(() => {
    dispatch(getEventsThunk());
  }, [dispatch]);

  const handleCreateEvent = () => {
    
    const emails = eventEmailListText.split(/[,;]/).map((email) => email.trim());
    console.log("emails from handlecreateeevent", emails)
    const eventThunkData = {
      name: eventName,
      location: eventLocation,
      date: eventDate,
      guestCount: eventGuestCount,
      description: eventDescription,
      budget: eventBudget,
      status: eventStatus,
      userId: auth.id,
      emailList: emails}
    dispatch(
      createEventThunk(eventThunkData)
    );
    setEventName("");
    setEventLocation("");
    setEventDate("");
    setEventGuestCount(1);
    setEventDescription("");
    setEventBudget("");
    setEventStatus("");
    setEventEmailListText("");
  };

  return (
    <Container className="form-container">
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

        {/* AK new email text box, dropdown to add current users */}
        <Form.Group>
          <Form.Label>Add Invitee's Emails</Form.Label>
          <Form.Control
            type="text"
            rows="3"
            placeholder="Enter emails to add users to this event"
            value={eventEmailListText}
            onChange={(e) => setEventEmailListText(e.target.value)}
          />
        </Form.Group>

        <Link to="/events">
          <Button
            variant="primary"
            className="form-button"
            onClick={handleCreateEvent}>
            Create Event
          </Button>
        </Link>
      </Form>

      {/* List/Modal. */}
    </Container>
  );
}
