import React from "react";
import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useNavigate } from "react-router-dom";

const EmployeeNavBar = ({ fullName }) => {
  const navigate = useNavigate();
  const handleProfile = () => {
    navigate("/empprofile");
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/emplogin");
  };
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="#">Welcome {fullName}!</Navbar.Brand>
        <Nav className="ml-auto">
          <NavDropdown
            title={<i className="bi bi-person-circle"></i>}
            id="nav-dropdown"
          >
            <NavDropdown.Item onClick={handleProfile}>
              <i className="bi bi-person"></i> Profile
            </NavDropdown.Item>
            <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default EmployeeNavBar;
