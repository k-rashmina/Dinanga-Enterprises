import React from "react";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import AdminHeader from "../common/AdminHeader";

export default function AddTransaction() {

//today
  const date = new Date().toJSON();
  const today = date.substring(0, 10);

//transaction fields state object
  const [transactionFields, setTransactionFields] = useState({
    transactType: 'addjobtransaction',
    status: 'pending',
    amount: '',
    ref_id: '',
    desc: '',
    create_date: today,
    pay_date: today,
  })

//transacton field errors state object
  const [formErrors, setFormErrors] = useState({})


//handling form inputs
  const handleInput = event => {
    const {id, value} = event.target;
    setTransactionFields(prevState => {
      return{
        ...prevState,
        [id]: value,
      }
    })

    validateTransactionFields();

  }


//clear form data function
  const clearFields = () => {
    setTransactionFields({
      transactType: 'addjobtransaction',
      status: 'success',
      amount: '',
      ref_id: '',
      desc: '',
      create_date: '',
    })
  }

//service options state object
  const [serviceOptions, setServiceOptions] = useState([]);

//service options elements
  const optionElems = serviceOptions.map(service => {
    return(
      <option key={service._id} value={service._id}>{service.service_name}</option>
    )
  })
  
//API call for getting service options
  useEffect(() => {

    axios.get('http://localhost:5000/getjobservices').then(res => setServiceOptions(res.data));

  }, [])


//function for getting the amount for the selected service option
  const taxRate = 18
  let serviceCharge;
  serviceOptions.forEach(service => {
    if(transactionFields.ref_id == service._id) {
      serviceCharge = service.charge
    }
    if(transactionFields.ref_id == ''){
      serviceCharge = ''
    }
  });
  let taxAmount = serviceCharge * taxRate / 100.0;




//handle submit function
  const [submitValue, setSubmitValue] = useState(false);

  const handleSubmit = event => {
    event.preventDefault();
    validateTransactionFields()
    console.log('count', Object.keys(formErrors).length == 0)
    if(Object.keys(formErrors).length == 0){
      hasPageLoaded.current = true;
      setSubmitValue(prevState => !prevState);
      
    }
  }

//API call for posting transaction
  const hasPageLoaded = useRef(false);

  useEffect(() => {

    if(hasPageLoaded.current == true){
      axios({
        method: 'post',
        url: `http://localhost:5000/transaction/addjobtransaction`,
        data: {
          status: transactionFields.status,
          amount: {
            job_amt: serviceCharge,
            tax_amt: taxAmount,
            tot_amount: serviceCharge + taxAmount
          },
          ref_id: transactionFields.ref_id,
          desc: transactionFields.desc,
          transact_type: 'offline',
          create_date: transactionFields.create_date,
          update_date: transactionFields.create_date,
          pay_date: transactionFields.create_date,
          model_type: 'services'
        }
      }).then(res => {
        alert(res.data);
        clearFields();
      })
    }


  }, [submitValue])

  // console.log(today > '2024-05-01')

//Validation function
  const validateTransactionFields = () => {

    const errors = {};

    if(!transactionFields.ref_id){
      errors.ref = 'Service type is required';
    }

    if(!transactionFields.create_date){
      errors.cdate = `Creation date is required`;
    }
    else if(transactionFields.create_date > today){
      errors.cdate = `Value must be ${today} or earlier`;
    }

    if(!transactionFields.pay_date){
      errors.pdate = `Payment date is required`;
    }else if(transactionFields.pay_date > today){
      errors.pdate = `Value must be ${today} or earlier`;
    }

    setFormErrors(errors);

  }

  return(

    <>
      <AdminHeader pageName={'Add Transaction'} />

      <div className="d-flex justify-content-center pt-4 pb-4">
        <form onSubmit={handleSubmit} className="div-shadow rounded-5 pt-4 pb-4 ps-5 pe-5" style={{width: '1000px', height: '600px', position: 'relative'}}>
          <h4 style={{color: '#00ADB5'}}>New Transaction</h4>

          {/* <div className="d-flex flex-column mt-4" style={{paddingLeft: '42px', paddingRight: '42px'}}>
            <label className="font-s-18" htmlFor="transact-type" >Transaction Type:</label>
            <select className="add-form-input rounded-2 font-s-18" id="transactType" value={transactionFields.transactType} onChange={handleInput}>
              <option value={'addjobtransaction'}>Job Transaction</option>
              <option value={'addpurchtransaction'}>Purchase Transaction</option>
            </select>
          </div> */}

          <div className="d-flex flex-column mt-4" style={{paddingLeft: '42px', paddingRight: '42px'}}>
            <label className="font-s-18" htmlFor="ref_id" >Service:</label>
            <select className="add-form-input rounded-2 font-s-18"value={transactionFields.ref_id} id="ref_id" onChange={handleInput} onMouseUp={validateTransactionFields} onBlur={validateTransactionFields} >
              <option value={''}>--Select Service</option>
              {optionElems}
            </select>
            <span className="fw-semibold" style={{height: '24px', color: 'red'}}>{formErrors.ref}</span>
          </div>

          <div className="d-flex justify-content-between mt-3" style={{paddingLeft: '42px', paddingRight: '42px'}}>
            <div className="d-flex flex-column">
              <label className="font-s-18" htmlFor="create_date" >Service Charge:</label>
              <input className="add-form-input rounded-2" type="text" id="amount" style={{width: '210px'}} value={serviceCharge} onChange={handleInput} required="true" disabled/>
            </div>
            <div className="d-flex flex-column">
              <label className="font-s-18" htmlFor="status" >Tax Charge:</label>
              <input className="add-form-input rounded-2" type="text" id="amount" style={{width: '210px'}} value={taxAmount || ''} onChange={handleInput} required="true" disabled/>
            </div>
            <div className="d-flex flex-column">
              <label className="font-s-18" htmlFor="amount" >Total Amount:</label>
              <input className="add-form-input rounded-2" type="text" id="amount" style={{width: '210px'}} value={serviceCharge + taxAmount || ''} onChange={handleInput} required="true" disabled/>
            </div>
          </div>

          <div className="d-flex justify-content-between mt-4" style={{paddingLeft: '42px', paddingRight: '42px'}}>
            <div className="d-flex flex-column" style={{width: '360px'}}>
              <label className="font-s-18" htmlFor="create_date" >Date:</label>
              <input className="add-form-input rounded-2" style={{width: '360px'}} type="date" value={transactionFields.create_date} id="create_date" onChange={handleInput}  required="true" max={today} onBlur={validateTransactionFields} />
              <span className="fw-semibold" style={{width: '360px', height: '24px', color: 'red'}}>{formErrors.cdate}</span>
            </div>
            <div className="d-flex flex-column" style={{width: '360px'}}>
              <label className="font-s-18" htmlFor="pay_date" >Payment Date:</label>
              <input className="add-form-input rounded-2" style={{width: '360px'}} type="date" value={transactionFields.pay_date || transactionFields.create_date} id="pay_date" onChange={handleInput} onBlur={validateTransactionFields} required="true" max={today} min={transactionFields.create_date}/>
              <span className="fw-semibold" style={{width: '360px', height: '24px', color: 'red'}}>{formErrors.pdate}</span>
            </div>
            {/* <div className="d-flex flex-column" style={{width: '223px'}}>
              <label className="font-s-18" htmlFor="status" >Status:</label>
              <select className="add-form-input rounded-2" id="status" style={{width: '210px'}} value={transactionFields.status} onChange={handleInput}>
                <option value={'pending'}>Pending</option>
                <option value={'success'}>Success</option>
                <option value={'fail'}>Fail</option>
              </select>
            </div> */}
          </div>

          <div className="d-flex flex-column mt-1" style={{paddingLeft: '42px', paddingRight: '42px'}}>
            <label className="font-s-18" htmlFor="desc" >Transaction Description:</label>
            <textarea className="add-form-input rounded-2" type="text" id="desc" value={transactionFields.desc} onChange={handleInput} rows={3} ></textarea>
          </div>

          <div style={{position: 'absolute', left: '690px', bottom: '15px'}}>
            <button type="button" className="form-button rounded-5" onClick={clearFields}>Clear</button>
            <button className="form-button rounded-5 ms-5">Submit</button>
          </div>

        </form>
      </div>
    </>

  )

}