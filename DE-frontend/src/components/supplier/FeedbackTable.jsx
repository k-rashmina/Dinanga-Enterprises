import React, { useEffect, useRef } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Table, Button, Row, Col, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './FeedbackTable.css';
import axios from 'axios';


const SupplierfeedbackTable = () => {

  const loggedSupplier = localStorage.getItem('loggedSup');

  const [fedDetails, setFedDetails] = useState([]);
  const [editingIndex, setEditingIndex] = useState(-1);
  const [editedSubject, setEditedSubject] = useState('');
  const [editedMessage, setEditedMessage] = useState('');
  const [editedId, setEditedId] = useState('');
  const [updateSubmit, setUpdateSubmit] = useState(false);
  const hasPageLoaded = useRef(false);
  const [hasupdated, setHasUpdated] = useState(false);

  useEffect(() => {
    axios.get(`http://localhost:5000/supFeedback/readsupplierfeedbacks?supemail=${loggedSupplier}`)
    .then(res => setFedDetails(res.data))
    .catch(console.log('loading'))
  }, [hasupdated])

  const handleEdit = (index, id, subject, message) => {
    setEditingIndex(index);
    setEditedId(id);
    setEditedSubject(subject);
    setEditedMessage(message);
  }



  useEffect(() => {

    if(hasPageLoaded.current){

      const data = {
        _id: editedId,
        Supplier_Message: editedMessage,
        Supplier_Subject: editedSubject
      }
      
      axios.put(`http://localhost:5000/supFeedback/upsupplierfeedbacks`, data).then(res => {
        hasPageLoaded.current = false;
        setEditingIndex(-1);
        setEditedSubject('');
        setEditedMessage('');
        alert("Feedback Updated");
        setHasUpdated(prev => !prev);
      }).catch((err) => {
        alert("Update Unsuccessful");
      })

    }

  }, [updateSubmit])

  const handleCancelEdit = () => {
    setEditingIndex(-1);
    setEditedSubject('');
    setEditedMessage('');
  }

  const handleSubjectChange = (event) => {
    setEditedSubject(event.target.value);
  }

  const handleMessageChange = (event) => {
    setEditedMessage(event.target.value);
  }

  const handleSubmitEdit = (index) => {
    // Handle submit action, e.g., send edited data to backend
    hasPageLoaded.current = true;
    setUpdateSubmit(prev => !prev);
    // setEditingIndex(-1);
    // setEditedSubject('');
    // setEditedMessage('');
  }


  const handleDelete = (id) => {
    

    axios.delete(`http://localhost:5000/supFeedback/delsupplierfeedbacks?id=${id}`).then(res => {
      alert("Feedback Deleted Successfully");
      setHasUpdated(prev => !prev);
    })

  }

  const tableElems = fedDetails.map((feedback, index) => {
    if (index === editingIndex) {
      return (
        <tr key={index}>
          <td align="center">{feedback.fed_date.substring(0, 10)}</td>
          <td align="center">
            <Form.Control type="text" value={editedSubject} onChange={handleSubjectChange} />
          </td>
          <td align="center">
            <Form.Control as="textarea" rows={3} value={editedMessage} onChange={handleMessageChange} />
          </td>
          <td align="center">
            <Button variant="success" size="sm" className="action-button submit-button" onClick={() => handleSubmitEdit(index)}>Submit</Button>
            <Button variant="secondary" size="sm" className="action-button cancel-button" onClick={handleCancelEdit}>Cancel</Button>
          </td>
        </tr>
      );
    } else {
      return (
        <tr key={index}>
          <td align="center">{feedback.fed_date.substring(0, 10)}</td>
          <td align="center">{feedback.Supplier_Subject}</td>
          <td align="center">{feedback.Supplier_Message}</td>
          <td align="center">
            <Button variant="info" size="sm" className="action-button edit-button" onClick={() => handleEdit(index, feedback._id, feedback.Supplier_Subject, feedback.Supplier_Message)}>
              <i className="bi bi-pencil-square"></i>Edit
            </Button>
            <Button variant="danger" size="sm" className="action-button delete-button" onClick={() => handleDelete(feedback._id)}>
              <i className="bi bi-trash"></i>Delete
            </Button>
          </td>
        </tr>
      );
    }
  });

  return (
    <Container fluid className="supplier-feedback-container">
      <Row className="justify-content-center">
        <Col xs={12} md={10} lg={20}>
          <h3 className="feedback-header">Feedback History</h3>
          <div className="feedback-table-container">
            <Table bordered hover responsive className="feedback-table">
              <thead>
                <tr className="table-header-row">
                  <th><center>Date</center></th>
                  <th><center>Subject</center></th>
                  <th><center>Message</center></th>
                  <th><center>Action</center></th>
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
