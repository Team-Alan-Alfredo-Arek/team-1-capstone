import React, { useEffect } from "react";
import { useSelector, useDispatch, connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout, getEventsThunk, fetchTasks } from "../store";
import { Container, Row, Col, Button } from "react-bootstrap";
import { motion } from "framer-motion";
import Events from "./Events";

const Home = (props) => {
  const { username, logout } = props;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getEventsThunk());
    dispatch(fetchTasks());
  }, [dispatch]);

  return (
    <Container className="mt-5 tilt-background">
      <Row className="justify-content-center hero-section">
        <Col md={8} className="text-center">
          <h1 className="welcomeMessage">Welcome, {username}!</h1>
          <p className="subheading">
            Manage your events and connect with your team
          </p>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md={8} className="text-center">
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
          <div className="d-flex justify-content-center">
            <div className="d-flex flex-column align-items-center">
              <div className="d-flex w-100">
                <Link
                  to="/createevent"
                  className="btn btn-success m-2 flex-grow-1">
                  Create Event
                </Link>
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
