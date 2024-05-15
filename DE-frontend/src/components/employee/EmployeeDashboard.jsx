import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Alert } from "react-bootstrap";
import EmployeeApiService from "./EmployeeServices";
import { Navbar, Nav, Container } from "react-bootstrap";
import SupLogo from "../../assets/DELogo.png";

const EmployeeDashboard = () => {
  const [employeeData, setEmployeeData] = useState([]);
  const [empDetails,setEmpDetails] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [newPassword, setNewPassword] = useState('');
  const [showEditModal, setShowEditModal] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    handleGetEmployeeDetails();
  }, []);

  const handleSearch = (e) =>{
    const { name, value } = e.target;
    const filteredEmployees = empDetails.filter(employee =>
      employee.name.toLowerCase().includes(value.toLowerCase())
  );
  setEmployeeData(filteredEmployees)
    console.log(employeeData)
  }

  const handleGetEmployeeDetails = async () => {
    const response = await EmployeeApiService.getEmployees();
    setEmployeeData(response);
    setEmpDetails(response)

  };

  const deleteEmployeeDetails = async (id) => {
    await EmployeeApiService.deleteEmployee(id);
    setEmployeeData(employeeData.filter((employee) => employee._id !== id));
  };

  const handleEditClick = (employee) => {
    setSelectedEmployee(employee);
    setShowEditModal(true);
  };

  const validateField = (name, value) => {
    let fieldErrors = { ...errors };

    //Validations
    switch (name) {
      case "name":
        //Name validation (only letters)
        const namePattern = /^[a-zA-Z\s]+$/;
        if (!value.match(namePattern)) {
          fieldErrors.name = "Name can only contain letters.";
        } else {
          delete fieldErrors.name;
        }
        break;
      case "contactNumber":
        //Contact number validation
        const contactNumberPattern = /^0\d{9}$/;
        if (!value.match(contactNumberPattern)) {
          fieldErrors.contactNumber = "Contact number must start with 0 and be exactly 10 digits long.";
        } else {
          delete fieldErrors.contactNumber;
        }
        break;
      case "email":
        //Email validation
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value.match(emailPattern)) {
          fieldErrors.email = "Invalid email address.";
        } else {
          delete fieldErrors.email;
        }
        break;
      case "address":
        //Add address validation
        if (!value) {
          fieldErrors.address = "Address is required.";
        } else {
          delete fieldErrors.address;
        }
        break;
      case "username":
        //Add username validation
        if (!value) {
          fieldErrors.username = "Username is required.";
        } else {
          delete fieldErrors.username;
        }
        break;
      case "password":
        //Password validation
        if (value.length < 8) {
          fieldErrors.password = "Password must be at least 8 characters long.";
        } else {
          delete fieldErrors.password;
        }
        break;
      default:
        break;
    }

    setErrors(fieldErrors);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setSelectedEmployee((prev) => ({
      ...prev,
      [name]: value,
    }));

    validateField(name, value);
  };

  const handleSaveChanges = async () => {
    try {
      let isValid = true;
      for (let key in selectedEmployee) {
        validateField(key, selectedEmployee[key]);
        if (errors[key]) {
          isValid = false;
        }
      }

      if (!isValid) {
        alert("Please fix the validation errors before saving.");
        return;
      }

      await EmployeeApiService.updateEmployee(selectedEmployee);
      const updatedData = employeeData.map((employee) => {
        if (employee._id === selectedEmployee._id) {
          return selectedEmployee;
        }
        return employee;
      });
      setEmployeeData(updatedData);
      setShowEditModal(false);
    } catch (error) {
      console.error("Error updating employee:", error);
    }
  };
  

  //PDF Generation
  const handleDownloadPDF = () => {

    printPDF();
  };

  //Function to print the interface as a PDF
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
      '<h1 style="text-align: center; font-size: 24px;">Employee Report</h1>';
    
    html +=
      '<table border="1" style="width: 80%; margin: 0 auto; text-align: center;">' +
      '<tr>' +
      '<th>#</th>' +
      '<th>Employee Name</th>' +
      '<th>Contact Number</th>' +
      '<th>Email Address</th>' +
      '<th>Address</th>' +
      '<th>Department</th>' +
      '<th>Availability</th>' +
      '</tr>';
    
    html += employeeData.map((employee, index) => (
      `<tr key=${index + employee._id}>
        <td>${index + 1}</td>
        <td>${employee.name}</td>
        <td>${employee.contactNumber}</td>
        <td>${employee.email}</td>
        <td>${employee.address}</td>
        <td>${employee.department}</td>
        <td>${employee.availability ? 'Available' : 'Not-available'}</td>
      </tr>`
    )).join('');
    
    html += '</table>';
  
    return html;
  };

  

  return (
    <div>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="#"><h2><b>Employee Dashboard</b></h2></Navbar.Brand>
          <Nav className="ml-auto">
          <input
            type="text"
            className="form-control"
            placeholder="Search Employee"
            aria-label="Search"
            onChange={handleSearch}
          />
          </Nav>
        </Container>
      </Navbar>
      <h2 className="text-center mb-4"></h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Employee Name</th>
            <th scope="col">Contact Number</th>
            <th scope="col">Email Address</th>
            <th scope="col">Address</th>
            <th scope="col">Department</th>
            <th scope="col">Availability</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {employeeData?.map((employee, index) => {
            return (
              <tr key={index + employee._id}>
                <th scope="row">{index + 1}</th>
                <td>{employee.name}</td>
                <td>{employee.contactNumber}</td>
                <td>{employee.email}</td>
                <td>{employee.address}</td>
                <td>{employee.department}</td>
                <td>{employee.availability ? "Available" : "Not-available"}</td>
                <td>
                  <button
                    onClick={() => handleEditClick(employee)}
                    className="btn btn-primary"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteEmployeeDetails(employee._id)}
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <Button variant="primary" onClick={handleDownloadPDF} style={{ marginRight: '10px',backgroundColor:'#00adb4'}}>Download PDF</Button>

      {/*Edit Employee Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Employee</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formFirstName">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={selectedEmployee?.name}
                onChange={handleChange}
                isInvalid={!!errors.name}
                required
              />
              <Form.Control.Feedback type="invalid">
                {errors.name}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formContactNumber">
              <Form.Label>Contact Number</Form.Label>
              <Form.Control
                type="number"
                name="contactNumber"
                value={selectedEmployee?.contactNumber}
                onChange={handleChange}
                isInvalid={!!errors.contactNumber}
                required
              />
              <Form.Control.Feedback type="invalid">
                {errors.contactNumber}
              </Form.Control.Feedback>
            </Form.Group>
            
            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={selectedEmployee?.email}
                onChange={handleChange}
                isInvalid={!!errors.email}
                required
              />
              <Form.Control.Feedback type="invalid">
                {errors.email}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formAddress">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                name="address"
                value={selectedEmployee?.address}
                onChange={handleChange}
                isInvalid={!!errors.address}
                required
              />
              <Form.Control.Feedback type="invalid">
                {errors.address}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                name="username"
                value={selectedEmployee?.username}
                onChange={handleChange}
                isInvalid={!!errors.username}
                required
              />
              <Form.Control.Feedback type="invalid">
                {errors.username}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formPassword">
              <Form.Label>New Password</Form.Label>
              <Form.Control
                type="text"
                name="password"
                value={newPassword}
                onChange={(e) => {
                  setNewPassword(e.target.value);
                  handleChange(e);
                }}
                isInvalid={!!errors.password}
                required
              />
              <Form.Control.Feedback type="invalid">
                {errors.password}
              </Form.Control.Feedback>
            </Form.Group>
          </Form>
          
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveChanges}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default EmployeeDashboard;
