import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSingleEventThunk } from "../store/events";
import { useParams } from "react-router-dom";
import { fetchTasks } from "../store";
export default function SingleEventDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const event = useSelector((state) => state.events).find(
    (e) => e.id === Number(id)
  );

  const tasks = useSelector((state) => state.tasks).filter(
    (task) => task.eventId === Number(id)
  );

  useEffect(() => {
    if (id) {
      dispatch(getSingleEventThunk(id));
      dispatch(fetchTasks());
    }
  }, [dispatch, id]);

  if (!event) return null;

  return (
    <div>
      <h2>{event.name}</h2>
      <p>Date: {event.date}</p>
      <p>Guest Count: {event.guestCount}</p>
      <p>Location: {event.location}</p>
      <p>{event.description}</p>

      <h3>Tasks for this event: hey</h3>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>{task.name}</li>
        ))}
      </ul>
    </div>
  );
}
