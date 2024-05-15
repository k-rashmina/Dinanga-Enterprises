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
          <h4 style={{ color: 'black', textAlign: 'center', fontWeight: 'bold', marginBottom: '20px', fontSize: '24px' }}>Job History</h4>
          <div style={{ borderRadius: '20px', overflow: 'hidden' }}>
            <input type="text" style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ced4da', fontSize: '16px' }} onChange={filterRecords} placeholder="Search" />
          </div>
          <Table bordered hover responsive style={{ marginBottom: '0', fontSize: '18px' }}>
            <thead>
              <tr style={{ backgroundColor: '#d9d9d9', color: 'black' }}>
                <th style={{ fontWeight: 'bold', padding: '12px', textAlign: 'left' }}>Service type</th>
                <th style={{ fontWeight: 'bold', padding: '12px', textAlign: 'center' }}>Job number</th>
                <th style={{ fontWeight: 'bold', padding: '12px', textAlign: 'center' }}>Employee Name</th>
                <th style={{ fontWeight: 'bold', padding: '12px', textAlign: 'center' }}>Date time</th>
                <th style={{ fontWeight: 'bold', padding: '12px', textAlign: 'center' }}>Status</th>
                <th style={{ fontWeight: 'bold', padding: '12px', textAlign: 'center' }}>Payment Status</th>
                <th style={{ fontWeight: 'bold', padding: '12px', textAlign: 'center' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {records.map((row) => (
                <tr key={row._id}>
                  <td>
                    {row.serviceType?.service_name}
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      {row.paymentStatus === "pending" && (
                        <Button onClick={() => handlePay(row)} variant="outline-dark" size="sm" style={{ borderRadius: '4px', fontSize: '16px' }}>
                          <i className="bi bi-credit-card-2-back"></i> Complete Payment
                        </Button>
                      )}
                    </div>
                  </td>
                  <td style={{ textAlign: 'center', padding: '12px' }}>{row.jobNumber}</td>
                  <td style={{ textAlign: 'center', padding: '12px' }}>{hasPageLoaded.current && (row.employeeName && row.employeeName.name)}</td>
                  <td style={{ textAlign: 'center', padding: '12px' }}>{formatDate(row.date)} , {row.time}</td>
                  <td style={{ textAlign: 'center', padding: '12px', color: row.status === 'pending' ? 'red' : 'green' }}>{row.status}</td>
                  <td style={{ textAlign: 'center', padding: '12px', color: row.paymentStatus === 'pending' ? 'red' : 'green' }}>{row.paymentStatus}</td>
                  <td style={{ textAlign: 'center', padding: '12px' }}>
                    {/* Disable the edit button if an employee name exists */}
                    {!row.employeeName && (
                      <>
                        <Button variant="primary" size="sm" onClick={handleClick} style={{ margin: '2px', backgroundColor: '#00adb4', fontSize: '16px' }}>
                          <i className="bi bi-pencil-square"></i>
                        </Button>
                        <Button onClick={() => handleDelete(row._id)} variant="danger" size="sm" style={{ margin: '2px', fontSize: '16px' }}>
                          <i className="bi bi-trash"></i>
                        </Button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};

export default CreatedJobsTableBootstrap;
