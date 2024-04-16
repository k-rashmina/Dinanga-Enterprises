import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import EmployeeApiService from "./EmployeeServices";

const EmployeeDashboard = () => {
  const [employeeData, setEmployeeData] = useState([]);
  const [newPassword, setNewPassword] = useState('');
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  useEffect(() => {
    handleGetEmployeeDetails();
  }, []);

  const handleGetEmployeeDetails = async () => {
    const response = await EmployeeApiService.getEmployees();
    setEmployeeData(response);
  };

  const deleteEmployeeDetails = async (id) => {
    await EmployeeApiService.deleteEmployee(id);
    setEmployeeData(employeeData.filter((employee) => employee._id !== id));
  };

  const handleEditClick = (employee) => {
    setSelectedEmployee(employee);
    setShowEditModal(true);
  };

  const handleSaveChanges = async () => {
    try {
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

  return (
    <div>
      <h2 className="text-center mb-4">Employee Dashboard</h2>
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

      {/* Edit Employee Modal */}
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
                value={selectedEmployee?.name}
                onChange={(e) =>
                  setSelectedEmployee({
                    ...selectedEmployee,
                    name: e.target.value
                  })
                }
              />
            </Form.Group>
            
            <Form.Group controlId="formContactNumber">
              <Form.Label>Contact Number</Form.Label>
              <Form.Control
                type="text"
                value={selectedEmployee?.contactNumber}
                onChange={(e) =>
                  setSelectedEmployee({
                    ...selectedEmployee,
                    contactNumber: e.target.value
                  })
                }
              />
            </Form.Group>
            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={selectedEmployee?.email}
                onChange={(e) =>
                  setSelectedEmployee({
                    ...selectedEmployee,
                    email: e.target.value
                  })
                }
              />
            </Form.Group>
            <Form.Group controlId="formAddress">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                value={selectedEmployee?.address}
                onChange={(e) =>
                  setSelectedEmployee({
                    ...selectedEmployee,
                    address: e.target.value
                  })
                }
              />
            </Form.Group>
            <Form.Group controlId="formUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                value={selectedEmployee?.username}
                onChange={(e) =>
                  setSelectedEmployee({
                    ...selectedEmployee,
                    username: e.target.value
                  })
                }
              />
            </Form.Group>
            <Form.Group controlId="formPassword">
              <Form.Label>New Password</Form.Label>
              <Form.Control
                type="text" 
                value={newPassword}
                onChange={(e) =>
                  setSelectedEmployee({
                    ...selectedEmployee,
                    password: e.target.value ? e.target.value : selectedEmployee.newPassword
                  })
                }
              />
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
