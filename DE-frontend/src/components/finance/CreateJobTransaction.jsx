import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Form, Button, Image } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import FormImg from '../../assets/jobs and services appointment image.png';
import axios from "axios";

const CreateJobTransaction = () => {

  const nav = useNavigate();

  const date = new Date().toJSON();
  const today = date.substring(0, 10);
  
  const createdJob = JSON.parse(localStorage.getItem('createdJob'));
  console.log(createdJob)

  const [subVal, setSubVal] = useState(false);
  const [transactionDetails, setTransactionDetails] = useState({
    status: createdJob.paymentStatus,
    amount: {
      job_amt: createdJob.serviceType.charge,
      tax_amt: createdJob.serviceType.charge * 18 / 100.0,
      tot_amount: (createdJob.serviceType.charge * 18 / 100.0) + createdJob.serviceType.charge
    },
    ref_id: createdJob._id,
    desc: 'Sales Transaction',
    transact_type: 'online',
    create_date: today,
    update_date: today,
    pay_date: today,
    pay_type: 'cash',
    model_type: 'jobAppointment'
  });


  const handlePaytype = (e) => {
    const {name, value} = e.target;
    setTransactionDetails(prevState => {
      return{
        ...prevState,
        [name]: value
      }
    })

  }

  const handleSubmit =  () => {
  
    // setSubVal(true);
     axios.post(`http://localhost:5000/transaction/addjobtransaction`, transactionDetails)
      .then(res => {
        alert(res.data);
        nav('/jobCustomer')
      })
      // .catch(alert('Please try again'))

  }

  // useEffect(() => {

  //   if(subVal){
  //     axios.post(`http://localhost:5000/transaction/addjobtransaction`, transactionDetails)
  //     .then(res => alert(res.data))
  //     .catch(alert('Please try again'))
  //   }

  // }, [subVal])

  // const [createdJob, setCreatedJob] = useState(null);

  // useEffect(() => {
  //   setCreatedJob(localStorage.getItem('createdJob'));
  //   console.log('hi: ', createdJob.date)
  // }, [])

  return (
    <div>
        <div className='d-flex justify-content-center' style={{width: '100%', height: '10 0%', backgroundColor: '#191B1A' , overflow: 'auto'}}>
            <div className='mt-5 mb-5 rounded-4 pt-4 ps-4 pe-4' style={{width: '760px', height: '1100px', backgroundColor: '#EEEEEE', position: 'relative'}}>
              <center><h2>Transaction Details</h2></center>
              <h3 className="mb-4 ms-3 mt-4" style={{color: '#00ADB5'}}>Job Summary</h3>
              
              <div className="d-flex justify-content-between ms-5 me-5 pb-3 pt-3 border-bottom border-dark border-2 border-opacity-25">
                <h5>Job Number</h5>
                <h5>{createdJob.jobNumber}</h5>
              </div>

              <div className="d-flex justify-content-between ms-5 me-5 pb-3 pt-3 border-bottom border-dark border-2 border-opacity-25">
                <h5>Status</h5>
                <h5>{createdJob.status}</h5>
              </div>

              <div className="d-flex justify-content-between ms-5 me-5 pb-3 pt-3 border-bottom border-dark border-2 border-opacity-25">
                <h5>Service Name</h5>
                <h5>{createdJob.serviceType.service_name}</h5>
              </div>

              <div className="d-flex justify-content-between ms-5 me-5 pb-3 pt-3 border-bottom border-dark border-2 border-opacity-25">
                <h5>Job Amount</h5>
                <h5>{`LKR ${createdJob.serviceType.charge.toFixed(2)}`}</h5>
              </div>
              <h3 className="mb-4 ms-3 mt-4" style={{color: '#00ADB5'}}>Payment Summary</h3>
              <div className="d-flex justify-content-between ms-5 me-5 pb-3 pt-3 border-bottom border-dark border-2 border-opacity-25">
                <h5>Payment Status</h5>
                <h5>{createdJob.paymentStatus}</h5>
              </div>

              <div className="d-flex justify-content-between ms-5 me-5 pb-3 pt-3 border-bottom border-dark border-2 border-opacity-25">
                <h5>Job Amount</h5>
                <h5>{`LKR ${createdJob.serviceType.charge.toFixed(2)}`}</h5>
              </div>

              <div className="d-flex justify-content-between ms-5 me-5 pb-3 pt-3 border-bottom border-dark border-2 border-opacity-25">
                <h5>Tax Percentage</h5>
                <h5>18%</h5>
              </div>

              <div className="d-flex justify-content-between ms-5 me-5 pb-3 pt-3 border-bottom border-dark border-2 border-opacity-25">
                <h5>Tax Amount</h5>
                <h5>{`LKR ${(createdJob.serviceType.charge * 18 / 100.0).toFixed(2)}`}</h5>
              </div>

              <div className="d-flex justify-content-between ms-5 me-5 pb-3 pt-3 border-bottom border-dark border-2 border-opacity-25">
                <h5>Total Amount</h5>
                <h5>{`LKR ${((createdJob.serviceType.charge * 18 / 100.0) + createdJob.serviceType.charge).toFixed(2)}`}</h5>
              </div>

              <div className="d-flex justify-content-between ms-5 me-5 pb-3 pt-3 border-bottom border-dark border-2 border-opacity-25">
                <label className="fs-5 fw-semibold">Payment Type</label>
                <select className='filter-input rounded-2' name='pay_type' value={transactionDetails.pay_type} onChange={handlePaytype}>
                  <option value={'cash'}>Cash</option>
                  <option value={'transfer'}>Bank Transafer</option>
                </select>
              </div>

              <center><button className='form-button fs-5' style={{marginTop: '80px', width: '90%'}} onClick={handleSubmit}>Submit</button></center>

            </div>
        </div>
    </div>
  );
};

export default CreateJobTransaction;
