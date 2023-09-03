import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";

const GuestHome = () => {
  return (
    <Container className="mt-5">
      {" "}
      {/* Added mt-5 */}
      <Row className="justify-content-center">
        <Col md={6}>
          <div className="card">
            {" "}
            {/* Added card */}
            <div className="card-body text-center">
              {" "}
              {/* Added card-body */}
              <h1>Welcome to Our App!</h1>
              <p>
                <Button className="btn" href="/login">
                  {" "}
                  {/* Added btn */}
                  Login
                </Button>
                <Button className="btn" href="/signup">
                  {" "}
                  {/* Added btn */}
                  Sign Up
                </Button>
              </p>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default GuestHome;
