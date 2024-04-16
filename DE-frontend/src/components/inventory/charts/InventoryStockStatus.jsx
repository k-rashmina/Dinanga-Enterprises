import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Chart } from 'react-google-charts';

const InventoryStockStatus = () => {
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/inventory/stockStatus');
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  // Default values for missing categories
  const defaultData = { 'In Stocks': 0, 'Low Stocks': 0, 'Out of Stocks': 0 };

  return (
    <div style={{ width: '100%', maxWidth: 900 }}>
      <Chart
        width={'100%'}
        height={'400px'}
        chartType="PieChart"
        loader={<div>Loading Chart</div>}
        data={[
          ['Reorder State', 'Count'],
          ['In Stocks', data['In Stocks'] || defaultData['In Stocks']],
          ['Low Stocks', data['Low Stocks'] || defaultData['Low Stocks']],
          ['Out of Stocks', data['Out of Stocks'] || defaultData['Out of Stocks']]
        ]}
        options={{
          title: 'Inventory Stock Status',
        }}
      />
    </div>
  );
};

export default InventoryStockStatus;
