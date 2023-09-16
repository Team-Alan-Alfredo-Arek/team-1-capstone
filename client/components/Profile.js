import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Row, Col, Image, ListGroup } from "react-bootstrap";
import { getEventsThunk } from "../store/events";
import { motion } from "framer-motion";
import Events from "./Events";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";

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
      <Container style={{ padding: "40px 0" }}>
        <Row className="justify-content-center">
          <Col md={4}>
            <div className="text-center">
              <Image
                src={authUser.imageUrl}
                alt="User Profile"
                roundedCircle
                style={{
                  width: "100px",
                  height: "100px",
                  objectFit: "cover",
                  boxShadow: "0px 0px 15px rgba(0, 0, 0, 0.1)",
                }}
              />
              <h3 className="mt-3">{authUser.username}</h3>
              <p className="text-muted">
                <strong>Status:</strong>{" "}
                {authUser.isAdmin ? "Admin" : "Regular User"}
              </p>
            </div>
            <h5 className="mt-4 text-primary text-center">Your Events</h5>
            <div className="text-center mt-2">
              <FontAwesomeIcon icon={faArrowDown} color="#007BFF" />
            </div>

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
