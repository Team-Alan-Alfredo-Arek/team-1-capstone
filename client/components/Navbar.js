import React from 'react';
import { connect } from 'react-redux';
import { logout } from '../store';
import { Navbar, Nav } from 'react-bootstrap';

const MyNavbar = ({ handleClick, isLoggedIn }) => (
  <Navbar className="navbar" variant="light" expand="lg">  {/* Change class to className */}
    <Navbar.Brand href="#home">Capstone</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="ml-auto">
        {isLoggedIn ? (
          <>
            <Nav.Link href="/home">Home</Nav.Link>
            <Nav.Link href="/events">Events</Nav.Link>
            <Nav.Link href="/userprofile/:id">Profile</Nav.Link>
            <Nav.Link href="#" onClick={handleClick}>Logout</Nav.Link>
          </>
        ) : (
          <>
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/login">Login</Nav.Link>
            <Nav.Link href="/signup">Sign Up</Nav.Link>
          </>
        )}
      </Nav>
    </Navbar.Collapse>
  </Navbar>
);

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.auth.id
  };
};

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout());
    }
  };
};

export default connect(mapState, mapDispatch)(MyNavbar);
