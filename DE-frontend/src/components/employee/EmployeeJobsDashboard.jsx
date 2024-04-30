import React, { useState } from 'react';
import { Container, Table, Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const rows = [
  {
    jobTitle: 'Car Service',
    customerContactNumber: '123-456-7890',
    location: '123 Main St, City',
    dueDate: '04/15/2023',
    status: 'Pending',
  },

];

const EmployeeJobsDashboard = () => {
  const [isDone, setIsDone] = useState(false);

  const handleDoneButtonClick = () => {
    setIsDone(true); 
    setStatus("Completed"); 
  };

  return (
    <Container fluid style={{ padding: '16px', backgroundColor: '#fff', minHeight: '100vh' }}>
      <h4 style={{ color: 'black', textAlign: 'center', fontWeight: 'bold', marginBottom: '20px' }}>Created Jobs</h4>
      <div style={{ borderRadius: '20px', overflow: 'hidden' }}>
        <Table bordered hover responsive style={{ marginBottom: '0' }}>
          <thead>
            <tr style={{ backgroundColor: '#d9d9d9', color: 'black' }}>
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
                <td>{row.jobTitle}</td>
                <td>{row.customerContactNumber}</td>
                <td>{row.location}</td>
                <td>{row.dueDate}</td>
                <td>
                <Button 
                    variant={isDone ? "success" : "secondary"}
                    onClick={handleDoneButtonClick}
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
