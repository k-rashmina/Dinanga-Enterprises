import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './Alerts.css';
import axios from 'axios';

const OrderAlerts = () => {

  const params = useParams();
  const supid = params.supid;


  // { id: 1, item: 'Dunith Nethmika', quantity: 'Battery', order: 2 },
  // { id: 2, item: 'Kalindu Rashmina', quantity: 'Battery', order: 1 },
  // { id: 3, item: 'Naveen Dhakshitha', quantity: 'Radiator', order: 3 },
  // { id: 4, item: 'Asiri Alwis', quantity: 'Radiator', order: 3 },
  // { id: 5, item: 'Chamath Thilakarathne', quantity: 'Radiator', order: 3 },
  // { id: 6, item: 'Amasha Hewage', quantity: 'Battery', order: 3 },

  const [orders, setOrders] = useState([]);
  const [accOrder, setAccOrder] = useState({});

  const handleAcceptOrder = (order) => {
    
    order.orderstatus = 'accepted';

    setAccOrder(order);

  };



  //Handle order accepting
  useEffect(() => {
    axios.put(`http://localhost:5000/order/updateItem/${accOrder._id}`, accOrder)
    .then(res => alert('Action Completed'))

  }, [accOrder])

  const handleRejectOrder = (order) => {
    order.orderstatus = 'rejected';

    setAccOrder(order);
  };

  useEffect(() => {

    axios.get(`http://localhost:5000/order/getsuporders?supid=${supid}`)
    .then(res => setOrders(res.data)).catch(console.log('failed to load orders'))

  }, [])

  return (
    <div className="order-alerts-container">
      <div className="order-alerts-header">
        <h1><b>Order Alerts & Notification History</b></h1><br />
      </div>
      <div className="order-list">
        {orders.map(order => (
          <div key={order._id} className="order-item">
            <div className="order-info">
              <p><b>Order Number</b> {order.order_number}</p>
              <p><b>Item Name:</b> {order.itemName}</p>
              <p><b>Quantity:</b> {order.quantity}</p>
              <p><b>Date Of Order:</b> {order.dateofOrder.substring(0, 10)}</p>
            </div>
            <div className="button-group">
              <button className="accept-button" onClick={() => handleAcceptOrder(order)}>Accept</button>
              <button className="reject-button" onClick={() => handleRejectOrder(order)}>Reject</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderAlerts;
