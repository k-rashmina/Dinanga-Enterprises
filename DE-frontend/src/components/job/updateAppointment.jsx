import React, { useState, useEffect } from 'react';
import { Container, Table, Button, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import axios from "axios";

const CreatedJobsTableBootstrap = () => {
  // Retrieve logged-in user's email from local storage
  const loggedUser = localStorage.getItem('loggedUser');

  const today = new Date().toISOString().split('T')[0];
  const [data, setData] = useState([]);
  const [editId, setEditID] = useState(-1);
  const [updatedData, setUpdatedData] = useState({});

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0]; // Formats as "yyyy-mm-dd"
  };


  useEffect(() => {
    fetchData();
  }, []);

  // Fetch job appointment details associated with the logged-in user
  const fetchData = () => {
    axios.get(`http://localhost:5000/jobAppointment/getappointmentdetails?email=${loggedUser}`)
      .then(res => {
        setData(res.data);
      })
      .catch(err => console.log(err));
  };

  const handleEdit = (_id) => {
    setEditID(_id);
    const selectedItem = data.find(item => item._id === _id);
    setUpdatedData(selectedItem);
  };

  const handleUpdate = () => {
    axios.put("http://localhost:5000/jobAppointment/updateappointment/" + editId, updatedData)
      .then(res => {
        console.log(res);
        setEditID(-1);
        fetchData(); // Fetch updated data after successful update
      })
      .catch(err => console.log(err));
  };

  const handleChange = (fieldName, value) => {
    setUpdatedData(prevState => ({
      ...prevState,
      [fieldName]: value
    }));
  };

  return (
    <Container fluid style={{ padding: '16px', backgroundColor: '#fff', minHeight: '100vh' }}>
      <Row className="justify-content-center">
        <Col xs={12} md={12}>
          <h4 style={{ color: 'black', textAlign: 'center', fontWeight: 'bold', marginBottom: '20px', fontSize: '24px' }}>Update Jobs</h4>
          <div style={{ borderRadius: '10px', overflow: 'hidden' }}>
            <Table bordered hover responsive style={{ marginBottom: '0', fontSize: '18px' }} >
              <thead>
                <tr style={{ backgroundColor: '#d9d9d9', color: 'black' }}>
                  <th style={{ fontWeight: 'bold', padding: '12px' }}>Job Number</th>
                  {/* <th style={{ fontWeight: 'bold' }}>Service type</th> */}
                  <th style={{ fontWeight: 'bold', textAlign: 'center', padding: '12px' }}>Vehicle type</th>
                  <th style={{ fontWeight: 'bold', textAlign: 'center', padding: '12px' }}>Date</th>
                  <th style={{ fontWeight: 'bold', textAlign: 'center', padding: '12px' }}>Time</th>
                  <th style={{ fontWeight: 'bold', textAlign: 'center', padding: '12px' }}>Location</th>
                  <th style={{ fontWeight: 'bold', textAlign: 'center', padding: '12px' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {data.map((row, index) => (
                  <tr key={index}>
                    <td style={{ textAlign: 'center', padding: '12px' }}>{row.jobNumber}</td>
                    {/* <td>{editId === row._id ?
                      <select value={updatedData.serviceType} onChange={e => handleChange('serviceType', e.target.value)}>
                        <option>battery replacement</option>
                        <option>abs replacement</option>
                        <option>hybrid battery service</option>
                        <option>break service</option>
                        <option>engine oil change</option>
                        <option>engine overall repair</option>
                        <option>dual clutch change</option>
                        <option>body wash</option>
                        <option>inverter coolant change</option>
                      </select>
                      : row.serviceType}
                    </td> */}
                    <td style={{ textAlign: 'center', padding: '12px' }}>{editId === row._id ?
                      <select value={updatedData.vehicleType} onChange={e => handleChange('vehicleType', e.target.value)} style={{ fontSize: '16px' }}>
                        <option>Toyota</option>
                        <option>Honda</option>
                        <option>Nissan</option>
                        <option>Mitsubishi</option>
                      </select>
                      : row.vehicleType}
                    </td>
                    <td style={{ textAlign: 'center', padding: '12px' }}>{editId === row._id ?
                      <input type="date" value={updatedData.date} onChange={e => handleChange('date', e.target.value)} required min={today} style={{ fontSize: '16px' }} />
                      : formatDate(row.date)}
                    </td>
                    <td style={{ textAlign: 'center', padding: '12px' }}>{editId === row._id ?
                      <input type="time" value={updatedData.time} onChange={e => handleChange('time', e.target.value)} style={{ fontSize: '16px' }} />
                      : row.time}
                    </td>
                    <td style={{ textAlign: 'center', padding: '12px' }}>{editId === row._id ?
                      <select value={updatedData.location} onChange={e => handleChange('location', e.target.value)} style={{ fontSize: '16px' }}>
                        <option>Panadura</option>
                        <option>Kurunagala</option>
                        <option>Ampara</option>
                        <option>Chilaw</option>
                        <option>Anuradhapura</option>
                        <option>Galle</option>
                        <option>Rathnapura</option>
                        <option>Badulla</option>
                      </select>
                      : row.location}
                    </td>
                    <td style={{ textAlign: 'center', padding: '12px' }}>
                      {editId === row._id ?
                        <Button onClick={handleUpdate} variant="primary" size="sm" style={{ margin: '2px', backgroundColor: '#00adb4', fontSize: '16px' }}>Update</Button>
                        :
                        <Button onClick={() => handleEdit(row._id)} variant="primary" size="sm" style={{ margin: '2px', fontSize: '16px',  backgroundColor: '#00adb4' }}>
                          <i className="bi bi-pencil-square"></i>
                        </Button>
                      }
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
