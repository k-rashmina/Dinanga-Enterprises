import React from 'react';
import { Link } from 'react-router-dom';

function ToBeOrdered() {
  return (
    <div style={{ marginTop: "90px" }}>
      <h5 style={{ marginBottom: "5px", marginLeft: "10px", fontWeight: "bold" }}>To Be Ordered</h5><br />
      <table className="styled-table" style={{ marginLeft: "20px", width: "900%" }}>
        <thead>
          <tr>
            <th style={{ textAlign: "center" }}>itemName</th>
            <th style={{ textAlign: "center" }}>itemNumber</th>
            <th style={{ textAlign: "center" }}>Available Quantity</th>
            <th style={{ textAlign: "center" }}>Reorder Level</th>
            <th style={{ textAlign: "center" }}>Reorder Quantity</th>
            <th style={{ textAlign: "center" }}>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{ textAlign: "center" }}>ABS Battery</td>
            <td style={{ textAlign: "center" }}>BT5698</td>
            <td style={{ textAlign: "center" }}>5</td>
            <td style={{ textAlign: "center" }}></td>
            <td style={{ textAlign: "center" }}></td>
            <td style={{ textAlign: "center" }}>
              <button 
                style={{ 
                  backgroundColor: "#327f87", 
                  color: "white", 
                  border: "none", 
                  padding: "5px 15px", 
                  borderRadius: "4px", 
                  cursor: "pointer" 
                }}
              >
                <Link 
                  to='/admin/order/addorder'
                  style={{ textDecoration: 'none', color: 'white' }}
                >
                  Reorder
                </Link>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default ToBeOrdered;
