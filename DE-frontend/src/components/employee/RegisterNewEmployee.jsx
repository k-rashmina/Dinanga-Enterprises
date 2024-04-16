import React, { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import EmployeeApiService from "./EmployeeServices";

const RegisterNewEmployee = () => {
  const [formData, setFormData] = useState({
    name: "",
    contactNumber: "",
    email: "",
    address: "",
    username: "",
    password: "",
    confirmPassword: "",
    department: ""
  });

  const [passwordMatchError, setPasswordMatchError] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    if (name === "confirmPassword") {
      validatePasswordMatch(formData.password, value);
    }

    const validatePasswordMatch = (password, confirmPassword) => {
      setPasswordMatchError(password !== confirmPassword);
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (passwordMatchError) {
      alert("Passwords do not match!");
      return;
    }

    // Perform form validation here
    console.log(formData);
    const response = await EmployeeApiService.registerEmployee({
      ...formData,
      name: formData.name,
      role: formData.department
    });

    alert(response.msg);
  };

  return (
    <Container style={{ marginTop: "50px" }}>
      <h2 className="text-center mb-4">Employee Registration</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="fullName">
          <Form.Label>Full Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="contactNumber">
          <Form.Label>Contact Number</Form.Label>
          <Form.Control
            type="tel"
            name="contactNumber"
            value={formData.contactNumber}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="address">
          <Form.Label>Address</Form.Label>
          <Form.Control
            as="textarea"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="username">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="text"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="confirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="text"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </Form.Group>

        {passwordMatchError && (
          <Alert variant="danger">Passwords do not match!</Alert>
        )}

        <Form.Group controlId="department" style={{ marginBottom: "20px" }}>
          <Form.Label>Department</Form.Label>
          <Form.Control
            as="select"
            name="department"
            value={formData.department}
            onChange={handleChange}
            required
          >
            <option value="">Select Department</option>
            <option value="Mechanical">Mechanical</option>
            <option value="Consultancy">Consultancy</option>
          </Form.Control>
        </Form.Group>

        <Button variant="primary" type="submit" className="w-100">
          Register
        </Button>
      </Form>
    </Container>
  );
};

export default RegisterNewEmployee;
