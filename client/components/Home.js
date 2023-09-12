import React, { useEffect, useRef } from "react";
import { useSelector, useDispatch, connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout, getEventsThunk, fetchTasks, deleteEventThunk } from "../store";
import { Container, Row, Col, Button, Tab, Tabs } from "react-bootstrap";
import { motion } from "framer-motion";
import Events from "./Events";
const Home = (props) => {
  const { username, logout } = props;
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

  const handleLogout = () => {
    logout();
  };

  return (
    <Container className="mt-5 tilt-background">
      <Row className="justify-content-center hero-section">
        <Col md={8} className="text-center">
          <h1 className="welcomeMessage">Welcome, {username}!</h1>
          <p className="subheading">
            Manage your events and connect with your team
          </p>
          <div className="action-buttons">
            <Link to="/eventsuggestions" className="btn btn-primary m-2">
              Events Suggestions
            </Link>
            <Link to="/recipes" className="btn btn-secondary m-2">
              Fun Recipes
            </Link>
            <Link to="/chatbox" className="btn btn-tertiary m-2">
              Chat with Crew
            </Link>
          </div>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md={8} className="text-center">
          <Tabs defaultActiveKey="suggestions" className="mb-3">
            <Tab eventKey="suggestions" title="Event Suggestions">
              {/* Place content for Event Suggestions here */}
              <p>Your suggested events will appear here.</p>
            </Tab>
            <Tab eventKey="upcoming" title="Upcoming Events">
              {/* Events component content goes here */}
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
                <Events />
              </motion.div>
            </Tab>
          </Tabs>
          <div className="d-flex justify-content-center">
            <div className="d-flex flex-column align-items-center">
              <div className="d-flex w-100">
                <Link
                  to="/createevent"
                  className="btn btn-success m-2 flex-grow-1">
                  Create Event
                </Link>
                <Button
                  className="btn custom-button-color btn-danger m-2 flex-grow-1"
                  onClick={handleLogout}>
                  Logout
                </Button>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

const mapState = (state) => {
  return {
    username: state.auth.username,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(logout()),
  };
};

export default connect(mapState, mapDispatchToProps)(Home);
