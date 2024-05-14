import React from 'react';
import Chart from './PieChart';
import AdminHeader from '../common/AdminHeader';

function Dashboard() {
  return (
    <>
      <AdminHeader pageName={'Order Dashboard'} />
      <div style={{ backgroundColor: 'white' }}>
        <Chart />
      </div>
    </>
  );
}

export default Dashboard;
