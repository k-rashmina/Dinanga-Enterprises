import React from "react";

export default function TransactionTable(props) {

  return(

   <div className="align-self-center rounded-5 div-shadow mt-5 ps-5 pb-4" style={{width: '1040px', height: '394px', overflow: 'scroll'}}>
     <table className="table-hover" style={{width: '970px', overflow: 'scroll'}}>
      <tr style={{fontSize: '18px', height: '56px'}}>
        <th>Transaction No.</th>
        <th>Job No.</th>
        <th>{props.name}</th>
        <th>Date</th>
        <th>Status</th>
        <th>Amount</th>
      </tr>

      <tr style={{height: '50px'}}> 
        <td>JT1000</td>
        <td>JB1234</td>
        <td>Maneesha@gmail.com</td>
        <td>2024/03/10</td>
        <td>Pending</td>
        <td>LKR 69000</td>
      </tr>
      <tr style={{height: '50px'}}>
        <td>JT1000</td>
        <td>JB1234</td>
        <td>Maneesha@gmail.com</td>
        <td>2024/03/10</td>
        <td>Pending</td>
        <td>LKR 69000</td>
      </tr>
      <tr style={{height: '50px'}}>
        <td>JT1000</td>
        <td>JB1234</td>
        <td>Maneesha@gmail.com</td>
        <td>2024/03/10</td>
        <td>Pending</td>
        <td>LKR 69000</td>
      </tr>
      <tr style={{height: '50px'}}>
        <td>JT1000</td>
        <td>JB1234</td>
        <td>Maneesha@gmail.com</td>
        <td>2024/03/10</td>
        <td>Pending</td>
        <td>LKR 69000</td>
      </tr>
      <tr style={{height: '50px'}}>
        <td>JT1000</td>
        <td>JB1234</td>
        <td>Maneesha@gmail.com</td>
        <td>2024/03/10</td>
        <td>Pending</td>
        <td>LKR 69000</td>
      </tr>
      <tr style={{height: '50px'}}>
        <td>JT1000</td>
        <td>JB1234</td>
        <td>Maneesha@gmail.com</td>
        <td>2024/03/10</td>
        <td>Pending</td>
        <td>LKR 69000</td>
      </tr>

      <tr style={{height: '50px'}}>
        <td>JT1000</td>
        <td>JB1234</td>
        <td>Maneesha@gmail.com</td>
        <td>2024/03/10</td>
        <td>Pending</td>
        <td>LKR 69000</td>
      </tr>

      <tr style={{height: '50px'}}>
        <td>JT1000</td>
        <td>JB1234</td>
        <td>Maneesha@gmail.com</td>
        <td>2024/03/10</td>
        <td>Pending</td>
        <td>LKR 69000</td>
      </tr>

      <tr style={{height: '50px'}}>
        <td>JT1000</td>
        <td>JB1234</td>
        <td>Maneesha@gmail.com</td>
        <td>2024/03/10</td>
        <td>Pending</td>
        <td>LKR 69000</td>
      </tr>

      <tr style={{height: '50px'}}>
        <td>JT1000</td>
        <td>JB1234</td>
        <td>Maneesha@gmail.com</td>
        <td>2024/03/10</td>
        <td>Pending</td>
        <td>LKR 69000</td>
      </tr>

    </table>
   </div>

  )

}