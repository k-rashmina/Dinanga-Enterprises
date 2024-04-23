import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function ToBeOrdered() {

  const [items, setItems] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/order/getReorderItems')
      .then(response => setItems(response.data))
      .catch(error => console.error('Error:', error));
  }, []);

  return (
    <div style={{ marginTop: "90px", marginLeft: "10px", width: "97%", display: "flex", justifyContent: "flex-start" }}>
      <div style={{ width: "100%", maxWidth: "1200px" }}>
      <h3 style={{ marginBottom: "30px", marginLeft: "10px", fontWeight: "bold" }}>
        To Be Ordered
      </h3>
        <table className="styled-table" style={{ width: "50%", minWidth: "100%" ,fontSize:"20px"}}>
          <thead>
            <tr>
              <th style={{ textAlign: "center" }}>itemName</th>
              <th style={{ textAlign: "center" }}>itemNumber</th>
              <th style={{ textAlign: "center" }}>Available Quantity</th>
              <th style={{ textAlign: "center" }}>Reorder Level</th>
              <th style={{ textAlign: "center" }}>itemPrice(RS)</th>
              <th style={{ textAlign: "center" }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {items.map(item => (
              <tr key={item._id}>
                <td style={{ textAlign: "center" }}>{item.itemName}</td>
                <td style={{ textAlign: "center" }}>{item.itemNumber}</td>
                <td style={{ textAlign: "center" }}>{item.quantity}</td>
                <td style={{ textAlign: "center" }}>{item.reorderLevel}</td>
                <td style={{ textAlign: "center" }}>{item.itemPrice}</td>
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
                      to={`/admin/order/addorder/${item.itemName}/${item.itemNumber}/${item.itemPrice}`}
                      style={{ textDecoration: 'none', color: 'white' }}
                    >
                      Reorder
                    </Link>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ToBeOrdered;
