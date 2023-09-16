import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Row, Col, Image, ListGroup } from "react-bootstrap";
import { getEventsThunk } from "../store/events";
import { motion } from "framer-motion";
import Events from "./Events";

const Profile = () => {
  const authUser = useSelector((state) => state.auth);
  const events = useSelector((state) => state.events);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getEventsThunk());
  }, [dispatch]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="motion-container">
      <Container style={{ textAlign: "center" }}>
        <Row className="d-flex justify-content-start">
          <Col md={4}>
            <div className="text-center">
              <Image
                src={authUser.imageUrl}
                alt="User Profile"
                roundedCircle
                style={{
                  width: "75px",
                  height: "75px",
                  objectFit: "cover",
                }}
              />
              <h4 className="mt-2">{authUser.username}</h4>
              <p>
                <strong>Status:</strong>{" "}
                {authUser.isAdmin ? "Admin" : "Regular User"}
              </p>
            </div>
            <h5 className="mt-3" style={{ textAlign: "center" }}>
              Your Events
            </h5>
            <div className="text-center mt-3">⬇️</div>

            <ListGroup>
              <Events />
            </ListGroup>
          </Col>
        </Row>
      </Container>
    </motion.div>
  );
};

export default Profile;
