import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './Alerts.css';
import SupLogo from '../../assets/SupplierCompanyLogo.png';
import axios from 'axios';

const OrderAlerts = () => {

  const params = useParams();
  const supid = params.supid;

  const [orders, setOrders] = useState([]);
  const [accOrder, setAccOrder] = useState({});
  const [statusMessage, setStatusMessage] = useState('');

  const handleAcceptOrder = (order) => {
    order.orderstatus = 'accepted';
    setAccOrder(order);
    setStatusMessage('Order Accepted');
  };

  const handleRejectOrder = (order) => {
    order.orderstatus = 'rejected';
    setAccOrder(order);
    setStatusMessage('Order Rejected');
  };

  useEffect(() => {
    if (statusMessage !== '') {
      setTimeout(() => {
        setStatusMessage('');
      }, 3000); 
    }
  }, [statusMessage]);

  useEffect(() => {
    axios.put(`http://localhost:5000/order/updateItem/${accOrder._id}`, accOrder)
      .then(res => console.log('Order Accepted'))
      .catch(err => console.error(err));
  }, [accOrder]);

  useEffect(() => {
    axios.get(`http://localhost:5000/order/getsuporders?supid=${supid}`)
      .then(res => setOrders(res.data))
      .catch(err => console.error('Failed to load orders:', err));
  }, []);

  const handleDownloadPDF = () => {
    printPDF();
  };

  const printPDF = () => {
    const htmlContent = generateHTMLForPDF();
    const windowContent = '' + htmlContent + '</body></html>';
    const printWin = window.open('', '', 'width=1024,height=768');
    printWin.document.open();
    printWin.document.write(windowContent);
    printWin.document.close();
    printWin.print();
  };

  const generateHTMLForPDF = () => {
    let html =
      `<div style="text-align: center; font-size: 40px; font-family: Calibri; margin-bottom: 10px; display: flex; align-items: center; justify-content: center;">
        <img src=${SupLogo} alt="Supplier Logo" style="height: 120px; width: 120px;">
        <b>Dinanga Enterprises</b>
      </div>
      <div style="text-align: center; font-size: 14px; font-family: Calibri; margin-bottom: 10px;">
        <b>Address: 68 Paraththa Rd, Panadura 12500</b>
      </div>
      <div style="text-align: center; font-size: 14px; font-family: Calibri; margin-bottom: 10px;">
        <b>Telephone: +94 71 126 1449<b>
      </div>
      <hr/>`;
  
    html +=
      `<h1 style="text-align: center; font-size: 24px;">Order Details & History</h1>
      <table border="1" style="width: 80%; margin: 0 auto; text-align: center;">
        <tr>
          <th>Order Number</th>
          <th>Item Name</th>
          <th>Quantity</th>
          <th>Date Of Order</th>
        </tr>`;
  
    html += orders.map(order => (
      `<tr key=${order._id}>
        <td>${order.order_number}</td>
        <td>${order.itemName}</td>
        <td>${order.quantity}</td>
        <td>${order.dateofOrder.substring(0, 10)}</td>
      </tr>`
    )).join('');
  
    html += `</table>`;
  
    return html;
  };

  return (
    <div className="order-alerts-container">
      {statusMessage && <div className="success-message">{statusMessage}</div>}
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
      <br></br><br></br>
      <div>
        <button className="download-report-button" onClick={handleDownloadPDF}>Download Report</button>
      </div>
    </div>
  );
};

export default OrderAlerts;