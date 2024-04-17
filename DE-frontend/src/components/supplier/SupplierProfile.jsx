import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';
import './SupplierProfile.css';
import axios from 'axios';

function SupplierProfile() {
  const [showSidebar, setShowSidebar] = useState(false);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [supDetails, setSupDetails] = useState({
    Supplier_bname: '',
    Supplier_email: '',
    Supplier_contact: '',
    Supplier_aos: ''
  })

  const handleInputEvents = (e) => {

    const {name, value} = e.target;

    setSupDetails(prevState => {

      return{
        ...prevState,
        [name]: value
      }

    })

  }

  const toggleSidebar = () => setShowSidebar(!showSidebar);
  const handleCloseFeedbackModal = () => setShowFeedbackModal(false);
  const handleShowFeedbackModal = () => setShowFeedbackModal(true);

  const getRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const randomProfilePictureUrl = `https://picsum.photos/200/200?random=${getRandomNumber(1, 1000)}`;

  const handleFeedbackHistory = () => {
    // Handle feedback history logic here
    console.log("Showing feedback history...");
    // You can add further actions here, like displaying a modal or navigating to a different page
  };


  useEffect(() => {

    axios.get(`http://localhost:5000/supplier/readsupplierdetails?email=${'sakitha@gmail.com'}`).then(res => setSupDetails(res.data))

  }, [])

  return (
    <Container fluid style={{ minHeight: '100vh', backgroundColor: '#', display: 'flex', flexDirection: 'row', position: 'relative' }}>
      <div className="sidebar-toggle" onClick={toggleSidebar}>
        <FaBars />
      </div>
      <div className={showSidebar ? "sidebar open" : "sidebar"}>
        <ul>
          <br />
          <br />
          <br />
          <Link style={{ textDecoration: 'none', color: 'black' }} to={'/supalerts'}><li>Order Alerts</li></Link>
          <li onClick={handleShowFeedbackModal}>Send Feedback</li>
          <Link style={{ textDecoration: 'none', color: 'black' }} to={'/supservices'}><li>Services</li></Link>
        </ul>
      </div>
      <div style={{ flex: 1 }}>
        <br />
        <h1 className="profile-heading" style={{ textAlign: 'center', marginTop: '0', color: '#00ADB5' }}><b>Supplier Profile</b></h1>
        <div className="profile-card">
          <div className="profile-details">
            <Form>
              <Form.Group controlId="formBusinessName">
                <Form.Label className="form-label">Business Name</Form.Label>
                <Form.Control type="text" onChange={handleInputEvents} placeholder="Enter business name" name='Supplier_bname' className="form-control" value={supDetails.Supplier_bname} />
              </Form.Group>
              <Form.Group controlId="formAreaOfSpecialization">
                <Form.Label className="form-label">Area of Specialization</Form.Label>
                <Form.Control type="text" onChange={handleInputEvents} placeholder="Enter area of specialization" name='Supplier_aos' className="form-control" value={supDetails.Supplier_aos} />
              </Form.Group>
              <Form.Group controlId="formEmail">
                <Form.Label className="form-label">Email</Form.Label>
                <Form.Control type="email" onChange={handleInputEvents} placeholder="Enter email" name='Supplier_email' className="form-control" value={supDetails.Supplier_email} />
              </Form.Group>
              {/* <Form.Group controlId="formServicesProvided">
                <Form.Label className="form-label">Services Provided</Form.Label>
                <Form.Control type="text" placeholder="Enter services provided" className="form-control" value={} />
              </Form.Group> */}
              <Form.Group controlId="formServicesProvided">
                <Form.Label className="form-label">Contact</Form.Label>
                <Form.Control type="text" onChange={handleInputEvents} placeholder="Enter services provided" name='Supplier_contact' className="form-control" value={supDetails.Supplier_contact} />
              </Form.Group>
              {/* <Form.Group controlId="formPassword">
                <Form.Label className="form-label">Password</Form.Label>
                <Form.Control type="password" placeholder="Enter password" className="form-control" />
              </Form.Group> */}
              <br />
              <Button variant="primary" className="custom-button">Update Profile</Button>{' '}
              <Button variant="danger" className="custom-button">Delete Profile</Button>{' '}
            </Form>
          </div>
        </div>
      </div>
      <Modal show={showFeedbackModal} onHide={handleCloseFeedbackModal}>
        <Modal.Header closeButton>
          <Modal.Title>Feedback</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formSubject">
              <Form.Label className="form-label">Subject</Form.Label>
              <Form.Control type="text" placeholder="Enter subject" className="form-control" />
            </Form.Group>
            <br />
            <Form.Group controlId="formMessage">
              <Form.Label className="form-label">Message</Form.Label>
              <Form.Control as="textarea" rows={3} placeholder="Enter your message" className="form-control" />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Link to ={'/supfeedback'}><Button variant="secondary" onClick={handleFeedbackHistory}>Feedback History</Button></Link> {/* New button */}
          <Button variant="success" onClick={handleCloseFeedbackModal}>Submit</Button>
        </Modal.Footer>
      </Modal>
      <div className="profile-picture-container">
        <img src={randomProfilePictureUrl} alt="Profile" className="profile-picture" />
      </div>
    </Container>
  );
}

export default SupplierProfile;
