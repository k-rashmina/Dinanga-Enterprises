import React, { useState, useEffect } from "react";
import {
  Navbar,
  Nav,
  NavDropdown,
  Container,
  Form,
  Button
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import EmployeeApiService from "./EmployeeServices";
import "bootstrap-icons/font/bootstrap-icons.css";
import EmployeeNavBar from "./EmployeeNavBar";

const EmployeeProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    contactNumber: "",
    email: "",
    address: "",
    username: ""
  });
  const [errors, setErrors] = useState({});

  const fetchEmployeeInfo = async () => {
    try {
      const employeeId = localStorage.getItem("emp_id");
      const response = await EmployeeApiService.getEmployeeDetails(employeeId);
      if (response) {
        setFormData({
          fullName: response.name,
          contactNumber: response.contactNumber,
          email: response.email,
          address: response.address,
          username: response.username
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

    validateField(name, value);
  };

  const validateField = (name, value) => {
    let fieldErrors = { ...errors };

    // Validations
    switch (name) {
      case "fullName":
        // Name validation (only letters)
        const namePattern = /^[a-zA-Z\s]+$/;
        if (!value.match(namePattern)) {
          fieldErrors.fullName = "Name can only contain letters.";
        } else {
          delete fieldErrors.fullName;
        }
        break;
      case "contactNumber":
        // Contact number validation
        const contactNumberPattern = /^0\d{9}$/;
        if (!value.match(contactNumberPattern)) {
          fieldErrors.contactNumber =
            "Contact number must start with 0 and be exactly 10 digits long.";
        } else {
          delete fieldErrors.contactNumber;
        }
        break;
      case "email":
        // Email validation
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value.match(emailPattern)) {
          fieldErrors.email = "Invalid email address.";
        } else {
          delete fieldErrors.email;
        }
        break;
      case "address":
        // Address validation
        if (!value) {
          fieldErrors.address = "Address is required.";
        } else {
          delete fieldErrors.address;
        }
        break;
      case "username":
        // Username validation
        if (!value) {
          fieldErrors.username = "Username is required.";
        } else {
          delete fieldErrors.username;
        }
        break;
      default:
        break;
    }

    setErrors(fieldErrors);
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

    console.log("Hello");
    let isValid = true;
    for (let key in formData) {
      validateField(key, formData[key]);
      if (errors[key]) {
        isValid = false;
      }
    }

    if (!isValid) {
      console.log("Please fix the validation errors before saving.");
      return;
    }

    const employeeId = localStorage.getItem("emp_id");

    const updatedData = {
      fullName: formData.fullName,
      contactNumber: formData.contactNumber,
      email: formData.email,
      address: formData.address,
      username: formData.username
    };
    try {
      const response = await EmployeeApiService.updateProfile(
        employeeId,
        updatedData
      );

      if (response) {
        console.log("Employee details updated successfully");

        await fetchEmployeeInfo();

        setIsEditing(false);
      } else {
        console.error("Failed to update employee details:", response.error);
      }
    } catch (error) {
      console.error("Failed to update employee details:", error);
    }
  };

  return (
    <>
      {/* Header with profile icon and dropdown */}
      <EmployeeNavBar fullName={formData.fullName} />

      {/* Employee profile */}
      <Container style={{ marginTop: "30px" }}>
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
              isInvalid={!!errors.fullName}
              required
            />
            <Form.Control.Feedback type="invalid">
              {errors.fullName}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="contactNumber">
            <Form.Label>Contact Number</Form.Label>
            <Form.Control
              type="number"
              name="contactNumber"
              value={formData.contactNumber}
              onChange={handleChange}
              readOnly={!isEditing}
              isInvalid={!!errors.contactNumber}
              required
            />
            <Form.Control.Feedback type="invalid">
              {errors.contactNumber}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="email">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              readOnly={!isEditing}
              isInvalid={!!errors.email}
              required
            />
            <Form.Control.Feedback type="invalid">
              {errors.email}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="address">
            <Form.Label>Address</Form.Label>
            <Form.Control
              as="textarea"
              name="address"
              value={formData.address}
              onChange={handleChange}
              readOnly={!isEditing}
              isInvalid={!!errors.address}
              required
            />
            <Form.Control.Feedback type="invalid">
              {errors.address}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="username">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              readOnly={!isEditing}
              isInvalid={!!errors.username}
              required
            />
            <Form.Control.Feedback type="invalid">
              {errors.username}
            </Form.Control.Feedback>
          </Form.Group>

          {/* Edit, cancel, and save buttons */}
          <Button
            variant="primary"
            type="button"
            onClick={isEditing ? handleCancel : handleEdit}
            className="mr-2"
          >
            {isEditing ? "Cancel" : "Edit"}
          </Button>
          {isEditing && (
            <Button variant="success" type="submit" onClick={handleSubmit}>
              Save
            </Button>
          )}
        </Form>
      </Container>
    </>
  );
};

export default EmployeeProfile;
