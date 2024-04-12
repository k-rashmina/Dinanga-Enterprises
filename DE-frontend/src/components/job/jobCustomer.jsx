import React, { useState } from 'react';
import { Container, Table, Button, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import axios from "axios"






const CreatedJobsTableBootstrap = () => {

  const [data , setRows] = useState([])
  const [records, setRecords] = useState([])



  useEffect(()=>{
    axios.get("http://localhost:5000/jobAppointment/getappointmentdetails")
    .then(res => {
      setRows(res.data)
      setRecords(res.data);
    })
    .catch(err => console.log(err));

  },[])


  

  const handleDelete = (_id) => {
    const confirm = window.confirm("would you like to Delete?");
    if(confirm){
      axios.delete("http://localhost:5000/jobAppointment/deleteappointment/" + _id)
      .then(res =>{
        location.reload();
      }).catch(err =>console.log(err));
    }
   }

  const navigate = useNavigate();

     const handleClick = () => {
      navigate('/updateAppointment');
     };

     const Filter = (event) =>{
       setRecords(data.filter(f => f.serviceType.toLowerCase().includes(event.target.value)))
     }

     

  return (
    <Container fluid style={{ padding: '16px', backgroundColor: '#fff', minHeight: '100vh' }}>
      <Row className="justify-content-center">
        <Col xs={12} md={8}>
          <h4 style={{ color: 'black', textAlign: 'center', fontWeight: 'bold', marginBottom: '20px' }}>Created Jobs</h4>
          <div style={{ borderRadius: '20px', overflow: 'hidden' }}>
          <input type="text" className='form-control' onChange={Filter}  placeholder="Search"/>
          <Table bordered hover responsive style={{ marginBottom: '0' }} >
            <thead>
              <tr style={{ backgroundColor: '#d9d9d9', color: 'black' }}>
                <th style={{ fontWeight: 'bold' }}>Service type</th>
                <th style={{ fontWeight: 'bold' }} align="center">Job number</th>
                <th style={{ fontWeight: 'bold' }} align="center">Employee Name</th>
                <th style={{ fontWeight: 'bold' }} align="center">Date time</th>
                <th style={{ fontWeight: 'bold' }} align="center">Status</th>
                <th style={{ fontWeight: 'bold' }} align="center">Action</th>
              </tr>
            </thead>
            <tbody>
              {records.map((row, index) => (
                <tr key={index}>
                  <td>
                    {row.serviceType}
                    <Button variant="outline-dark" size="sm" style={{ marginLeft: '8px', borderRadius: '4px', fontSize: '0.8rem' }}>
                      <i className="bi bi-credit-card-2-back"></i> Pay
                    </Button>
                  </td>
                  <td align="center">{row.jobNumber}</td>
                  <td align="center">{row.employeeName}</td>
                  <td align="center">{row.date}    {row.time}</td>
                  <td align="center">{row.status}</td>
                  <td align="center">
                    <Button variant="primary"size="sm" onClick={handleClick} style={{ margin: '2px',backgroundColor: '#00adb4' }}>
                      <i className="bi bi-pencil-square"></i>
                    </Button>
                    <Button onClick = {e=>handleDelete(row._id)} variant="danger" size="sm" style={{ margin: '2px' }}>
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