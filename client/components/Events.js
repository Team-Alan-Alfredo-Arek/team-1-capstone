import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getEventsThunk } from "../store/events";
import { Container, Row, Col } from "react-bootstrap";

const Events = () => {
  const events = useSelector((state) => state.events);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getEventsThunk());
  }, [dispatch]);

  return (
    <Container>
      {events?.map((event) => (
        <Row className="mb-3" key={event?.id}>
          <Col>
            <h1 className="gradient-custom">{event.name}</h1>

            <p>ID: {event?.id}</p>
            <p>{event?.description}</p>
          </Col>
        </Row>
      ))}
    </Container>
  );
};
export default Events;
