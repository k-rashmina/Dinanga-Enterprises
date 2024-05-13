import React, { useState, useEffect, useRef } from 'react';
import { Container, Form, Button, Modal } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';

import './SupplierProfile.css';
import axios from 'axios';

function SupplierProfile() {


  const loggedSupplier = localStorage.getItem('loggedSup');

  const nav = useNavigate();

  const date = new Date().toJSON();
  const today = date.substring(0, 10);

  const hasPageLoaded = useRef(false) 
  const [showSidebar, setShowSidebar] = useState(false);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [supDetails, setSupDetails] = useState({});
  const [isEditMode, setIsEditMode] = useState(false);

  const handleInputEvents = (e) => {
    const { name, value } = e.target;
    setSupDetails(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const toggleSidebar = () => setShowSidebar(!showSidebar);
  const handleCloseFeedbackModal = () => setShowFeedbackModal(false);
  const handleShowFeedbackModal = () => setShowFeedbackModal(true);
  

  const getRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  //const randomProfilePictureUrl = `https://picsum.photos/200/200?random=${getRandomNumber(1, 1000)}`;

  const handleFeedbackHistory = () => {
    
    console.log("Showing feedback history...");

  };

  useEffect(() => {
    axios.get(`http://localhost:5000/supplier/readsupplierdetails?email=${loggedSupplier}`).then(res => {
      hasPageLoaded.current = true;
      setSupDetails(res.data);

  });
  }, []);


  const handleUpdateProfile = () => {
    
    axios.put('http://localhost:5000/supplier/upsupplierdetails', supDetails)
      .then(response => {
        console.log("Profile updated successfully:", response.data);
        setIsEditMode(false); 
      })
      .catch(error => {
        console.error("Error updating profile:", error);
        
      });
  };
  


  const handleDeleteProfile = () => {
   
    axios.delete(`http://localhost:5000/supplier/delsupplierdetails?supid=${supDetails._id}`)
      .then(response => {
        console.log("Profile deleted successfully:", response.data);
        alert("deleted")
        localStorage.removeItem('loggedSup');
        
        history.push('/supreg');
        nav('/')
      })
      .catch(error => {
        console.error("Error deleting profile:", error);
        
      });
  };


//Handle feedback post

  const [formData, setFormData] = useState({
    Supplier_Email: loggedSupplier,
    Supplier_Subject: '',
    Supplier_Message: '',
    fed_date: today
  });

  const handleFeedbackInputs = e => {

    const {name, value} = e.target;

    setFormData(prev => {

      return{

        ...prev,
        [name]: value

      }
    })
  }
  

  const [fedSubVal, setFedSubVal] = useState(false);
  const handleFeedbackSubmit = () => {
    
    setFedSubVal(prev => !prev);

  };
  
  
  useEffect(() => {

    
    axios.post('http://localhost:5000/supFeedback/addsupplierfeedbacks', formData)
    .then(response => {
      console.log(response.data); 
      handleCloseFeedbackModal();
    })
    .catch(error => {
      console.error('Error submitting feedback:', error);
    });

  }, [fedSubVal])



console.log(loggedSupplier)
  

  return (
    <Container className='div-shadow' fluid style={{ minHeight: '100vh', backgroundColor: '#EEEEEE', display: 'flex', flexDirection: 'row', position: 'relative' }}>
      <div className="sidebar-toggle" onClick={toggleSidebar}>
        <FaBars />
      </div>
      <div className={showSidebar ? "sidebar open" : "sidebar"}>
        <ul>
          <br />
          <br />
          <br />
          <Link style={{ textDecoration: 'none', color: 'black' }} to={`/supalerts/${supDetails._id}`}><li>Order Alerts</li></Link>
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
                <Form.Control type="text" readOnly={!isEditMode} onChange={handleInputEvents} placeholder="" name='Supplier_bnames' className="form-control" value={hasPageLoaded.current ? supDetails.Supplier_bname : ''} />
              </Form.Group>
              <Form.Group controlId="formAreaOfSpecialization">
                <Form.Label className="form-label">Area of Specialization</Form.Label>
                <Form.Control type="text" readOnly={!isEditMode} onChange={handleInputEvents} placeholder="" name='Supplier_aos' className="form-control" value={hasPageLoaded.current ? supDetails.Supplier_aos : ''} />
              </Form.Group>
              <Form.Group controlId="formEmail">
                <Form.Label className="form-label">Email</Form.Label>
                <Form.Control type="email" readOnly={!isEditMode} onChange={handleInputEvents}  name='Supplier_email' className="form-control" value={hasPageLoaded.current ? supDetails.Supplier_email : '' } disabled />
              </Form.Group>
              <Form.Group controlId="formServicesProvided">
                <Form.Label className="form-label">Contact</Form.Label>
                <Form.Control type="text" readOnly={!isEditMode} onChange={handleInputEvents}  name='Supplier_contact' className="form-control" value={hasPageLoaded.current ? supDetails.Supplier_contact : ''} />
              </Form.Group>
              <br />
              {!isEditMode && (
                <>
                  <Button variant="primary" className="custom-button" onClick={() => setIsEditMode(true)}>Update Profile</Button>{' '}
                  <Button variant="danger" className="custom-button" onClick={handleDeleteProfile}>Delete Profile</Button>{' '}
                </>
              )}
              {isEditMode && (
                <>
                  <Button variant="success" className="custom-button" onClick={handleUpdateProfile}>Save Changes</Button>{' '}
                  <Button variant="secondary" className="custom-button" onClick={() => setIsEditMode(false)}>Cancel</Button>{' '}
                </>
              )}
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
              <Form.Control type="text" placeholder="Enter subject" name="Supplier_Subject" className="form-control" value={formData.Supplier_Subject} onChange={handleFeedbackInputs} />
            </Form.Group>
            <br />
            <Form.Group controlId="formMessage">
              <Form.Label className="form-label">Message</Form.Label>
              <Form.Control as="textarea" rows={3} placeholder="Enter your message" name="Supplier_Message" className="form-control" value={formData.Supplier_Message} onChange={handleFeedbackInputs} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Link to ={`/supfeedback`}><Button variant="secondary" onClick={handleFeedbackHistory}>Feedback History</Button></Link> {/* New button */}
          <Button variant="success" onClick={handleFeedbackSubmit}>Submit</Button>
        </Modal.Footer>
      </Modal>
      {/* <div className="profile-picture-container">
        <img src={randomProfilePictureUrl} alt="Profile" className="profile-picture" />
      </div> */}
    </Container>
  );
}

export default SupplierProfile;