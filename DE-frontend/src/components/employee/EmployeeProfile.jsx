import React, { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const EmployeeProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "John Doe",
    contactNumber: "123-456-7890",
    email: "john.doe@example.com",
    address: "123 Main St, City, Country",
    username: "johndoe123",
    previousPassword: "",
    newPassword: ""
  });

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
    // Reset form data to original values
    setFormData({
      fullName: "John Doe",
      contactNumber: "123-456-7890",
      email: "john.doe@example.com",
      address: "123 Main St, City, Country",
      username: "johndoe123",
      previousPassword: "",
      newPassword: ""
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add logic to update employee profile here
    console.log("Form submitted:", formData);
    setIsEditing(false);
  };

  return (
    <Container style={{ marginTop: "50px" }}>
      <h2 className="text-center mb-4">Employee Profile</h2>
      <Form onSubmit={handleSubmit}>
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

        {isEditing && (
          <>
            <Form.Group controlId="previousPassword">
              <Form.Label>Previous Password</Form.Label>
              <Form.Control
                type="password"
                name="previousPassword"
                value={formData.previousPassword}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="newPassword">
              <Form.Label>New Password</Form.Label>
              <Form.Control
                type="password"
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </>
        )}

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
  );
};

export default EmployeeProfile;
