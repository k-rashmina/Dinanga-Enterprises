import React, { useState, useEffect } from 'react';
import axios from 'axios';

function OrderHistory() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Fetch data from the API
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/order/getacceptedOrders');
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div style={{ marginTop: "90px", width: '100%' }}>
      <h3 style={{ marginBottom: "30px", marginLeft: "20px", fontWeight: "bold", width: '100%' }}>
        Order History
      </h3>
      <table className="styled-table" style={{ width: "50%", minWidth: "100%" ,fontSize:"20px", marginLeft: "10px"}}>
        <thead>
          <tr>
            <th>itemName</th>
            <th>itemNumber</th>
            <th>Quantity</th>
            <th>Order Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order._id}>
              <td>{order.itemName}</td>
              <td>{order.itemNumber}</td>
              <td>{order.quantity}</td>
              <td>{order.orderstatus}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default OrderHistory;
