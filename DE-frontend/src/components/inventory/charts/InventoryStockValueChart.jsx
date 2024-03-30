

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Chart } from 'react-google-charts';

const InventoryStockValueChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/inventory/stockValueChart');
        setData(response.data.map(item => ([item.itemName, item.stockPrice, item.quantity])));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div style={{ width: '100%', maxWidth: 900 }}>
      <Chart
        width={'100%'}
        height={'400px'}
        chartType="Bar"
        loader={<div>Loading Chart</div>}
        data={[
          ['Item Name', 'Stock Price', 'Quantity'],
          ...data 
        ]}
        options={{
          title: 'Inventory Stock Value and Quantity',
          chartArea: { width: '50%' },
          series: {
            0: { axis: 'StockPrice' }, // Bind series 0 to an axis named 'StockPrice'.
            1: { axis: 'Quantity' } // Bind series 1 to an axis named 'Quantity'.
          },
          axes: {
            x: {
              StockPrice: {label: 'Stock Price'}, // Define an axis to show 'Stock Price' label.
              Quantity: {side: 'top', label: 'Quantity'} // Define a second x-axis for 'Quantity'.
            }
          },
          hAxis: {
            title: 'Values',
          },
          vAxis: {
            title: 'Item Name',
          },
        }}
      />
    </div>
  );
};

export default InventoryStockValueChart;








