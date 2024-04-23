import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Form, Button, Image } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import FormImg from '../../assets/jobs and services appointment image.png';
import axios from "axios";

const JobServicesAppointmentFormBootstrap = () => {
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    email: '',
    location: '',
    serviceType: '',
    vehicleType: '',
    status: 'pending',
    paymentStatus:'pending',

  });

  const [formComplete, setFormComplete] = useState(false);
  const [dateErr, setDateErr] = useState('');
  const [timeErr, setTimeErr] = useState('');
  const [locationErr, setLocationErr] = useState('');
  const [serviceTypeErr, setServiceTypeErr] = useState('');
  const [vehicleTypeErr, setVehicleTypeErr] = useState('');
  const [emailErr, setEmailErr] = useState('');

  

  const today = new Date().toISOString().split('T')[0];
  const navigate = useNavigate();

  const [serviceOptions, setServiceOptions] = useState([]);

  useEffect(() => {

    axios.get('http://localhost:5000/getjobservices').then(res => setServiceOptions(res.data));

  }, [])

  const serviceOptionsElems = serviceOptions.map(service => {
    return(
      <option key={service._id} value={service._id}>{service.service_name}</option>    )
  })

  // useEffect(() => {
  //   // Fetch services data from your backend API
  //   axios.get("http://localhost:5000/servicesModel/")
  //     .then(response => {
  //       setServices(response.data); // Assuming response.data is an array of service objects
  //     })
  //     .catch(error => {
  //       console.error('Error fetching services:', error);
  //     });
  //   }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const { date, time, email, location, serviceType, vehicleType } = formData;
    if (date.trim() !== '' && time.trim() !== '' && email.trim() !== '' && location.trim() !== '' && serviceType.trim() !== '' && vehicleType.trim() !== '') {
      setFormComplete(true);
    } else {
      setFormComplete(false);
    }
  };

  const handleBlur = (field) => {
    switch (field) {
      case 'date':
        setDateErr(formData.date === '' ? 'Date is required.' : '');
        break;
      case 'time':
        setTimeErr(formData.time === '' ? 'Time is required.' : '');
        break;
      case 'email':
        setEmailErr(formData.email === '' ? 'Email is required.' : '');
        break;
      case 'location':
        setLocationErr(formData.location === '' ? 'Location is required.' : '');
        break;
      case 'serviceType':
        setServiceTypeErr(formData.serviceType === '' ? 'Service type is required.' : '');
        break;
      case 'vehicleType':
        setVehicleTypeErr(formData.vehicleType === '' ? 'Vehicle type is required.' : '');
        break;
      default:
        break;
    }
  };

  const emailValidation = (e) => {
    const emailVal = e.target.value;
    const regEx = /^[^\.\s][\w\-]+(\.[\w\-]+)*@([\w-]+\.)+[\w-]{2,}$/gm
    setEmailErr(regEx.test(emailVal) ? '' : 'Email is invalid');
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    validateForm();

    axios.post("http://localhost:5000/jobAppointment/addjobappointment", formData)
      .then(() => {
        alert("Appointment added");
        navigate('/jobCustomer');
      })
      .catch((err) => {
        alert(err);
      });
  };

  return (
    <Container fluid style={{ minHeight: '100vh', backgroundColor: '#191B1A', alignItems: 'center', display: 'flex', justifyContent: 'center' }}>
      <Row className="justify-content-md-center align-items-center" style={{ minHeight: '100vh' }}>
        <Col lg={11} style={{ marginTop: '50px', marginBottom:'50px'}}> {/* Added margin to the form */}
          <Form action="POST" onSubmit={handleSubmit} style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '15px', boxShadow: '0 3px 10px rgba(0,0,0,.2)' }}>
            <Row>
              <Col md={6} className="d-flex flex-column">
                <h5 style={{ marginBottom: '0px', fontWeight: 'bold' }}>Job Services Appointment</h5>
                <Form.Group className="mb-3">
                  <Form.Label>Date</Form.Label>
                  <Form.Control type="date" name="date" value={formData.date} onChange={handleChange} required min={today} onBlur={() => handleBlur('date')} />
                  <p style={{ color: 'red' }}>{dateErr}</p>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Time</Form.Label>
                  <Form.Control type="time" name="time" value={formData.time} onChange={handleChange} required onBlur={() => handleBlur('time')} />
                  <p style={{ color: 'red' }}>{timeErr}</p>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" name="email" placeholder='Enter valid email' value={formData.email} onChange={(e) => {
                    handleChange(e);
                    emailValidation(e);
                  }} required onBlur={() => handleBlur('email')} />
                  <p style={{ color: 'red' }}>{emailErr}</p>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Location</Form.Label>
                  <Form.Select name="location" value={formData.location} onChange={handleChange} required onBlur={() => handleBlur('location')} >
                    <option value="">Select Location</option>
                    <option>Panadura</option>
                    <option>Kurunagala</option>
                    <option>Ampara</option>
                    <option>chilaw</option>
                    <option>Anuradhapura</option>
                    <option>Galle</option>
                    <option>Rathnapura</option>
                    <option>Badulla</option>
                  </Form.Select>
                  <p style={{ color: 'red' }}>{locationErr}</p>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Service Type</Form.Label>
                  <Form.Select name="serviceType" value={formData.serviceType} onChange={handleChange} required onBlur={() => handleBlur('serviceType')}>
                    <option value={''}>Select a Service Type</option>
                    {serviceOptionsElems}
                  </Form.Select>
                  <p style={{ color: 'red' }}>{serviceTypeErr}</p>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Vehicle Type</Form.Label>
                  <Form.Select name="vehicleType" value={formData.vehicleType} onChange={handleChange} required onBlur={() => handleBlur('vehicleType')}>
                    <option value="">Select Vehicle Type</option>
                    <option>Toyota</option>
                    <option>Honda</option>
                    <option>Nissan</option>
                    <option>Mitsubishi</option>
                  </Form.Select>
                  <p style={{ color: 'red' }}>{vehicleTypeErr}</p>
                </Form.Group>
                <Button variant="primary" type="submit" style={{ marginTop: '10px', backgroundColor: '#00adb4', borderRadius: '20px', border: 'none' }}>
                  Submit
                </Button>
              </Col>
              <Col md={6} className="d-none d-md-block">
                <Image src={FormImg} alt="Car Service" fluid rounded style={{ borderRadius: '20px', minHeight: '700px' }} />
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default JobServicesAppointmentFormBootstrap;
