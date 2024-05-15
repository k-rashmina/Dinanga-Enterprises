import React from "react";
import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate, Link } from 'react-router-dom'
import AdminHeader from "../common/AdminHeader";
import axios from 'axios';

export default function TransactionInfo() {

  //getting transaction id from route param
  const { ttype, tid } = useParams();

  const getlink = ttype == 'job' ? 'jobtransactionlist' : 'purchtransactionlist'
  const updLink = ttype == 'job' ? 'upjobtransaction' : 'uppurchtransaction'
  const delLink = ttype == 'job' ? 'deljobtransaction' : 'delpurchtransaction'

  const nav = useNavigate();

  //today
  const date = new Date().toJSON();
  const today = date.substring(0, 10);



  //transaction info state
  const [transactionInfo, setTransactionInfo] = useState({});

//Getting the transaction record from db
  const hasPageLoaded = useRef(false);
  useEffect(() => {

    axios.get(`http://localhost:5000/transaction/${getlink}/transaction?tid=${tid}`)
    .then(res => res.data != 'failed' && setTransactionInfo(res.data))

    hasPageLoaded.current = true;

  }, [])

  // console.log(transactionInfo);


/** Handling modal events **/
  const [modalStyle, setModalStyle] = useState({
    display: 'none'
  })

  const [payModalStyle, setPayModalStyle] = useState({
    display: 'none'
  })

  //function to show modal
  const showModal = (e) => {

    if(e.target.name == 'update-btn'){

      setModalStyle({
        display: 'block'
      })
    }
    else{

      setPayModalStyle({
        display: 'block'
      })

    }
  }

  //function to close modal
  const closeModal = (modal) => {
    if(modal == 'updateModal'){

      setModalStyle({
        display: 'none'
      })
    }
    else{

      setPayModalStyle({
        display: 'none'
      })
    }
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


  //handle receipt input
  const handleRcptInput = (e) => {

    let reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);

    reader.onload = () => {
      console.log('basecode64', reader.result)
      setTransactionInfo(prev => {
        return {
          ...prev,
          status: 'success',
          pay_rcpt: reader.result
        }
      })
    }
    reader.onerror = error => {
      console.log(error)
    }
  }

  //handle receipt button
  const [rcpt, setrcpt] = useState('');
  const showRcpt = () => {
    console.log(transactionInfo.pay_rcpt)
    setrcpt(transactionInfo.pay_rcpt);
  }

  const [upVal, setUpVal] = useState(false);
  const pageRender = useRef(false)

  const handleUpVal = (e) => {
    e.preventDefault()
    pageRender.current = true
    transactionInfo.update_date = today
    setUpVal(prev => !prev);
  }


  //API call for transaction updating
  useEffect(() => {

    if(pageRender.current){
      axios.put(`http://localhost:5000/transaction/${updLink}`, transactionInfo)
      .then(res => {
        alert("Transaction Updated");
        closeModal('updateModal');
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
      axios.delete(`http://localhost:5000/transaction/${delLink}?tid=${transactionInfo._id}`)
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
          
          <div className="d-flex justify-content-between">
            <h3 className="mb-4" style={{color: '#00ADB5'}}>{ttype == 'job' ? 'Job' : 'Purchase'} Transaction Details</h3>
            <div>
              {ttype == 'purch' && (transactionInfo.status == 'pending' && <button className="form-button rounded-5 me-3" style={{height: '50px'}} onClick={showModal}>Pay</button>)}  
              {transactionInfo.pay_rcpt && <a href={'#receipt'}><button className="form-button rounded-5" style={{height: '50px'}} onClick={showRcpt}>See Receipt</button></a>}  
            </div>
          </div>

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
                <h5>{transactionInfo.order_id?.order_number}</h5>
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
              <h5>{hasPageLoaded.current && transactionInfo.pay_date?.substring(0, 10)}</h5>
            </div>

            {ttype == 'job' ? 
            <>
              <div className="d-flex justify-content-between ms-5 me-5 pb-3 pt-3 border-bottom border-dark border-2 border-opacity-25">
                <h5>Job Service Amount</h5>
                <h5>LKR {hasPageLoaded.current && transactionInfo.amount?.job_amt.toFixed(2)}</h5>
              </div>

              <div className="d-flex justify-content-between ms-5 me-5 pb-3 pt-3 border-bottom border-dark border-2 border-opacity-25">
                <h5>Tax Amount</h5>
                <h5>LKR {hasPageLoaded.current && transactionInfo.amount?.tax_amt.toFixed(2)}</h5>
              </div>

              <div className="d-flex justify-content-between ms-5 me-5 pb-3 pt-3 border-bottom border-dark border-2 border-opacity-25">
              <h5>Total Amount</h5>
              <h5>LKR {hasPageLoaded.current && transactionInfo.amount?.tot_amount.toFixed(2)}</h5>
            </div>
            </> :
            <div className="d-flex justify-content-between ms-5 me-5 pb-3 pt-3 border-bottom border-dark border-2 border-opacity-25">
            <h5>Total Amount</h5>
            <h5>LKR {hasPageLoaded.current && transactionInfo.amount.toFixed(2)}</h5>
          </div>}

            

          </div>

          <div className="d-flex justify-content-center ps-5 pe-5 mt-5">
            <button name="update-btn" className="form-button rounded-5 fw-semibold me-3" onClick={showModal}>Edit</button>
            <button className="form-delete-button rounded-5 fw-semibold ms-3" onClick={handleDelVal}>Delete</button>
          </div>

        </div>
        
      </div>
      
      {/* Update form */}
      <div className="modal" style={modalStyle}>
        <center>
          <form onSubmit={handleUpVal} className="rounded-4 pb-5" style={{width: '700px', backgroundColor: '#EEEEEE'}} >
            
            <div className="d-flex justify-content-between border-bottom border-dark border-2 border-opacity-25">
              <h4 className="ps-3 mt-4 pt-1 pb-4 " style={{textAlign: 'start'}}>Update Transaction</h4>
              <button type="button" className="fs-2 fw-semibold pb-5 ps-4 pt-1" style={{width: '65px', height: '60px', border: 'none'}} onClick={() => closeModal('updateModal')}>X</button>
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

            {ttype == 'job' &&
              <div className="d-flex flex-column align-items-start mt-4">
                <label className="fs-5 ms-3">Payment Type</label>
                <select className="ms-4 mt-2 fs-5 filter-input rounded-2" style={{width: '90%', }} name="pay_type" value={transactionInfo.pay_type} onChange={handleInputEvents} required={transactionInfo.status == 'success' ? true : false} >
                  <option value={''}>--Select</option>
                  <option value={'cash'}>Cash</option>
                  <option value={'transfer'}>Bank Transafer</option>
                </select>
              </div>
            }

            <div className="d-flex flex-column align-items-start mt-4">
              <label className="fs-5 ms-3">Payment Date</label>
              <input className="ms-4 mt-2 filter-input rounded-2" style={{width: '90%'}} type="date"  max={today}  name="pay_date" value={hasPageLoaded.current && transactionInfo.pay_date?.substring(0, 10)} onChange={handleInputEvents} required={transactionInfo.status == 'success' ? true : false}/>
            </div>

            <div className="d-flex justify-content-center ps-5 pe-5 mt-5">
              <button className="form-button rounded-5 fw-semibold me-3" >Update</button>
              <button type="button" className="form-delete-button rounded-5 fw-semibold ms-3" onClick={() => closeModal('updateModal')}>Cancel</button>
            </div>

          </form>
        </center>
      </div>

      {/* Payment form */}
      {ttype == 'purch' && 
        <div className="modal" style={payModalStyle}>
          <center>
            <form onSubmit={handleUpVal} className="rounded-4 pb-5" style={{width: '700px', backgroundColor: '#EEEEEE'}} >
              
              <div className="d-flex justify-content-between border-bottom border-dark border-2 border-opacity-25">
                <h4 className="ps-3 mt-4 pt-1 pb-4 " style={{textAlign: 'start'}}>Update Transaction</h4>
                <button type="button" className="fs-2 fw-semibold pb-5 ps-4 pt-1" style={{width: '65px', height: '60px', border: 'none'}} onClick={closeModal}>X</button>
              </div>

              <div className="d-flex flex-column align-items-start mt-4">
                <label className="fs-5 ms-3">Payment Date</label>
                <input className="ms-4 mt-2 filter-input rounded-2" style={{width: '90%'}} type="date"  max={today}  name="pay_date" value={hasPageLoaded.current && transactionInfo.pay_date?.substring(0, 10)} onChange={handleInputEvents} required={transactionInfo.status == 'success' ? true : false}/>
              </div>

              <div className="d-flex flex-column align-items-start mt-4">
                <label className="fs-5 ms-3">Payment Receipt</label>
                <input className="ms-4 mt-2 filter-input rounded-2" style={{width: '90%'}} type="file" name="pay_rcpt"  onChange={handleRcptInput} />
              </div>

              <div className="d-flex justify-content-center ps-5 pe-5 mt-5">
                <button className="form-button rounded-5 fw-semibold me-3" >Update</button>
                <button type="button" className="form-delete-button rounded-5 fw-semibold ms-3" onClick={closeModal}>Cancel</button>
              </div>

            </form>
          </center>

          
        </div>
      }
      {rcpt && <div id="receipt" className="pt-5" style={{backgroundColor: '#EEEEEE'}}><center><img src={rcpt} alt="asa" width={"600"} height={"600"} style={{objectFit: 'contain'}}/></center></div>}
    </>

  )

}