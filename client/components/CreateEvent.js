import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getEventsThunk, createEventThunk } from "../store/events";
import { Link } from "react-router-dom";

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
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Create Event</h1>
      <form>
        <div className="form-group">
          <label>Event Name</label>
          <input type="text" className="form-control" placeholder="Enter event name" value={eventName} onChange={(e) => setEventName(e.target.value)} />
        </div>

        <div className="form-group">
          <label>Location</label>
          <input type="text" className="form-control" placeholder="Enter location" value={eventLocation} onChange={(e) => setEventLocation(e.target.value)} />
        </div>

        <div className="form-group">
          <label>Date</label>
          <input type="datetime-local" className="form-control" value={eventDate} onChange={(e) => setEventDate(e.target.value)} />
        </div>

        <div className="form-group">
          <label>Guest Count</label>
          <input type="number" className="form-control" value={eventGuestCount} onChange={(e) => setEventGuestCount(e.target.value)} />
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea className="form-control" rows="3" placeholder="Enter description" value={eventDescription} onChange={(e) => setEventDescription(e.target.value)}></textarea>
        </div>

        <div className="form-group">
          <label>Budget</label>
          <input type="text" className="form-control" placeholder="$$$" value={eventBudget} onChange={(e) => setEventBudget(e.target.value)} />
        </div>

        <div className="form-group">
          <label>Status</label>
          <input type="text" className="form-control" placeholder="Enter status" value={eventStatus} onChange={(e) => setEventStatus(e.target.value)} />
        </div>

        <Link to="/events">
          <button type="button" className="btn btn-primary btn-block" onClick={handleCreateEvent}>Create Event</button>
        </Link>
      </form>
    </div>
  );
}
