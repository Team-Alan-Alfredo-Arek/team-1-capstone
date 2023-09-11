import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getEventsThunk } from "../store/events";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { fetchTasks } from "../store";

const Events = () => {
  const events = useSelector((state) => state.events);
  const tasks = useSelector((state) => state.tasks);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getEventsThunk());
    dispatch(fetchTasks());
  }, [dispatch]);

  const eventCardStyle = {
    border: "1px solid #ddd",
    padding: "10px",
    margin: "10px 0",
    borderRadius: "5px",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.3)",
  };

  return (
    <Container>
      {events?.map((event) => (
        <Row className="mb-3" key={event?.id} style={eventCardStyle}>
          <Col>
            <p>{event?.date}</p>
            <h3>{event?.name}</h3>
            <p>{event?.description}</p>
            <Link to={`/events/${event?.id}`}>
              <button
                style={{
                  alignContent: "flex-end",
                  justifyContent: "end",
                }}>
                {" "}
                Event Details
              </button>
            </Link>
          </Col>
        </Row>
      ))}
    </Container>
  );
};
export default Events;
