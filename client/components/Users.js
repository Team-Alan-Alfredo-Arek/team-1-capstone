import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../store/users";
import CreateUser from "./CreateUser";
import SingleUser from "./SingleUser";
import { Container, Row, Col } from "react-bootstrap";
import { motion } from "framer-motion";

export default function Users() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const users = useSelector((state) => state.users);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="motion-container">
      <Container className="main-container">
        <Row>
          <Col>
            <h1 className="gradient-custom">Users</h1>
          </Col>
        </Row>
        <Row>
          <Col>
            <ul>
              {users?.users.map((user) => (
                <li key={user.id}>
                  <SingleUser user={user} />
                </li>
              ))}
            </ul>
          </Col>
          <Col>
            <CreateUser />
          </Col>
        </Row>
      </Container>
    </motion.div>
  );
}
