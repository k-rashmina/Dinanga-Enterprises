import React from "react";
import { useState, useEffect, useRef } from "react";
import { useParams } from 'react-router-dom'
import AdminHeader from "../common/AdminHeader";
import axios from 'axios';

export default function TransactionInfo() {

  //getting transaction id from route param
  const { ttype, tid } = useParams();
  console.log(ttype)
  //transaction info state
  const [transactionInfo, setTransactionInfo] = useState({});

//Getting the transaction record from db
  const hasPageLoaded = useRef(false);
  useEffect(() => {

    axios.get(`http://localhost:5000/transaction/jobtransactionlist/transaction?tid=${tid}`)
    .then(res => res.data != 'failed' && setTransactionInfo(res.data))

    hasPageLoaded.current = true;

  }, [])

  console.log(transactionInfo)

  return(

    <>

      <AdminHeader pageName={'Transaction Information'}/>
      <div className="d-flex justify-content-center align-items-center" style={{height: '90%'}}>
        <div className="div-shadow rounded-5 pt-4 pb-4 ps-5 pe-5 " style={{width: '1000px', height: '600px', position: 'relative'}} >
          <h3 style={{color: '#00ADB5'}}>Transaction Details</h3>
          <div>

            <div className="d-flex justify-content-between ps-5 pe-5">
              <h5>Transaction Number</h5>
              <h5>{transactionInfo.transact_no}</h5>
            </div>

            {ttype == 'job' &&
              <div className="d-flex justify-content-between ps-5 pe-5">
                <h5>Transaction Type</h5>
                <h5>{transactionInfo.transact_type == 'online' ? 'Online' : 'Offline' }</h5>
              </div>
            }

            {ttype == 'job' ?
              <div className="d-flex justify-content-between ps-5 pe-5">
                <h5>{transactionInfo.transact_type == 'online' ? 'Job Number' : 'Service Number'}</h5>
                <h5>{hasPageLoaded.current ? transactionInfo.ref_id.jobNumber : 'test'}</h5>
              </div> 
            :
              <div className="d-flex justify-content-between ps-5 pe-5">
                <h5>Order Number</h5>
                <h5>{transactionInfo.order_id}</h5>
              </div> 
            }

            <div className="d-flex justify-content-between ps-5 pe-5">
              <h5>Transaction</h5>
              <h5>{transactionInfo.status}</h5>
            </div> 

          </div>
        </div>
      </div>
      

    </>

  )

}