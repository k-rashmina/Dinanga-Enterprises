import React from 'react'

function OrderHistory() {
  return (
    <div style={{ marginTop: "90px" }}>
    <h3 style={{ marginBottom: "10px", marginLeft: "20px", fontWeight: "bold" }}>Order History</h3><br />
    <table className="styled-table" style={{ marginLeft: "20px", width: "calc(100% - 20px)", marginRight: "20px" }}>
      <thead>
        <tr>
          <th style={{ textAlign: "center" }}>itemName</th>
          <th style={{ textAlign: "center" }}>itemNumber</th>
          <th style={{ textAlign: "center" }}>Quantity</th>
          <th style={{ textAlign: "center" }}>Order Status</th>
          
          </tr>
          </thead>
          </table>
          </div>
  )
}

export default OrderHistory