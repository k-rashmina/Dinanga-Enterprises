import React, { useState } from "react";
import { Container, Form, Button, Alert } from "react-bootstrap";
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

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;

    //Validations logic for the name
    if (name === "name") {
      // Remove non-alphabetic characters
      const newValue = value.replace(/[^a-zA-Z\s]/g, "");
      setFormData({
        ...formData,
        [name]: newValue
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }

    validateField(name, value);
  };

  const validateField = (name, value) => {
    let fieldErrors = { ...errors };

    //Validations
    switch (name) {
      case "name":
        if (!value) {
          fieldErrors.name = "Name is required.";
        } else {
          delete fieldErrors.name;
        }
        break;
      case "contactNumber":
        //Allow only numbers, and check length and starting digit
        const contactNumberPattern = /^0\d{9}$/;
        if (!value.match(contactNumberPattern)) {
          fieldErrors.contactNumber = "Contact number must start with 0 and be exactly 10 digits long.";
        } else {
          delete fieldErrors.contactNumber;
        }
        break;
      case "email":
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value.match(emailPattern)) {
          fieldErrors.email = "Invalid email address.";
        } else {
          delete fieldErrors.email;
        }
        break;
      case "password":
        if (value.length < 8) {
          fieldErrors.password = "Password must be at least 8 characters long.";
        } else {
          delete fieldErrors.password;
        }
        //Validate password match with confirmPassword
        if (formData.confirmPassword && formData.confirmPassword !== value) {
          fieldErrors.confirmPassword = "Passwords do not match.";
        } else {
          delete fieldErrors.confirmPassword;
        }
        break;
      case "confirmPassword":
        if (value !== formData.password) {
          fieldErrors.confirmPassword = "Passwords do not match.";
        } else {
          delete fieldErrors.confirmPassword;
        }
        break;
      case "department":
        if (!value) {
          fieldErrors.department = "Department is required.";
        } else {
          delete fieldErrors.department;
        }
        break;
      default:
        break;
    }

    setErrors(fieldErrors);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let isValid = true;
    for (let key in formData) {
      validateField(key, formData[key]);
      if (errors[key]) {
        isValid = false;
      }
    }

    if (!isValid) {
      alert("Please fix the validation errors before submitting.");
      return;
    }

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
            placeholder="Enter your full name (Ex: Saman Kumara)"
            required
          />
          {errors.name && <Alert variant="danger">{errors.name}</Alert>}
        </Form.Group>

        <Form.Group controlId="contactNumber">
          <Form.Label>Contact Number</Form.Label>
          <Form.Control
            type="tel"
            name="contactNumber"
            value={formData.contactNumber}
            onChange={handleChange}
            placeholder="0XXXXXXXXX"
            required
          />
          {errors.contactNumber && <Alert variant="danger">{errors.contactNumber}</Alert>}
        </Form.Group>

        <Form.Group controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="example@gmail.com"
            required
          />
          {errors.email && <Alert variant="danger">{errors.email}</Alert>}
        </Form.Group>

        <Form.Group controlId="address">
          <Form.Label>Address</Form.Label>
          <Form.Control
            as="textarea"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Enter your address"
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
            placeholder="Enter your username"
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
            placeholder="Enter your password (at least 8 characters)"
            required
          />
          {errors.password && <Alert variant="danger">{errors.password}</Alert>}
        </Form.Group>

        <Form.Group controlId="confirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="text"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm your password"
            required
          />
          {errors.confirmPassword && <Alert variant="danger">{errors.confirmPassword}</Alert>}
        </Form.Group>

        <Form.Group controlId="department" style={{ marginBottom: "20px" }}>
          <Form.Label>Department</Form.Label>
          <Form.Control
            as="select"
            name="department"
            value={formData.department}
            onChange={handleChange}
            placeholder="Select your department"
            required
          >
            <option value="">Select Department</option>
            <option value="Mechanical">Mechanical</option>
            <option value="Consultancy">Consultancy</option>
          </Form.Control>
          {errors.department && <Alert variant="danger">{errors.department}</Alert>}
        </Form.Group>

        <Button variant="primary" type="submit" className="w-100">
          Register
        </Button>
      </Form>
    </Container>
  );
};

export default RegisterNewEmployee;
