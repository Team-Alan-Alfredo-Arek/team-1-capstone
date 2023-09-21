import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, createUser, updateUser } from "../store";
import { Link, useHistory } from "react-router-dom"; // added useHistory
import { Container, Row, Col, Button } from "react-bootstrap";
import { motion } from "framer-motion";
import { getUser, getUsers } from "../store";
import { useParams } from "react-router-dom";

const SingleUser = (props) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  const userFromStore = useSelector((state) => state.users)?.users.find(
    (user) => user.id === Number(id)
  );
  const user = props.user || userFromStore;

  const initialFormState = user
    ? {
        username: user.username,
        password: user.password,
        isAdmin: user.isAdmin,
        imageUrl: user.imageUrl,
      }
    : {
        username: "",
        password: "",
        isAdmin: false,
        imageUrl: "",
      };

  const [form, setForm] = useState(initialFormState);

  useEffect(() => {
    if (id) {
      dispatch(getUser(id));
      dispatch(getUsers());
    }
  }, [dispatch, id]);

  const handleDeleteUser = async (id) => {
    try {
      await dispatch(deleteUser(id));
      window.alert("User deleted successfully, redirecting to main page.");
      history.push("/users"); // redirect to user list after deletion
    } catch (error) {
      window.alert("Failed to delete User.", error);
    }
  };

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    const val = type === "checkbox" ? checked : value;
    setForm((prevForm) => ({ ...prevForm, [name]: val }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const actionUser = {
      ...form,
      id: user.id,
    };

    if (!user.id) {
      dispatch(createUser(actionUser));
      setForm({
        username: "",
        password: "",
        isAdmin: false,
        imageUrl: "",
      });
    } else {
      dispatch(updateUser(actionUser));
    }
  };
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="motion-container">
      <Container className="user-container">
        <form onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Col>
              <label htmlFor="username">User Name</label>
              <input
                name="username"
                type="text"
                value={form.username}
                onChange={handleChange}
                className="form-control"
              />
            </Col>
            <Col>
              <label htmlFor="password">Password</label>
              <input
                name="password"
                type="text"
                value={form.password}
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
                checked={form.isAdmin}
                type="checkbox"
                onChange={handleChange}
              />
            </Col>
            <Col>
              <label htmlFor="imageUrl">Image Url</label>
              <input
                name="imageUrl"
                value={form.imageUrl}
                type="text"
                onChange={handleChange}
                className="form-control"
              />
            </Col>
          </Row>
          <Button type="submit">Submit</Button>
        </form>
        <Button variant="danger" onClick={() => handleDeleteUser(user.id)}>
          Delete User
        </Button>
        <Link to={"/users"}>
          <Button variant="secondary">Go Back</Button>
        </Link>
      </Container>
    </motion.div>
  );
};

export default SingleUser;
