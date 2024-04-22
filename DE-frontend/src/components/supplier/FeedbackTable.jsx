import React, { useEffect, useRef } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Table, Button, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './FeedbackTable.css';
import axios from 'axios';

const SupplierfeedbackTable = () => {

  const loggedSupplier = 'dunithpvt@gmail.com';

  const [fedDetails, setFedDetails] = useState([]);

  useEffect(() => {

    axios.get(`http://localhost:5000/supFeedback/readsupplierfeedbacks?supemail=${loggedSupplier}`)
    .then(res => setFedDetails(res.data))
    .catch(console.log('loading'))

  }, [])


  const tableElems = fedDetails.map(feedback => {

    return(

        <tr>
          <td align="center">{feedback.fed_date.substring(0, 10)}</td>
          <td align="center">{feedback.Supplier_Subject}</td>
          <td align="center">{feedback.Supplier_Message}</td>
          <td align="center">
            <Button variant="info" size="sm" className="action-button edit-button">
              <i className="bi bi-pencil-square"></i>Edit
            </Button>
            <Button variant="danger" size="sm" className="action-button delete-button">
              <i className="bi bi-trash"></i>Delete
            </Button>
          </td>
        </tr>

    )

  })

  return (
    <Container fluid className="supplier-feedback-container">
      <Row className="justify-content-center">
        <Col xs={12} md={10} lg={8}>
          <h3 className="feedback-header">Feedback History</h3>
          <div className="feedback-table-container">
            <Table bordered hover responsive className="feedback-table">
              <thead>
                <tr className="table-header-row">
                  <th>Date</th>
                  <th>Subject</th>
                  <th>Message</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {tableElems}
              </tbody>
            </Table>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default SupplierfeedbackTable;
