import React from "react";
import { connect } from "react-redux";
import { logout } from "../store";
import { Navbar, Nav } from "react-bootstrap";

const MyNavbar = ({ handleClick, isLoggedIn, isAdmin }) => (
  <Navbar className="navbar gradient-custom" variant="light" expand="lg">
    {/* Added gradient-custom to className */}
    <Navbar.Brand href="#home">Capstone</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="ml-auto">
        {isLoggedIn ? (
          <>
            <Nav.Link href="/home">Home</Nav.Link>
            <Nav.Link href="/createevent">Create Event</Nav.Link>
            <Nav.Link href="/events">Events</Nav.Link>
            <Nav.Link href="/userprofile/:id">Profile</Nav.Link>
            {isAdmin? (
                <Nav.Link href="/users">Users
              </Nav.Link>) : (null)
            }
            <Nav.Link href="#" onClick={handleClick}>
              Logout
            </Nav.Link>
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
const mapState = (state) => {
  return {
    isLoggedIn: !!state.auth.id,
    isAdmin: !!state.auth.isAdmin //AK add
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleClick() {
      dispatch(logout());
    },
  };
};

export default connect(mapState, mapDispatch)(MyNavbar);
