import React from "react";
import { Link } from "react-router-dom";

export default function AdminPanel() {

  return(

    <>
        <div className="me-5"><Link to='finance/dashboard'>Finance</Link></div>
        <div className="me-5"><Link to='job/joblist'>Jobs</Link></div>
        <div className="me-5"><Link to='inventory/dashboard'>Inventory</Link></div>
        <div className="me-5"><Link to='order/dashboard'>Orders</Link></div>
        <div className="me-5"><Link to='consultancy/dashboard'>Consultancy</Link></div>
        <div className="me-5"><Link to='employee/dashboard'>Employee</Link></div>
    </>

  )

}