import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminHeader from "../common/AdminHeader";
import SupLogo from "../../assets/DELogo.png";

function OrderHistory() {
  const [orders, setOrders] = useState([]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  };

  useEffect(() => {
   
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
      <img src="${SupLogo}" alt="Company logo" style="height: 120px; width: 120px;">
      <b>Dinanga Enterprises</b>
    </div>
    <div style="text-align: center; font-size: 14px; font-family: Calibri; margin-bottom: 10px;">
      <b>Address: 68 Paraththa Rd, Panadura 12500</b>
    </div>
    <div style="text-align: center; font-size: 14px; font-family: Calibri; margin-bottom: 10px;">
      <b>Telephone: +94 71 126 1449</b>
    </div>
    <hr/>`;

    html +=
      `<h1 style="text-align: center; font-size: 30px;">Order History</h1>
        <table border="5" style="width: 80%; margin: 0 auto; text-align: center; height:200px">
          <tr>
            <th>itemName</th>
            <th>itemNumber</th>
            <th>Quantity</th>
            <th>supplierEmail</th>
            <th>DateofOrder</th>
            <th>Order Status</th>
            
          </tr>`;

    html += orders.map(order => (
      `<tr key=${order._id}>
        <td>${order.itemName}</td>
        <td>${order.itemNumber}</td>
        <td>${order.quantity}</td>
        <td>${order.supplierName.Supplier_email}</td>
        <td>${formatDate(order.dateofOrder)}</td>
        <td>${order.orderstatus}</td>
        
        
      </tr>`
    )).join('');

    html += '</table>';

    html +=
      '<div style="text-align: center; font-size: 20px; font-weight: bold; margin-top: 20px;">' +
      '  Total Number of Orders placed is ' + orders.length +
      '</div>';

    return html;
  };

  return (
    <>
     <AdminHeader pageName={'Order History'} />
    <div style={{ marginTop: "30px", width: '100%' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingRight: '20px' }}>
        <h3 style={{ marginBottom: "50px", marginLeft: "20px", fontWeight: "bold" }}>
          
        </h3>
        <button onClick={handleDownloadPDF} style={{ fontSize: '16px', padding: '10px 20px', borderRadius: '4px', backgroundColor: '#00ADB5', color: '#fff', border: '2px'}}>
          Generate PDF
        </button>
      </div>
      <table className="styled-table" style={{ width: "50%", minWidth: "100%", fontSize: "20px", marginLeft: "10px" }}>
        <thead>
          <tr>
            <th>itemName</th>
            <th>itemNumber</th>
            <th>Quantity</th>
            <th>supplierEmail</th>
            <th>Order Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order._id}>
              <td>{order.itemName}</td>
              <td>{order.itemNumber}</td>
              <td>{order.quantity}</td>
              <td>{order.supplierName?.Supplier_email}</td>
              <td>{order.orderstatus}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </>
  );
}

export default OrderHistory;
