import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../store";
import { Container, Row, Col, Button } from "react-bootstrap";

const Home = (props) => {
  const { username, logout } = props;

  const handleLogout = () => {
    logout();
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={6} className="text-center">
          <h3 className="welcomeMessage">Welcome, {username}!</h3>
          <div className="d-flex justify-content-center">
            <div className="d-flex flex-column align-items-center">
              <div className="d-flex w-100">
                <Link
                  to="/userProfile/:id"
                  className="btn btn-success m-2 flex-grow-1">
                  Profile
                </Link>
                <Link to="/events" className="btn btn-success m-2 flex-grow-1">
                  Events
                </Link>
                <Link to="/tasks" className="btn btn-success m-2 flex-grow-1">
                  Tasks
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
