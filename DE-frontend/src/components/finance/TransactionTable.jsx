import React from "react";

export default function TransactionTable(props) {
  console.log(props.transactions)
  const transactElems = props.transactions.map(transact => {
    console.log(transact.transact_no)
    return(
      <tr style={{height: '50px'}}> 
        <td>{transact.transact_no}</td>
        <td>{transact.job_id}</td>
        <td>Maneesha@gmail.com</td>
        <td>{transact.create_date}</td>
        <td>{transact.status}</td>
        <td>{transact.amount}</td>
      </tr>
    )
  })

  return(

   <div className="align-self-center rounded-5 div-shadow mt-5 ps-5 pb-4" style={{width: '1040px', height: '394px', overflow: 'scroll'}}>
     <table className="table-hover example1" style={{width: '970px', overflowY: 'hidden', overflowX: 'hidden'}}>
      <tr style={{fontSize: '18px', height: '56px'}}>
        <th>Transaction No.</th>
        <th>Job No.</th>
        <th>{props.name}</th>
        <th>Date</th>
        <th>Status</th>
        <th>Amount</th>
      </tr>
      {transactElems}

    </table>
   </div>

  )

}