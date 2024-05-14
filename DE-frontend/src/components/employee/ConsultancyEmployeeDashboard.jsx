import React, { useState, useEffect, useRef } from "react";
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
import axios from "axios";
import EmployeeApiService from "./EmployeeServices";
import EmployeeNavBar from "./EmployeeNavBar";

const ConsultancyEmployeeDashboard = () => {
  const loggedEmp = localStorage.getItem("emp_id");
  const [formData, setFormData] = useState({
    fullName: "",
    contactNumber: "",
    email: "",
    address: "",
    username: ""
  });
  const [issueInfo, setIssueInfo] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [selectedService, setSelectedService] = useState("");
  const [comment, setComment] = useState("");
  const [isDone, setIsDone] = useState(false);
  const hasPageLoaded = useRef(false);
  const doneConsultancy = useRef({});
  const [updateState, setUpdateState] = useState(false);

  const handleIssueButtonClick = (row) => {
    setIssueInfo(row);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleServiceSelection = (row, service) => {
    row.jobService = service.service_name;
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleAddComment = () => {
    issueInfo.respond = comment;
    alert("comment added");

    setComment("");
  };

  const handleDoneButtonClick = (row) => {
    if (row.jobService && row.respond) {
      hasPageLoaded.current = true;
      doneConsultancy.current = row;
      setIsDone((prev) => !prev);
      // setStatus("Completed");
    } else {
      alert("Please enter a comment and a job service");
    }
  };

  //use effect for consultancy update
  useEffect(() => {
    if (hasPageLoaded.current) {
      if (confirm("Confirm Consultancy Completion")) {
        axios
          .put(
            `http://localhost:4000/consultantAppointment/updaterespond/${doneConsultancy.current._id}`,
            {
              jobService: doneConsultancy.current.jobService,
              assignedEmployee: doneConsultancy.current.assignedEmployee,
              respond: doneConsultancy.current.respond,
              status: "done"
            }
          )
          .then(() => {
            console.log("Elakiri");
            doneConsultancy.current = {};
            setUpdateState((prev) => !prev);
          })
          .catch((err) => {
            console.log(err); // Log error to console for debugging
            alert("Error occurred while adding employee");
          });
      }
    }
  }, [isDone]);

  const [rows, setRows] = useState([]);

  useEffect(() => {
    axios
      .get(
        `http://localhost:4000/consultantAppointment/getemployeeread?empid=${loggedEmp}`
      )
      .then((res) => {
        setRows(res.data);
      });
  }, [updateState]);

  const [ServiceOptions, setServiceOptions] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:4000/getjobservices")
      .then((res) => setServiceOptions(res.data));
    fetchEmployeeInfo();
  }, []);

  const fetchEmployeeInfo = async () => {
    try {
      const response = await EmployeeApiService.getEmployeeDetails(loggedEmp);
      if (response) {
        setFormData({
          fullName: response.name,
          contactNumber: response.contactNumber,
          email: response.email,
          address: response.address,
          username: response.username
        });
      }
    } catch (error) {
      console.error("Failed to fetch employee info:", error);
    }
  };

  console.log(rows);

  return (
    <React.Fragment>
      <EmployeeNavBar fullName={formData.fullName} />
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
                <th style={{ fontWeight: "bold" }}>Consultant Number</th>
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
                  <td>{row.consultantNumber}</td>
                  <td>{row.Email}</td>
                  <td>{row.location}</td>
                  <td>
                    <Button
                      variant="info"
                      onClick={() => handleIssueButtonClick(row)}
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
                        {ServiceOptions.map((service, serviceIndex) => (
                          <Dropdown.Item
                            key={serviceIndex}
                            onClick={() => handleServiceSelection(row, service)}
                          >
                            {service.service_name}
                          </Dropdown.Item>
                        ))}
                      </Dropdown.Menu>
                    </Dropdown>
                  </td>

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

        {/*Modal for Issue Button */}
        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Issue Information</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>{issueInfo.Issue}</p>

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
    </React.Fragment>
  );
};

export default ConsultancyEmployeeDashboard;
