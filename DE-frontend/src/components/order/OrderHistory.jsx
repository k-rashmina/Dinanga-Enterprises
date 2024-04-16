import React, { useState } from 'react';

const OrderHistory = () => {
  // Sample array of orders
  const [orders, setOrders] = useState([
    {
      id: 1,
      date: '2024-04-10',
      items: ['Item 1', 'Item 2'],
      total: 100
    },
    {
      id: 2,
      date: '2024-04-05',
      items: ['Item 3', 'Item 4'],
      total: 150
    },
    {
      id: 3,
      date: '2024-04-01',
      items: ['Item 5'],
      total: 50
    }
  ]);

  return (
    <div>
      <h5>Order History</h5>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Date</th>
            <th>Items</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.date}</td>
              <td>{order.items.join(', ')}</td>
              <td>${order.total}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderHistory;
