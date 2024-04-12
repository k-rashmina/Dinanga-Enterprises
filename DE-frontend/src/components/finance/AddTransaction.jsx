import React from "react";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import AdminHeader from "../common/AdminHeader";

export default function AddTransaction() {

  //transaction fields state object
  const [transactionFields, setTransactionFields] = useState({
    transactType: 'addjobtransaction',
    status: 'pending',
    amount: '',
    ref_id: '',
    desc: '',
    create_date: '',
  })


  //handling form inputs
  const handleInput = event => {
    const {id, value} = event.target;

    setTransactionFields(prevState => {
      return{
        ...prevState,
        [id]: value
      }
    })

  }


  //clear form data function
  const clearFields = () => {
    setTransactionFields({
      transactType: 'addjobtransaction',
      status: 'pending',
      amount: '',
      ref_id: '',
      desc: '',
      create_date: '',
    })
  }


  //handle submit function
  const [submitValue, setSubmitValue] = useState(false);

  const handleSubmit = event => {
    event.preventDefault();
    setSubmitValue(prevState => !prevState);
  }

  //API call for posting transaction
  const hasPageLoaded = useRef(false);

  useEffect(() => {

    if(hasPageLoaded.current == true){
      axios({
        method: 'post',
        url: `http://localhost:5000/transaction/${transactionFields.transactType}`,
        data: {
          status: transactionFields.status,
          amount: transactionFields.amount,
          referType: transactionFields.ref_id,
          desc: transactionFields.desc,
          create_date: transactionFields.create_date,
          update_date: transactionFields.create_date
        }
      }).then(res => console.log(res))
    }

    hasPageLoaded.current = true;

  }, [submitValue])

  return(

    <>
      <AdminHeader pageName={'Add Transaction'} />

      <div className="d-flex justify-content-center pt-4 pb-4">
        <form onSubmit={handleSubmit} className="div-shadow rounded-5 pt-4 pb-4 ps-5 pe-5" style={{width: '1000px', height: '558px', position: 'relative'}}>
          <h4 style={{color: '#00ADB5'}}>New Transaction</h4>

          <div className="d-flex flex-column mt-4" style={{paddingLeft: '42px', paddingRight: '42px'}}>
            <label className="font-s-18" htmlFor="transact-type" >Transaction Type:</label>
            <select className="add-form-input rounded-2 font-s-18" id="transactType" value={transactionFields.transactType} onChange={handleInput}>
              <option value={'addjobtransaction'}>Job Transaction</option>
              <option value={'addpurchtransaction'}>Purchase Transaction</option>
            </select>
          </div>

          <div className="d-flex flex-column mt-4" style={{paddingLeft: '42px', paddingRight: '42px'}}>
            <label className="font-s-18" htmlFor="ref_id" >Job/Order ID:</label>
            <input className="add-form-input rounded-2 font-s-18" type="text" value={transactionFields.ref_id} id="ref_id" onChange={handleInput} />
          </div>

          <div className="d-flex justify-content-between mt-4" style={{paddingLeft: '42px', paddingRight: '42px'}}>
            <div className="d-flex flex-column">
              <label className="font-s-18" htmlFor="create_date" >Date:</label>
              <input className="add-form-input rounded-2" style={{width: '210px'}} type="date" value={transactionFields.create_date} id="create_date" onChange={handleInput} required="true" />
            </div>
            <div className="d-flex flex-column">
              <label className="font-s-18" htmlFor="status" >Status:</label>
              <select className="add-form-input rounded-2" id="status" style={{width: '210px'}} value={transactionFields.status} onChange={handleInput}>
                <option value={'pending'}>Pending</option>
                <option value={'success'}>Success</option>
                <option value={'fail'}>Fail</option>
              </select>
            </div>
            <div className="d-flex flex-column">
              <label className="font-s-18" htmlFor="amount" >Amount:</label>
              <input className="add-form-input rounded-2" type="text" id="amount" style={{width: '210px'}} value={transactionFields.amount} onChange={handleInput} required="true" />
            </div>
          </div>

          <div className="d-flex flex-column mt-4" style={{paddingLeft: '42px', paddingRight: '42px'}}>
            <label className="font-s-18" htmlFor="desc" >Transaction Description:</label>
            <input className="add-form-input rounded-2" type="text" id="desc" value={transactionFields.desc} onChange={handleInput}/>
          </div>

          <div style={{position: 'absolute', left: '690px', bottom: '40px'}}>
            <button type="button" className="form-button rounded-5" onClick={clearFields}>Clear</button>
            <button className="form-button rounded-5 ms-5">Submit</button>
          </div>

        </form>
      </div>
    </>

  )

}