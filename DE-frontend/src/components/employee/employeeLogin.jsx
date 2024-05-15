import React, { useState } from "react";
import { Container, Form, Button, InputGroup, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import EmployeeApiService from "./EmployeeServices";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
// import "./EmployeeLogin.css";

const EmployeeLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await EmployeeApiService.loginEmployee(
        username,
        password
      );
      console.log("Login successful:", response);

      if (response.token) {
        const decodedToken = jwtDecode(response.token);
        localStorage.setItem("token", response.token);
        localStorage.setItem("emp_id", decodedToken.employeeId);

        if (decodedToken.department === "Mechanical") {
          navigate("/empjobs");
        } else if (decodedToken.department === "Consultancy") {
          navigate("/empconsultancy");
        } else {
          alert("Unknown department.");
        }
      } else {
        alert("Login failed: " + response.message);
      }

      setUsername("");
      setPassword("");
    } catch (error) {
      console.error("Login failed:", error);
      alert("Incorrect username or password.");
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <Container className="login-container">
      <h2 className="text-center mb-4">Employee Login</h2>
      <Row className="justify-content-center">
        <Col>
          <Form onSubmit={handleSubmit} className="login-form">
            <Form.Group className="mb-3" controlId="formBasicUsername">
              <Form.Control
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="login-input"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <InputGroup>
                <Form.Control
                  type={passwordVisible ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="login-input"
                />
                <InputGroup.Text onClick={togglePasswordVisibility}>
                  {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                </InputGroup.Text>
              </InputGroup>
            </Form.Group>

            <Row className="p-0 justify-content-center">
              <div className="button-container">
                <Button
                  variant="primary"
                  type="submit"
                  className="login-button-form"
                >
                  Login
                </Button>
              </div>
            </Row>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default EmployeeLogin;
