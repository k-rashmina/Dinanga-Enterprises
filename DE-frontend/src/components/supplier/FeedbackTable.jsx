import React from 'react';
import { Container, Table, Button, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './FeedbackTable.css';

const SupplierfeedbackTable = () => {
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
                <tr>
                  <td align="center">{'cus'}</td>
                  <td align="center">{'cus'}</td>
                  <td align="center">{'cus'}</td>
                  <td align="center">
                    <Button variant="info" size="sm" className="action-button edit-button">
                      <i className="bi bi-pencil-square"></i>Edit
                    </Button>
                    <Button variant="danger" size="sm" className="action-button delete-button">
                      <i className="bi bi-trash"></i>Delete
                    </Button>
                  </td>
                </tr>
              </tbody>
            </Table>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default SupplierfeedbackTable;
