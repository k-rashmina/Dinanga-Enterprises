import React, { useState, useRef, useEffect } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import './LoginForm.css'; 
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {

  const nav = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      hasPageLoaded.current = true;
      setLogVal(prev => !prev);
    }
  };

  const validateForm = () => {
    let errors = {};
    let formIsValid = true;

    // Validate Email
    if (!email) {
      formIsValid = false;
      errors['email'] = 'Please enter your email address.';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      formIsValid = false;
      errors['email'] = 'Please enter a valid email address.';
    }

    // Validate Password
    if (!password){
      formIsValid = false;
      errors['password'] = 'Please enter a valid password';
    }

    setErrors(errors);
    return formIsValid;
  };

  const useridentify = (user) => {

    if(user){

        localStorage.setItem('loggedSup', user.Supplier_email);
        return true;

    }
    return false;
  }

  const [logVal, setLogVal] = useState(false);
  const hasPageLoaded = useRef(false);


  useEffect(() => {

    if(hasPageLoaded.current){
      axios.post(`http://localhost:5000/supplier/getloggedsup`, {mail: email, pass: password})
      .then(res => {
        
        if(useridentify(res.data)) {

          nav('/');

        }else{
          alert('Invalid Credentials')
        }

      })
    }

  }, [logVal])

  return (
    <center>
    <dev className="login-container">
      <h4 className="login-header">Supplier Login</h4>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`login-input border-color ${errors['email'] ? 'is-invalid' : ''}`}
          />
          <Form.Text className="text-danger">
            {errors['email']}
          </Form.Text>
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={`login-input border-color ${errors['password'] ? 'is-invalid' : ''}`}
          />
          <Form.Text className="text-danger">
            {errors['password']}
          </Form.Text>
        </Form.Group>

        <Button variant="primary" type="submit" className="login-btn reg-form-button">
          Submit
        </Button>
      </Form>
    </dev>
    </center>
  );
};

export default LoginForm;
