import React from "react";
import { connect } from "react-redux";
import { Link, useParams } from "react-router-dom";
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
import ContentComponent from "./ContentComponent";

const AuthForm = (props) => {
  const { name, displayName, handleSubmit, error } = props;
  let { emailParam } = useParams();
  console.log("Authform email", emailParam);
  return (
    <Container className="mt-5">
      <Row>
        <Col md={6}>
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
            <Card style={{ alignContent: "center" }}>
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
                  {/* AK adding Email IFF signing up */}
                  {displayName === "Sign Up" ? (
                    <Form.Group>
                      <Form.Label>Email Address</Form.Label>
                      <Form.Control
                        name="email"
                        type="email"
                        value={emailParam}
                      />
                    </Form.Group>
                  ) : null}

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
      const formName = evt.target.name; //AK 'Login' or Signup'
      const username = evt.target.username.value;
      const password = evt.target.password.value;
      const email = evt.target.email ? evt.target.email.value : null;

      if (!username || !password || (!email && formName === Signup)) {
        alert("All fields are required.");
        return;
      }

      dispatch(authenticate(username, password, email, formName));
    },
  };
};

export const Login = connect(mapLogin, mapDispatch)(AuthForm);
export const Signup = connect(mapSignup, mapDispatch)(AuthForm);
