import React, { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import EmployeeApiService from "./EmployeeServices";
import {jwtDecode} from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

const EmployeeLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
        const response = await EmployeeApiService.loginEmployee(username, password);
        console.log("Login successful:", response);

        if (response.token) {
            const decodedToken = jwtDecode(response.token);
            localStorage.setItem('token', response.token);
            localStorage.setItem('emp_id', decodedToken.employeeId);
            

            if (localStorage.getItem('token')) {
              navigate('/empprofile');
            } else {
                alert('Failed to store token. Please try logging in again.');
            }
        } else {
            alert('Login failed: ' + response.message);
        }

        setUsername("");
        setPassword("");
    } catch (error) {
        console.error("Login failed:", error);
        alert('Incorrect username or password.');
    }
};


  return (
    <Container style={{ marginTop: "50px" }}>
      <h2 className="text-center mb-4">Employee Login</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="w-100">
          Login
        </Button>
      </Form>
    </Container>
  );
};

export default EmployeeLogin;
