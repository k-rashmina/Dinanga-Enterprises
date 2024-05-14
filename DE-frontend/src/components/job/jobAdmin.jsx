import React, { useState, useEffect, useRef } from 'react';
import { Container, Navbar, Table, Form, Button } from 'react-bootstrap';
import SupLogo from '../../assets/DELogo.png';
import axios from "axios";
import AdminHeader from "../common/AdminHeader";

const AssignJobs = () => {
  const [data, setJobs] = useState([]);
  const [employee, setEmployee] = useState({});
  const [availableConsEmp, setAvailableConsEmp] = useState([]);
  const hasPageLoaded = useRef(false);
  
  useEffect(() => {
    // Fetch job details and available employees
    fetchData();
  }, []);

  // Fetch job details and available employees
  const fetchData = () => {
    axios.get("http://localhost:5000/jobAppointment/getpendingdetails")
      .then(res => {
        const initialEmployeeState = res.data.reduce((acc, job) => {
          acc[job._id] = job.employeeName ? job.employeeName._id : ''; // Initialize with existing employee name if present
          hasPageLoaded.current = true;
          return acc;
        }, {});
        setEmployee(initialEmployeeState);
        setJobs(res.data);
      })
      .catch(err => console.log(err));

    axios.get('http://localhost:5000/employee/getAvailableMechanicalEmployees')
      .then(res => setAvailableConsEmp(res.data))
      .catch(err => console.log(err));
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0]; // Formats as "yyyy-mm-dd"
  };

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

  const handleDownloadPDF = () => {
    // Call the function to print the interface as a PDF
    printPDF();
  };


  // Function to print the interface as a PDF
  const printPDF = () => {
    const htmlContent = generateHTMLForPDF();
    const windowContent = '' + htmlContent + '</body></html>';
    const printWin = window.open('', '', 'width=1024,height=768');
    printWin.document.open();
    printWin.document.write(windowContent);
    printWin.document.close();
    printWin.print();
  };

  const generateHTMLForPDF = () => {
    let html =
      `<div style="text-align: center; font-size: 40px; font-family: Calibri; margin-bottom: 10px; display: flex; align-items: center; justify-content: center;">
        <img src="${SupLogo}" alt="Company logo" style="height: 120px; width: 120px;">
        <b>Dinanga Enterprises</b>
      </div>
      <div style="text-align: center; font-size: 14px; font-family: Calibri; margin-bottom: 10px;">
        <b>Address: 68 Paraththa Rd, Panadura 12500</b>
      </div>
      <div style="text-align: center; font-size: 14px; font-family: Calibri; margin-bottom: 10px;">
        <b>Telephone: +94 71 126 1449</b>
      </div>
      <hr/>`;


    html +=
      `<h1 style="text-align: center; font-size: 24px;">Job History</h1>
        <table border="1" style="width: 80%; margin: 0 auto; text-align: center;">
          <tr>
            <th>Job Number</th>
            <th>ServiceType</th>
            <th>DateTime</th>
            <th>Location</th>
            <th>Employee</th>
          </tr>`;
    
    html += data.map(job => (
      `<tr key=${job._id}>
        <td>${job.jobNumber}</td>
        <td>${job.serviceType.service_name}</td>
        <td>${formatDate(job.date)},  ${job.time}</td>
        <td>${job.location}</td>
        <td>${hasPageLoaded.current && (job.employeeName ? job.employeeName.name : 'Not Assigned')}</td>
      </tr>`
    )).join('');
    
    html += '</table>';

    html +=
      '<div style="text-align: center; font-size: 16px; font-weight: bold; margin-top: 20px;">' +
      '  Today Total Number of Job Appointments: ' + data.length +
      '</div>';

    return html;
  };



  return (
    <div>
      <AdminHeader pageName={"Job List"} />
      <Button variant="primary" onClick={handleDownloadPDF} style={{ marginLeft: '10px', backgroundColor: '#00adb4' }}>Download PDF</Button>

      <Container className="mt-4">
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
                <td>{job.serviceType.service_name}</td>
                <td>{formatDate(job.date)} , {job.time}</td>
                <td>{job.location}</td>
                <td>
                  <Form.Select value={employee[job._id] || ""} onChange={(e) => handleChange(e, job._id)}>
                    <option value="">Select Employee</option>
                    {availableConsEmp.map(emp => (
                      <option key={emp._id} value={emp._id}>{emp.name}</option>
                    ))}
                  </Form.Select>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        <div className="col-12">
          <div className="row">
            <div className="col-12 text-center mb-3">
              <span className="fw-bold">Today Total Number of Job Appointments: {data.length}</span>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default AssignJobs;
