import React, { useState, useEffect } from "react";
import { Navbar, Nav, NavDropdown, Container, Form, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import EmployeeApiService from "./EmployeeServices"; 
import { useNavigate } from "react-router-dom"; 

const EmployeeProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    contactNumber: "",
    email: "",
    address: "",
    username: "",
    previousPassword: "",
    newPassword: ""
  });
  
  const navigate = useNavigate(); 

  const fetchEmployeeInfo = async () => {
    try {
      const employeeId = localStorage.getItem('emp_id');
      const response = await EmployeeApiService.getEmployeeDetails(employeeId);
      if (response) {
        setFormData({
          fullName: response.name,
          contactNumber: response.contactNumber,
          email: response.email,
          address: response.address,
          username: response.username,
          previousPassword: "",
          newPassword: ""
        });
      }
    } catch (error) {
      console.error("Failed to fetch employee info:", error);
    }
  };

  useEffect(() => {
    fetchEmployeeInfo();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    fetchEmployeeInfo();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Extract the employee ID from localStorage
    const employeeId = localStorage.getItem('emp_id');

    // Create an object containing the updated form data
    const updatedData = {
        fullName: formData.fullName,
        contactNumber: formData.contactNumber,
        email: formData.email,
        address: formData.address,
        username: formData.username,
    };

  
    // Make an API call to update the employee details
    try {
        const response = await EmployeeApiService.updateEmployeeDetails(employeeId, updatedData);

        // Handle the response from the server
        if (response.success) {
            console.log('Employee details updated successfully');
            
            // Reload employee data to reflect the changes
            fetchEmployeeInfo();

            // Stop editing
            setIsEditing(false);
        } else {
            console.error('Failed to update employee details:', response.error);
        }
    } catch (error) {
        console.error('Failed to update employee details:', error);
    }
};


  const handleLogout = () => {
    localStorage.removeItem("authToken");
   
    navigate("/emplogin");
  };

  return (
    <>
      {/*Header with profile icon and dropdown */}
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="#">Welcome {formData.fullName}!</Navbar.Brand>
          <Nav className="ml-auto">
            <NavDropdown
              title={<i className="bi bi-person-circle"></i>}
              id="nav-dropdown"
            >
              <NavDropdown.Item onClick={handleLogout}>
                Logout
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Container>
      </Navbar>

      {/*Employee profile*/}
      <Container style={{ marginTop: "50px" }}>
        <h2 className="text-center mb-4">Employee Profile</h2>
        <Form onSubmit={handleSubmit}>

          {/* Form fields */}
          <Form.Group controlId="fullName">
            <Form.Label>Full Name</Form.Label>
            <Form.Control
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              readOnly={!isEditing}
            />
          </Form.Group>
          <Form.Group controlId="contactNumber">
            <Form.Label>Contact Number</Form.Label>
            <Form.Control
              type="tel"
              name="contactNumber"
              value={formData.contactNumber}
              onChange={handleChange}
              readOnly={!isEditing}
            />
          </Form.Group>
          <Form.Group controlId="email">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              readOnly={!isEditing}
            />
          </Form.Group>
          <Form.Group controlId="address">
            <Form.Label>Address</Form.Label>
            <Form.Control
              as="textarea"
              name="address"
              value={formData.address}
              onChange={handleChange}
              readOnly={!isEditing}
            />
          </Form.Group>
          <Form.Group controlId="username">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              readOnly={!isEditing}
            />
          </Form.Group>

          {/*Edit,cancel and save buttons */}
          <Button
            variant="primary"
            type="button"
            onClick={isEditing ? handleCancel : handleEdit}
            className="mr-2"
          >
            {isEditing ? "Cancel" : "Edit"}
          </Button>
          {isEditing && (
            <Button variant="success" type="submit">
              Save
            </Button>
          )}
        </Form>
      </Container>
    </>
  );
};

export default EmployeeProfile;
