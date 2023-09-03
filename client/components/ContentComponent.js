import React from "react";
import { Container, Row, Col, Button, Card } from "react-bootstrap";

const ContentComponent = () => {
  return (
    <Container fluid className="mt-5">
      {/* Hero Section */}
      <div
        className="text-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1461800919507-79b16743b257?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aHVtYW58ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60')",
          backgroundSize: "cover",
          padding: "100px 0",
          color: "#fff",
        }}>
        <h1>Welcome to Event Creator App CRM</h1>
        <p>Organize your events like a pro.</p>
        <Button variant="primary">Learn More</Button>
      </div>

      {/* Features Section */}
      <Row className="justify-content-center mt-5 wide-row">
        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title>Event Feature</Card.Title>
              <Card.Text>
                The Event Component allows you to create, edit, and manage
                events. From picking a venue to sending invitations, it
                streamlines all aspects of event planning.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title>Task Feature</Card.Title>
              <Card.Text>
                The Task Component helps you create different sets of tasks,
                prioritize them, and track their status. Ideal for project
                management and day-to-day operations.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Customer Reviews Section */}
      <Row className="justify-content-center mt-5">
        <Col md={8}>
          <Card>
            <Card.Header className="text-center">
              <h2>What Our Customers Are Saying</h2>
            </Card.Header>
            <Card.Body className="text-center">
              <Card.Img
                variant="top"
                src="https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGh1bWFufGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60"
                alt="Customer Review"
                style={{
                  width: "100%",
                  maxHeight: "400px",
                  objectFit: "cover",
                }}
              />
              <Card.Text className="mt-3">
                "This is an amazing service!" - John Doe
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ContentComponent;
