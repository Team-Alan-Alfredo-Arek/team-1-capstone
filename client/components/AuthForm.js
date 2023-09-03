import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { authenticate } from "../store";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Alert,
} from "react-bootstrap";
import { motion } from "framer-motion";

const AuthForm = (props) => {
  const { name, displayName, handleSubmit, error } = props;

  // Animation settings for framer-motion
  const containerVariants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <motion.div
            className="box"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.6, // longer duration for a smoother effect
              ease: "easeOut", // smoother easing function
              opacity: {
                delay: 0.2, // slight delay to make it smoother
              },
              scale: {
                type: "spring",
                damping: 8, // increased damping for a softer landing
                stiffness: 70, // decreased stiffness for a softer motion
                restDelta: 0.01,
              },
            }}>
            <Card>
              <Card.Header className="text-center">{displayName}</Card.Header>
              <Card.Body>
                <Form onSubmit={handleSubmit} name={name}>
                  <Form.Group>
                    <Form.Label>Username</Form.Label>
                    <Form.Control name="username" type="text" />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Control name="password" type="password" />
                  </Form.Group>
                  <div className="text-center">
                    <Button type="submit" className="custom-button-color mr-2">
                      {displayName}
                    </Button>

                    {name === "login" && (
                      <Link to="/signup" className="btn custom-button-color">
                        Sign Up
                      </Link>
                    )}
                  </div>
                  {error && error.response && (
                    <Alert variant="danger" className="mt-3">
                      {error.response.data}
                    </Alert>
                  )}
                </Form>
              </Card.Body>
            </Card>
          </motion.div>
        </Col>
      </Row>
    </Container>
  );
};

// ... rest of your code

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = (state) => {
  return {
    name: "login",
    displayName: "Login",
    error: state.auth.error,
  };
};

const mapSignup = (state) => {
  return {
    name: "signup",
    displayName: "Sign Up",
    error: state.auth.error,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleSubmit(evt) {
      evt.preventDefault();
      const formName = evt.target.name;
      const username = evt.target.username.value;
      const password = evt.target.password.value;

      if (!username || !password) {
        alert("Both username and password are required.");
        return;
      }

      dispatch(authenticate(username, password, formName));
    },
  };
};

export const Login = connect(mapLogin, mapDispatch)(AuthForm);
export const Signup = connect(mapSignup, mapDispatch)(AuthForm);
