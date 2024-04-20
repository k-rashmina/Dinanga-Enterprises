import React, { useState, useEffect } from 'react';
import { Container, Navbar, Table, Form } from 'react-bootstrap';
import { PersonCircle } from 'react-bootstrap-icons';
import axios from "axios";

const AssignJobs = () => {
  const [data, setJobs] = useState([]);
  const [employee, setEmployee] = useState({});


  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0]; // Formats as "yyyy-mm-dd"
  };


  useEffect(() => {
    axios.get("http://localhost:5000/jobAppointment/getpendingdetails")
      .then(res => {
        const initialEmployeeState = res.data.reduce((acc, job) => {
          acc[job._id] = job.employeeName || ''; // Initialize with existing employee name if present
          return acc;
        }, {});
        setEmployee(initialEmployeeState);
        setJobs(res.data);
      })
      .catch(err => console.log(err));
  }, []);

  const handleChange = (event, _id) => {
    const { value } = event.target;
    setEmployee(prevState => ({
      ...prevState,
      [_id]: value,
    }));

    axios.put(`http://localhost:5000/jobAppointment/updateappointment/${_id}`, { employeeName: value })
      .then(() => {
        alert("Employee added");
      })
      .catch((err) => {
        console.log(err); // Log error to console for debugging
        alert("Error occurred while adding employee");
      });
  };

  return (

    <div style={{ flexGrow: 1, overflowY: 'auto', width: 'calc(100% - 20px)' }}>

      {/* <Navbar bg="light" className="shadow-sm" style={{ paddingLeft: 20, paddingRight: 20 }} >
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            <PersonCircle className="me-2" />
            Kalindu Rashmina
          </Navbar.Text>
        </Navbar.Collapse>
      </Navbar> */}
      <Container className="mt-4" style={{ width: 'fullwidth' }}>
        <h5 className="mb-3 fw-bold">Job lists</h5>
        <Table bordered hover size="sm">

          <thead style={{ backgroundColor: '#d9d9d9'}}>

            <tr>
              <th>Job Number</th>
              <th>Service type</th>
              <th>Date time</th>
              <th>Location</th>
              <th>Employee</th>
            </tr>
          </thead>
          <tbody>
            {data.map((job) => (
              <tr key={job._id}>
                <td>{job.jobNumber}</td>
                <td>{job.serviceType}</td>
                <td>{formatDate(job.date)} , {job.time}</td>
                <td>{job.location}</td>
                <td>
                  <Form.Select value={employee[job._id]} onChange={(e) => handleChange(e, job._id)}>
                    <option value="">Select Employee</option>
                    <option>Saman</option>
                    <option>Agith</option>
                    <option>Nuwan</option>
                  </Form.Select>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        {/* <button variant='primary' style={{backgroundColor: '#00adb4', position: 'fixed', bottom: '200px', right: '20px'}}>Download PDF</button> */}
      </Container>
    </div>

  );
};

export default AssignJobs;
