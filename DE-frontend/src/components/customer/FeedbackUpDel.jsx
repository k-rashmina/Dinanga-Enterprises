import React, { useRef, useState, useEffect } from 'react';
import { Container, Table, Button, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import axios from "axios";
import "./CustomerRegForm.css";

const FeedbackUpDel = () => {
  const loggedUser = localStorage.getItem('loggedUser');

  const [records, setRecords] = useState([]);
  const [editedSubject, setEditedSubject] = useState('');
  const [editedMessage, setEditedMessage] = useState('');
  const [editId, setEditId] = useState(null);
  const [getterValue, setGetterValue] = useState(false);

  useEffect(() => {
    axios.get(`http://localhost:5000/cusfeedback/readcustomerfeedbacks?cusemail=${loggedUser}`)
      .then(res => {
        setRecords(res.data);
      })
      .catch(err => alert('No Feedbacks'));
  }, [getterValue]);

  const handleDelete = (e) => {
    const confirmVal = window.confirm('Are you sure?');
    const idToDelete = e.currentTarget.id;
    if (confirmVal) {
      axios.delete(`http://localhost:5000/cusfeedback/delcustomerfeedbacks?id=${idToDelete}`)
        .then(() => {
          setGetterValue(prev => !prev); // Reload data
        })
        .catch(err => console.log(err));
    }
  };

  const handleEdit = (id, subject, message) => {
    setEditId(id);
    setEditedSubject(subject);
    setEditedMessage(message);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'subject') {
      setEditedSubject(value);
    } else if (name === 'message') {
      setEditedMessage(value);
    }
  };

  const handleCancelEdit = () => {
    setEditId(null);
    setEditedSubject('');
    setEditedMessage('');
  };

  const handleSubmit = (id) => {
    axios.put(`http://localhost:5000/cusfeedback/upcustomerfeedbacks`, {
      _id: id,
      cusEmail: loggedUser,
      feedbackSub: editedSubject,
      feedbackMsg: editedMessage
    })
    .then(() => {
      setEditId(null);
      setEditedSubject('');
      setEditedMessage('');
      setGetterValue(prev => !prev); 
      alert("Sucessfull");
    })
    .catch(err => console.log(err));
  };

  return (
    <Container fluid style={{ padding: '16px', backgroundColor: '#fff', minHeight: '100vh' }}>
      <Row className="justify-content-center">
        <Col xs={12} md={12}>
          <h4 style={{ color: '#00ADB5', textAlign: 'center', fontWeight: 'bold', marginBottom: '20px' }}>Previous Feedback</h4>
          <div style={{ borderRadius: '20px', overflow: 'hidden' }}>
            <Table bordered hover responsive>
            <thead>
              <tr style={{ backgroundColor: '#00ADB5', color: 'white' }}>
                <th style={{ textAlign: 'center' }}>Date</th>
                <th style={{ textAlign: 'center' }}>Subject</th>
                <th style={{ textAlign: 'center' }}>Message</th>
                <th style={{ textAlign: 'center' }}>Action</th>
              </tr>
            </thead>

              <tbody>
                {records.map((row, index) => (
                  <tr key={index}>
                    <td align="center"> {row.createdAt.substring(0,10)}</td>
                    <td style={{ maxWidth: '200px', wordWrap: 'break-word' }} align="center">
                      {editId === row._id ?
                        <input type="text" name="subject" value={editedSubject} onChange={handleInputChange} /> :
                        row.feedbackSub
                      }
                    </td>
                    <td style={{ maxWidth: '200px', wordWrap: 'break-word' }} align="center">
                      {editId === row._id ?
                        <textarea rows={3} name="message" value={editedMessage} onChange={handleInputChange} /> :
                        row.feedbackMsg
                      }
                    </td>
                    <td align="center">
                      {editId === row._id ?
                        <>
                          <Button variant="success" size="sm" onClick={() => handleSubmit(row._id)}><i className="bi bi-check"></i>Submit</Button>
                          <Button variant="secondary" size="sm" onClick={handleCancelEdit}><i className="bi bi-x"></i>Cancel</Button>
                        </> :
                        <>
                          <Button variant="primary" size="sm" onClick={() => handleEdit(row._id, row.feedbackSub, row.feedbackMsg)}><i className="bi bi-pencil-square"></i>Edit</Button>
                          <Button id={row._id} variant="danger" size="sm" onClick={handleDelete}> <i className="bi bi-trash"></i>Delete</Button>
                        </>
                      }
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default FeedbackUpDel;
