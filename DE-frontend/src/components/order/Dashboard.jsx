import React from 'react'
import Chart from './PieChart'

function Dashboard() {
  return (
    <>
    <h3 style={{ marginBottom: "30px", marginLeft: "10px", fontWeight: "bold",marginTop: "80px",fontSize: "35px",alignItems:"center"}}>
        ORDER DASHBOARD
      </h3>
      <Chart />
      </>
  )
}

export default Dashboard