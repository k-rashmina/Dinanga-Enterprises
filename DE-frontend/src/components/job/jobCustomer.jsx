import React, { useState, useEffect } from 'react';
import { Container, Table, Button, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { useRef } from 'react';

const CreatedJobsTableBootstrap = () => {
  const loggedUser = localStorage.getItem('loggedUser');

  const [data , setData] = useState([]);
  const [records, setRecords] = useState([]);
  const hasPageLoaded = useRef(false);

  useEffect(() => {
    axios.get(`http://localhost:5000/jobAppointment/getappointmentdetails?email=${loggedUser}`)
    .then(res => {
      hasPageLoaded.current = true;
      setData(res.data);
      setRecords(res.data);
    })
    .catch(err => console.log(err));
  }, []);

  const handleDelete = (_id) => {
    const confirm = window.confirm("Would you like to delete?");
    if(confirm){
      axios.delete(`http://localhost:5000/jobAppointment/deleteappointment/${_id}`)
      .then(res => {
        location.reload();
      }).catch(err => console.log(err));
    }
  }

  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/updateAppointment');
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0]; // Formats as "yyyy-mm-dd"
  };

  const filterRecords = async (event) => {
    const searchTerm = event.target.value.toLowerCase();
    if (searchTerm === "") {
      setRecords(data);
    } else {
      try {
        const response = await axios.get('http://localhost:5000/getjobservices');
        const services = response.data;
  
        const filteredRecords = data.filter(row => {
          const serviceTypeId = row.serviceType?._id?.toString();
  
          if (serviceTypeId) {
            const service = services.find(service => service._id === serviceTypeId);
            const service_name = service ? service.service_name.toLowerCase() : null;
            return service_name && service_name.includes(searchTerm);
          }
          return false;
        });
  
        setRecords(filteredRecords);
      } catch (error) {
        console.log("Error fetching services:", error);
      }
    }
  };

  const handlePay = (data) => {

    localStorage.setItem('createdJob', JSON.stringify(data));
    navigate('/payment/update');

  }
  

  return (
    <Container fluid style={{ padding: '16px', backgroundColor: '#fff', minHeight: '100vh' }}>
      <Row className="justify-content-center">
        <Col xs={12} md={12}>
          <h4 style={{ color: 'black', textAlign: 'center', fontWeight: 'bold', marginBottom: '20px' }}>Created Jobs</h4>
          <div style={{ borderRadius: '20px', overflow: 'hidden' }}>
            <input type="text" className='form-control' onChange={filterRecords}  placeholder="Search"/>
            <Table bordered hover responsive style={{ marginBottom: '0' }} >
              <thead>
                <tr style={{ backgroundColor: '#d9d9d9', color: 'black' }}>
                  <th style={{ fontWeight: 'bold' }}>Service type</th>
                  <th style={{ fontWeight: 'bold' }} align="center">Job number</th>
                  <th style={{ fontWeight: 'bold' }} align="center">Employee Name</th>
                  <th style={{ fontWeight: 'bold' }} align="center">Date time</th>
                  <th style={{ fontWeight: 'bold' }} align="center">Status</th>
                  <th style={{ fontWeight: 'bold' }} align="center"> Payment Status</th>
                  <th style={{ fontWeight: 'bold' }} align="center">Action</th>
                </tr>
              </thead>
              <tbody>
                {records.map((row) => (
                  <tr key={row._id}>
                    <td>
                      {row.serviceType?.service_name}
                      {row.paymentStatus === "pending" && (
                        <Button onClick={() => handlePay(row)} variant="outline-dark" size="sm" style={{ marginLeft: '8px', borderRadius: '4px', fontSize: '0.8rem' }}>
                          <i className="bi bi-credit-card-2-back"></i> Pay
                        </Button>
                      )}
                    </td>
                    <td align="center">{row.jobNumber}</td>
                    <td align="center">{hasPageLoaded.current && (row.employeeName && row.employeeName.name)}</td>
                    <td align="center">{formatDate(row.date)} , {row.time}</td>
                    <td align="center">{row.status}</td>
                    <td align="center">{row.paymentStatus}</td>
                    <td align="center">
                      <Button variant="primary" size="sm" onClick={handleClick} style={{ margin: '2px', backgroundColor: '#00adb4' }}>
                        <i className="bi bi-pencil-square"></i>
                      </Button>
                      <Button onClick={() => handleDelete(row._id)} variant="danger" size="sm" style={{ margin: '2px' }}>
                        <i className="bi bi-trash"></i>
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default CreatedJobsTableBootstrap;
