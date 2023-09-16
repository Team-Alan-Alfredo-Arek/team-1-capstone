import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createUser } from "../store/users";
import { Container, Row, Col, Button } from "react-bootstrap";
import { motion } from "framer-motion";

const CreateUser = () => {
  const dispatch = useDispatch();

  const [newUser, setNewUser] = useState({
    username: "",
    password: "",
    isAdmin: false,
    imageUrl: "",
  });

  const handleChange = (ev) => {
    setNewUser({ ...newUser, [ev.target.name]: ev.target.value });
  };

  const addNewUser = (ev) => {
    ev.preventDefault();
    try {
      dispatch(createUser(newUser));
      window.alert("New User added");
    } catch (error) {
      window.alert("Error adding new product");
    }
  };

  //   render() {
  //     const { username, password, isAdmin, imageUrl } = this.state;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="motion-container">
      <Container className="create-user-container">
        <form onSubmit={addNewUser}>
          <Row className="mb-3">
            <Col>
              <label htmlFor="username">Username</label>
              <input
                name="username"
                type="text"
                value={newUser.username}
                onChange={handleChange}
                className="form-control"
              />
            </Col>
            <Col>
              <label htmlFor="password">Password</label>
              <input
                name="password"
                type="text"
                value={newUser.password}
                onChange={handleChange}
                className="form-control"
              />
            </Col>
          </Row>
          <Row className="mb-3">
            <Col>
              <label htmlFor="isAdmin">Admin?</label>
              <input
                name="isAdmin"
                checked={newUser.isAdmin}
                type="checkbox"
                onChange={handleChange}
              />
            </Col>
            <Col>
              <label htmlFor="imageUrl">Image Url</label>
              <input
                name="imageUrl"
                value={newUser.imageUrl}
                type="text"
                onChange={handleChange}
                className="form-control"
              />
            </Col>
          </Row>
          <Button type="submit">Add New User</Button>
        </form>
      </Container>
    </motion.div>
  );
};

export default CreateUser;
