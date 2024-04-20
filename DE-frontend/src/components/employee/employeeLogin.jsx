import React, { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import EmployeeApiService from "./EmployeeServices";

const EmployeeLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    try {
      const response = await EmployeeApiService.loginEmployee(username, password);

      console.log("Login successful:", response);

      setUsername("");
      setPassword("");
    } catch (error) {
      console.error("Login failed:", error);
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
