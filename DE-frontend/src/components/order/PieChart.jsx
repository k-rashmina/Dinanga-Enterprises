// OrderChart.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Chart } from 'react-google-charts';

const OrderChart = () => {
  const [statusCounts, setStatusCounts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/order/getStatusCount')
      .then(res => {
        setStatusCounts(res.data);
      })
      .catch(err => {
        console.error(err);
      });
  }, []);

  return (
    <div>
      <Chart
        width={'1000px'}
        height={'800px'}
        chartType="PieChart"
        loader={<div>Loading Chart</div>}
        data={[
          ['Status', 'Count'],
          ...statusCounts.map(({ _id, count }) => ([_id, count]))
        ]}
        options={{
          
          is2D: true,
        }}
        rootProps={{ 'data-testid': '1' }}
      />
    </div>
  );
};

export default OrderChart;
