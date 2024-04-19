import React, { useRef, useState, useEffect } from 'react';
import { Container, Table, Button, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import axios from "axios";

const FeedbackUpDel = () => {
  const [records, setRecords] = useState([]);
  const [editedSubject, setEditedSubject] = useState('');
  const [editedMessage, setEditedMessage] = useState('');
  const [editId, setEditId] = useState(null);
  const [getterValue, setGetterValue] = useState(false);
  const [delVal, setDelVal] = useState(false); // Corrected typo here

  useEffect(() => {
    axios.get("http://localhost:5000/cusfeedback/readcustomerfeedbacks")
      .then(res => {
        setRecords(res.data);
      })
      .catch(err => console.log(err));
  }, [getterValue]);

  let deleteId = useRef();

  const handleDelete = (e) => {
    const confirmVal = window.confirm('Are you sure?');
    deleteId.current = e.target.id;
    console.log(confirmVal)
    if (confirmVal == true) { setDelVal(prev => !prev) }
  }

  useEffect(() => {
    if (deleteId.current) {
      axios.delete(`http://localhost:5000/cusfeedback/delcustomerfeedbacks?id=${deleteId.current}`)
        .then((res) => {
          console.log(res.data)
          setGetterValue(prev => !prev);
        })
    }
  }, [delVal])

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
    // Send edited data to backend
    setEditId(null);
    setEditedSubject('');
    setEditedMessage('');
    setGetterValue(prev => !prev); // Trigger data reload
  };

  return (
    <Container fluid style={{ padding: '16px', backgroundColor: '#fff', minHeight: '100vh' }}>
      <Row className="justify-content-center">
        <Col xs={12} md={12}>
          <h4 style={{ color: 'black', textAlign: 'center', fontWeight: 'bold', marginBottom: '20px' }}>Previous Feedback</h4>
          <div style={{ borderRadius: '20px', overflow: 'hidden' }}>
            <Table bordered hover responsive style={{ marginBottom: '0' }}>
              <thead>
                <tr style={{ backgroundColor: '#d9d9d9', color: 'black' }}>
                  <th style={{ fontWeight: 'bold', textAlign: 'center' }}>Date</th>
                  <th style={{ fontWeight: 'bold', textAlign: 'center' }}>Subject</th>
                  <th style={{ fontWeight: 'bold', textAlign: 'center' }}>Message</th>
                  <th style={{ fontWeight: 'bold', textAlign: 'center' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {records.map((row, index) => (
                  <tr key={index}>
                    <td align="center">{new Date().toLocaleDateString()}</td>
                    <td style={{ maxWidth: '200px', wordWrap: 'break-word' }} align="center">
                      {editId === row._id ?
                        <input
                          type="text"
                          name="subject"
                          value={editedSubject}
                          onChange={handleInputChange}
                        /> :
                        row.feedbackSub
                      }
                    </td>
                    <td style={{ maxWidth: '200px', wordWrap: 'break-word' }} align="center">
                      {editId === row._id ?
                        <textarea
                          rows={3}
                          name="message"
                          value={editedMessage}
                          onChange={handleInputChange}
                        /> :
                        row.feedbackMsg
                      }
                    </td>
                    <td align="center">
                      {editId === row._id ?
                        <>
                          <Button variant="success" size="sm" style={{ margin: '2px' }} onClick={() => handleSubmit(row._id)}>
                          <i className="bi bi-check"></i>Submit
                          </Button>
                          <Button variant="secondary" size="sm" style={{ margin: '2px' }} onClick={handleCancelEdit}>
                          <i className="bi bi-x"></i>Cancel
                          </Button>
                        </> :
                        <>
                          <Button variant="primary" size="sm" style={{ margin: '2px', backgroundColor: '#00adb4' }} onClick={() => handleEdit(row._id, row.feedbackSub, row.feedbackMsg)}>
                          <i className="bi bi-pencil-square"></i> Edit
                          </Button>
                          <Button id={row._id} variant="danger" size="sm" style={{ margin: '2px' }} onClick={handleDelete}>
                          <i className="bi bi-trash"></i>Delete
                          </Button>
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
