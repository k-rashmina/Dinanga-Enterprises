import React from "react";
import eye from '../../assets/eye.png';
import { Link } from "react-router-dom";

export default function TransactionTable(props) {
  // console.log(props.transactions)
  const transactElems = props.transactions.map(transact => {
    // console.log(transact.transact_no)
    let transactRef = props.name == 'Customer' ? transact.ref_id?.jobNumber : (transact.order_id?.order_number);
    let transactPerson = props.name == 'Customer' ? transact.ref_id?.email : 'Maneesha@gmail.com'
    let date = transact.create_date.substring(0, 10);
    return(
      <tr style={{height: '50px'}}> 
        <td style={{width: '171px'}}>{transact.transact_no}</td>
        <td style={{width: '100px'}}>{transactRef}</td>
        {props.name == 'Customer' && <td style={{width: '93px'}}>{transact.transact_type}</td>}
        <td style={{width: '205px'}}>{transactPerson || 'Maneesha@gmail.com'}</td>
        <td style={{width: '139px'}}>{date}</td>
        <td style={{width: '93px'}}>{transact.status}</td>
        <td style={{width: '81px'}}>{transact.amount.tot_amount?.toFixed(2) || transact.amount?.toFixed(2)}</td>
        <td style={{width: '40px'}}><Link to={`/admin/finance/jobtransactions/${props.name == 'Customer' ? 'job' : 'purch'}/${transact._id}`}><img width={25} src={eye} alt="eye" /></Link></td>
      </tr>
    )
  })

  return(
    
    transactElems.length == 0 
    ?
      <div className="d-flex justify-content-center align-items-center" style={{height: '394px'}}>
        <h3 className="text-muted">No Transactions</h3>
      </div>
    :
      <div className="align-self-center rounded-5 div-shadow mt-5 ps-4 pb-4 example example1" style={{width: '1040px', height: '394px', overflow: 'scroll'}}>
        <table className="table-hover example1 " style={{width: '990px'}}>
          <thead  style={{fontSize: '18px', height: '56px'}}>
            <tr className="border-bottom border-dark border-3 pt-3" style={{position: 'fixed', height: '56px', backgroundColor: '#EEEEEE', width: '980px'}}>
              <th style={{width: '180px'}}>Transaction No.</th>
              <th style={{width: '110px'}}>Job No.</th>
              {props.name == 'Customer' && <th style={{width: '100px'}}>Type</th>}
              <th style={{width: '220px'}}>{props.name}</th>
              <th style={{width: '150px'}}>Date</th>
              <th style={{width: '94px'}}>Status</th>
              <th style={{width: '82px'}}>Amount(LKR)</th>
            </tr>
          </thead>
          <tbody className="">
            {transactElems}
          </tbody>

        </table>
      </div>

  )

}