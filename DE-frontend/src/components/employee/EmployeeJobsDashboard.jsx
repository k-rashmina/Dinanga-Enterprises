import React, { useEffect, useState, useRef } from 'react';
import { Container, Table, Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import axios from "axios"

const EmployeeJobsDashboard = () => {

  const loggedEmp = localStorage.getItem("emp_id")

  const [isDone, setIsDone] = useState(false);
  const doneJob = useRef({});
  const hasPageLoaded = useRef(false);
  const [updateStatus, setUpdateStatus] = useState(false);

  const handleDoneButtonClick = (job) => {
    hasPageLoaded.current = true;
    job.status = 'done';
    doneJob.current = job; 
    setIsDone(prev => !prev); 
  };

  useEffect(() => {
    
    if(hasPageLoaded.current){
      const confirmation = confirm('Confirm Job Completion');
      if(confirmation){
          
          axios.put(`http://localhost:4000/inventory/updateJobItem?jid=${doneJob.current._id}`)
          .then(() => {

            axios.put("http://localhost:4000/jobAppointment/updateappointment/" + doneJob.current._id, doneJob.current)
            .then(res => {
              console.log("Job marked done");
              doneJob.current = {};
              setUpdateStatus(prev => !prev);
            })
            .catch(err => console.log(err));

          }).catch(err => {

            alert("Inventory items are out of stock");

          })
      }
    }

  }, [isDone])


  const [rows, setRows] = useState([]);

  useEffect(() => {

    axios.get(`http://localhost:4000/jobAppointment/getpendingempjobs?empid=${loggedEmp}`)
    .then(res => {
      console.log(res.data)
      setRows(res.data)
    })

  }, [updateStatus])

  return (
    <Container fluid style={{ padding: '16px', backgroundColor: '#fff', minHeight: '100vh' }}>
      <h4 style={{ color: 'black', textAlign: 'center', fontWeight: 'bold', marginBottom: '20px' }}>Created Jobs</h4>
      <div style={{ borderRadius: '20px', overflow: 'hidden' }}>
        <Table bordered hover responsive style={{ marginBottom: '0' }}>
          <thead>
            <tr style={{ backgroundColor: '#d9d9d9', color: 'black' }}>
              <th style={{ fontWeight: 'bold' }}>Job Number</th>
              <th style={{ fontWeight: 'bold' }}>Job Title</th>
              <th style={{ fontWeight: 'bold' }}>Customer Contact</th>
              <th style={{ fontWeight: 'bold' }}>Location</th>
              <th style={{ fontWeight: 'bold' }}>Due Date</th>
              <th style={{ fontWeight: 'bold' }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={index}>
                <td>{row.jobNumber}</td>
                <td>{row.serviceType?.service_name}</td>
                <td>{row.email}</td>
                <td>{row.location}</td>
                <td>{row.date.substring(0, 10)}</td>
                <td>
                <Button 
                    variant={"success"}
                    onClick={() => handleDoneButtonClick(row)}
                  >
                    Done
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </Container>
  );
};

export default EmployeeJobsDashboard;
