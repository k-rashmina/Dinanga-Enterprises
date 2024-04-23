import React from "react";
import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from 'react-router-dom'
import AdminHeader from "../common/AdminHeader";
import axios from 'axios';

export default function TransactionInfo() {

  const nav = useNavigate();

  //today
  const date = new Date().toJSON();
  const today = date.substring(0, 10);

  //getting transaction id from route param
  const { ttype, tid } = useParams();

  //transaction info state
  const [transactionInfo, setTransactionInfo] = useState({});

//Getting the transaction record from db
  const hasPageLoaded = useRef(false);
  useEffect(() => {

    axios.get(`http://localhost:5000/transaction/jobtransactionlist/transaction?tid=${tid}`)
    .then(res => res.data != 'failed' && setTransactionInfo(res.data))

    hasPageLoaded.current = true;

  }, [])

  // console.log(transactionInfo);


/** Handling updating transactions **/
  const [modalStyle, setModalStyle] = useState({
    display: 'none'
  })

  //function to show modal
  const showModal = () => {

    setModalStyle({
      display: 'block'
    })
  }

  //function to close modal
  const closeModal = () => {
    setModalStyle({
      display: 'none'
    })
  }

  //Handling update form inputs
  const handleInputEvents = (e) => {

    setTransactionInfo(prevState => {
      const{ name, value } = e.target;
      return{

        ...prevState,
        [name]: value

      }
    })
  }

  const [upVal, setUpVal] = useState(false);
  const pageRender = useRef(false)

  const handleUpVal = (e) => {
    e.preventDefault()
    pageRender.current = true
    setUpVal(prev => !prev);
  }

  //API call for transaction updating
  useEffect(() => {

    if(pageRender.current){
      axios.put('http://localhost:5000/transaction/upjobtransaction', transactionInfo)
      .then(res => {
        alert(res.data);
        closeModal();
      })
    }

  }, [upVal])


/** Handling deleting transactions **/
  const [delVal, setDelVal] = useState(false);
  const deleteRef = useRef(false);

  const handleDelVal = () => {
    const confirmVal = confirm('Confirm Transaction Deletion');
    if(confirmVal){
      deleteRef.current = true;
      setDelVal(prev => !prev);
    }
  }

  //API call for delete transaction
  useEffect(() => {

    if(deleteRef.current){
      axios.delete(`http://localhost:5000/transaction/deljobtransaction?tid=${transactionInfo._id}`)
      .then(res => {
        alert(res.data);
        nav('/admin/finance/jobtransactions');
      })
      .catch(err => console.log(err))
    }

  }, [delVal])

 
console.log(transactionInfo)
  return(

    <>

      <AdminHeader pageName={'Transaction Information'}/>
      <div className="d-flex justify-content-center mt-4" style={{height: '86%'}}>
        <div className="div-shadow rounded-5 pt-4 pb-4 ps-5 pe-5 " style={{width: '1000px', height: '580px', position: 'relative', overflowY: 'scroll'}} >
          <h3 className="mb-4" style={{color: '#00ADB5'}}>{ttype == 'job' ? 'Job' : 'Purchase'} Transaction Details</h3>
          <div>

            <div className="d-flex justify-content-between ms-5 me-5 pb-3 pt-3 border-bottom border-dark border-2 border-opacity-25">
              <h5>Transaction Number</h5>
              <h5>{transactionInfo.transact_no}</h5>
            </div>

            {ttype == 'job' &&
              <div className="d-flex justify-content-between ms-5 me-5 pb-3 pt-3 border-bottom border-dark border-2 border-opacity-25">
                <h5>Transaction Type</h5>
                <h5>{transactionInfo.transact_type == 'online' ? 'Online' : 'Offline' }</h5>
              </div>
            }

            {ttype == 'job' ?
              <div className="d-flex justify-content-between ms-5 me-5 pb-3 pt-3 border-bottom border-dark border-2 border-opacity-25">
                <h5>{transactionInfo.transact_type == 'online' ? 'Job Number' : 'Service Number'}</h5>
                <h5>{hasPageLoaded.current && transactionInfo.ref_id.jobNumber}</h5>
              </div> 
            :
              <div className="d-flex justify-content-between ms-5 me-5 pb-3 pt-3 border-bottom border-dark border-2 border-opacity-25">
                <h5>Order Number</h5>
                <h5>{transactionInfo.order_id}</h5>
              </div> 
            }

            <div className="d-flex justify-content-between ms-5 me-5 pb-3 pt-3 border-bottom border-dark border-2 border-opacity-25">
              <h5>Transaction Status</h5>
              <h5>{transactionInfo.status}</h5>
            </div> 

            <div className="d-flex justify-content-between ms-5 me-5 pb-3 pt-3 border-bottom border-dark border-2 border-opacity-25">
              <h5>Created Date</h5>
              <h5>{hasPageLoaded.current && transactionInfo.create_date.substring(0, 10)}</h5>
            </div>

            <div className="d-flex justify-content-between ms-5 me-5 pb-3 pt-3 border-bottom border-dark border-2 border-opacity-25">
              <h5>Updated Date</h5>
              <h5>{hasPageLoaded.current && transactionInfo.update_date.substring(0, 10)}</h5>
            </div>

            <div className="d-flex justify-content-between ms-5 me-5 pb-3 pt-3 border-bottom border-dark border-2 border-opacity-25">
              <h5>Transaction Description</h5>
              <h5 style={{maxWidth: '350px', wordBreak: 'break-word'}}>{transactionInfo.desc}</h5>
            </div>

          </div>

          <h3 className=" mb-4 mt-5" style={{color: '#00ADB5'}}>Payment Details</h3>
          <div>
            
            {ttype == 'job' &&
              <div className="d-flex justify-content-between ms-5 me-5 pb-3 pt-3 border-bottom border-dark border-2 border-opacity-25">
                <h5>Payment Type</h5>
                <h5>{transactionInfo.pay_type}</h5>
              </div>
            }

            <div className="d-flex justify-content-between ms-5 me-5 pb-3 pt-3 border-bottom border-dark border-2 border-opacity-25">
              <h5>Payment Date</h5>
              <h5>{hasPageLoaded.current && transactionInfo.pay_date.substring(0, 10)}</h5>
            </div>

            <div className="d-flex justify-content-between ms-5 me-5 pb-3 pt-3 border-bottom border-dark border-2 border-opacity-25">
              <h5>Job Service Amount</h5>
              <h5>LKR {hasPageLoaded.current && transactionInfo.amount.job_amt}</h5>
            </div>

            <div className="d-flex justify-content-between ms-5 me-5 pb-3 pt-3 border-bottom border-dark border-2 border-opacity-25">
              <h5>Tax Amount</h5>
              <h5>LKR {hasPageLoaded.current && transactionInfo.amount.tax_amt}</h5>
            </div>

            <div className="d-flex justify-content-between ms-5 me-5 pb-3 pt-3 border-bottom border-dark border-2 border-opacity-25">
              <h5>Total Amount</h5>
              <h5>LKR {hasPageLoaded.current && transactionInfo.amount.tot_amount}</h5>
            </div>

          </div>

          <div className="d-flex justify-content-center ps-5 pe-5 mt-5">
            <button className="form-button rounded-5 fw-semibold me-3" onClick={showModal}>Edit</button>
            <button className="form-delete-button rounded-5 fw-semibold ms-3" onClick={handleDelVal}>Delete</button>
          </div>

        </div>
        
      </div>
      
      {/* Updat form */}
      <div className="modal" style={modalStyle}>
        <center>
          <form onSubmit={handleUpVal} className="rounded-4 pb-5" style={{width: '700px', backgroundColor: '#EEEEEE'}} >
            
            <div className="d-flex justify-content-between border-bottom border-dark border-2 border-opacity-25">
              <h4 className="ps-3 mt-4 pt-1 pb-4 " style={{textAlign: 'start'}}>Update Transaction</h4>
              <button type="button" className="fs-2 fw-semibold mt-2" style={{width: '60px', height: '60px', border: 'none'}} onClick={closeModal}>X</button>
            </div>

            <div className="d-flex flex-column align-items-start mt-4">
              <label className="fs-5 ms-3">Transaction Status</label>
              <select className="ms-4 mt-2 fs-5 filter-input rounded-2" style={{width: '90%', }} name="status" value={transactionInfo.status} onChange={handleInputEvents}>
                <option value={'pending'}>Pending</option>
                <option value={'success'}>Success</option>
                <option value={'fail'}>Fail</option>
              </select>
            </div>

            <div className="d-flex flex-column align-items-start mt-4">
              <label className="fs-5 ms-3" htmlFor="desc" >Transaction Description:</label>
              <textarea className="ms-4 mt-2 fs-5 add-form-input rounded-2" type="text" id="desc" rows={3} cols={69} name="desc" value={transactionInfo.desc} onChange={handleInputEvents} ></textarea>
            </div>

            <div className="d-flex flex-column align-items-start mt-4">
              <label className="fs-5 ms-3">Payment Type</label>
              <select className="ms-4 mt-2 fs-5 filter-input rounded-2" style={{width: '90%', }} name="pay_type" value={transactionInfo.pay_type} onChange={handleInputEvents} required={transactionInfo.status == 'success' ? true : false} >
                <option value={''}>--Select</option>
                <option value={'cash'}>Cash</option>
                <option value={'transfer'}>Bank Transafer</option>
              </select>
            </div>

            <div className="d-flex flex-column align-items-start mt-4">
              <label className="fs-5 ms-3">Payment Date</label>
              <input className="ms-4 mt-2 filter-input rounded-2" style={{width: '90%'}} type="date"  max={today}  name="pay_date" value={hasPageLoaded.current && transactionInfo.pay_date.substring(0, 10)} onChange={handleInputEvents} required={transactionInfo.status == 'success' ? true : false}/>
            </div>

            <div className="d-flex justify-content-center ps-5 pe-5 mt-5">
              <button className="form-button rounded-5 fw-semibold me-3" >Update</button>
              <button type="button" className="form-delete-button rounded-5 fw-semibold ms-3" onClick={closeModal}>Cancel</button>
            </div>

          </form>
        </center>
      </div>
    </>

  )

}