import React, { useRef } from 'react';
import { Container, Table, Button, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import {useState} from 'react';
import { useEffect } from 'react';
import axios from "axios";


const FeedbackUpDel = () => {

  const [records, setRecords] = useState([])
  const [getterValue, setGetterValue] = useState(false);
  useEffect(()=>{
    axios.get("http://localhost:5000/cusfeedback/readcustomerfeedbacks")
  .then(res => {
    setRecords(res.data);
  })
  .catch(err=> console.log(err));
  }, [getterValue])


//Handling delete of feedbacks
  let deleteId = useRef();
  const [delVal, setDelVal] = useState(false);
  const handleDelete = (e) => {
    const confirmVal = confirm('Are you sure?');
    deleteId.current = e.target.id;
    console.log(confirmVal)
    if(confirmVal == true) {setDelVal(prev => !prev)}

  }
  console.log('del Val', delVal)
  console.log('delID', deleteId.current)
  //API call for delete
  useEffect(() => {

    if(deleteId.current){
      axios.delete(`http://localhost:5000/cusfeedback/delcustomerfeedbacks?id=${deleteId.current}`)
      .then((res) => {
        console.log(res.data)
        setGetterValue(prev => !prev);
      })
    }

  }, [delVal])


  return (
    <Container fluid style={{ padding: '16px', backgroundColor: '#fff', minHeight: '100vh' }}>
      <Row className="justify-content-center">
        <Col xs={12} md={12}>
          <h4 style={{ color: 'black', textAlign: 'center', fontWeight: 'bold', marginBottom: '20px' }}>Previous Feedback</h4>
          <div style={{ borderRadius: '20px', overflow: 'hidden' }}>
            <Table bordered hover responsive style={{ marginBottom: '0' }} >
              <thead>
                <tr style={{ backgroundColor: '#d9d9d9', color: 'black' }}>
                  <th style={{ fontWeight: 'bold', textAlign: 'center' }}>Date</th>
                  <th style={{ fontWeight: 'bold', textAlign: 'center' }}>Subject</th>
                  <th style={{ fontWeight: 'bold', textAlign: 'center' }}>Message</th>
                  <th style={{ fontWeight: 'bold', textAlign: 'center' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {records.map((row, index)=>(
                <tr key={index}>
                  <td  align="center">{new Date().toLocaleDateString()}</td>
                  <td style={{maxWidth: '200px', wordWrap: 'break-word'}} align="center" >{row.feedbackSub}</td>
                  <td style={{maxWidth: '200px', wordWrap: 'break-word'}} align="center">{row.feedbackMsg}</td>
                  <td align="center">
                    <Button key={index} variant="primary" size="sm" style={{ margin: '2px', backgroundColor: '#00adb4' }}>
                      <i className="bi bi-pencil-square"></i>Edit
                    </Button>
                    <Button id={row._id} variant="danger" size="sm" style={{ margin: '2px' }} onClick={handleDelete}>
                      <i className="bi bi-trash"></i>Delete
                    </Button>
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
