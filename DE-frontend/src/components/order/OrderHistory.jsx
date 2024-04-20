import React from 'react'

function OrderHistory() {
  return (
    <div style={{ marginTop: "90px", maxWidth: '1500px'}}>
    <h3 style={{ marginBottom: "30px", marginLeft: "20px", fontWeight: "bold" }}>
      Order History
    </h3>
    <table className="styled-table" style={{ marginLeft: "20px", marginRight: "20px", height:'20px',fontSize:"20px",width:"300%",justifyContent:"center"}}>
      <thead>
        <tr>
          <th>itemName</th>
          <th>itemNumber</th>
          <th>Quantity</th>
          <th>Order Status</th>
          
        </tr>
      </thead>
          </table>
          </div>
  )
}

export default OrderHistory