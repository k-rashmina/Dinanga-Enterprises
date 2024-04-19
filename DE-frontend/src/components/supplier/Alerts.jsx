import React, { useState } from 'react';
import './Alerts.css';

const OrderAlerts = () => {
  const [orders, setOrders] = useState([
    { id: 1, item: 'Dunith Nethmika', quantity: 'Battery', order: 2 },
    { id: 2, item: 'Kalindu Rashmina', quantity: 'Battery', order: 1 },
    { id: 3, item: 'Naveen Dhakshitha', quantity: 'Radiator', order: 3 },
    { id: 4, item: 'Asiri Alwis', quantity: 'Radiator', order: 3 },
    { id: 5, item: 'Chamath Thilakarathne', quantity: 'Radiator', order: 3 },
    { id: 6, item: 'Amasha Hewage', quantity: 'Battery', order: 3 },
  ]);

  const handleAcceptOrder = (orderId) => {
    // Implement accept order functionality here
    console.log('Order accepted:', orderId);
  };

  const handleRejectOrder = (orderId) => {
    // Implement reject order functionality here
    console.log('Order rejected:', orderId);
  };

  return (
    <div className="order-alerts-container">
      <div className="order-alerts-header">
        <h1><b>Order Alerts & Notification History</b></h1><br />
      </div>
      <div className="order-list">
        {orders.map(order => (
          <div key={order.id} className="order-item">
            <div className="order-info">
              <p><b>Item Code:</b> {order.item}</p>
              <p><b>Quantity:</b> {order.quantity}</p>
              <p><b>Order:</b> {order.order}</p>
            </div>
            <div className="button-group">
              <button className="accept-button" onClick={() => handleAcceptOrder(order.id)}>Accept</button>
              <button className="reject-button" onClick={() => handleRejectOrder(order.id)}>Reject</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderAlerts;
