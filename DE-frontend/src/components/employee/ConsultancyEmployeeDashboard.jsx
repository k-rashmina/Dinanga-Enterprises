import React, { useState } from "react";
import {
  Container,
  Table,
  Dropdown,
  Modal,
  Form,
  Button
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const rows = [
  {
    customerName: "John Doe",
    customerContactNumber: "123-456-7890",
    location: "123 Main St, City",
    issue: "Battery Replacement",
    availableJobServices: ["Oil Change", "Tire Rotation", "Brake Inspection"],
    status: "Pending"
  }
];

const ConsultancyEmployeeDashboard = () => {
  const [issueInfo, setIssueInfo] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedService, setSelectedService] = useState("");
  const [comment, setComment] = useState(""); 
  const [isDone, setIsDone] = useState(false); 


  const handleIssueButtonClick = (issue) => {
    setIssueInfo(issue);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleServiceSelection = (service) => {
    setSelectedService(service);
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleAddComment = () => {
    console.log("Adding comment:", comment);
  

    setComment(""); 
  };

  const handleDoneButtonClick = () => {
    setIsDone(true); 
    setStatus("Completed"); 
  };

  return (
    <Container
      fluid
      style={{ padding: "16px", backgroundColor: "#fff", minHeight: "100vh" }}
    >
      <h4
        style={{
          color: "black",
          textAlign: "center",
          fontWeight: "bold",
          marginBottom: "20px"
        }}
      >
        Consultancy Employees
      </h4>
      <div style={{ borderRadius: "20px", overflow: "hidden" }}>
        <Table bordered hover responsive style={{ marginBottom: "0" }}>
          <thead>
            <tr style={{ backgroundColor: "#d9d9d9", color: "black" }}>
              <th style={{ fontWeight: "bold" }}>Customer Name</th>
              <th style={{ fontWeight: "bold" }}>Customer Contact</th>
              <th style={{ fontWeight: "bold" }}>Location</th>
              <th style={{ fontWeight: "bold" }}>Issue</th>
              <th style={{ fontWeight: "bold" }}>Available Job Services</th>
              <th style={{ fontWeight: "bold" }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={index}>
                <td>{row.customerName}</td>
                <td>{row.customerContactNumber}</td>
                <td>{row.location}</td>
                <td>
                  <Button
                    variant="info"
                    onClick={() => handleIssueButtonClick(row.issue)}
                  >
                    View Issue
                  </Button>
                </td>
                <td>
                  <Dropdown>
                    <Dropdown.Toggle
                      variant="secondary"
                      id={`dropdown-services-${index}`}
                    >
                      {selectedService || "Select Service"}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      {row.availableJobServices.map((service, serviceIndex) => (
                        <Dropdown.Item
                          key={serviceIndex}
                          onClick={() => handleServiceSelection(service)}
                        >
                          {service}
                        </Dropdown.Item>
                      ))}
                    </Dropdown.Menu>
                  </Dropdown>
                </td>
                
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

      {/*Modal for Issue Button */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Issue Information</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{issueInfo}</p>
          
          <Form.Group controlId="comment">
            <Form.Label>Comment:</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={comment}
              onChange={handleCommentChange}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleAddComment}>
            Add Comment
          </Button>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default ConsultancyEmployeeDashboard;
