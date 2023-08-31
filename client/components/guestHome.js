import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';

const GuestHome = () => {
  return (
    <Container>
      <Row className="justify-content-center mt-5">
        <Col md={6}>
          <div className="card">
            <div className="card-body text-center">
              <h1>Welcome to Our App!</h1>
              <p>
                <Button className="mr-2" href="/login">Login</Button>
                <Button href="/signup">Sign Up</Button>
              </p>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default GuestHome;


