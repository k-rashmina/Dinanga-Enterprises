import React from "react";
import { Link } from "react-router-dom";
import apimg from '../../assets/adminPanel.jpg'

export default function AdminPanel() {

  return (

    <>
      <div className="adminPanelImg">

      <div className="row me-5 ps-5 pe-5" style={{position: 'relative', backgroundColor: '#00ADB5', width: '100%', height: '70px', textAlign: 'center'}}><h1>Dinanga Enterprises - Admin Portal</h1></div>

        <div className="d-flex flex-wrap justify-content-between ps-5 pe-5 ms-5 me-5 pt-5" style={{ position: 'relative' }}>

          <Link to={'finance/dashboard'} style={{ textDecoration: 'none' }}>
            <div className="align-self-center rounded-5 div-shadow  ps-3 pb-3 example example1 mb-4 ms-3" style={{ width: '400px', height: '250px', overflow: 'scroll', position: 'relative', backgroundColor: '#9A38C2', color: '#ffffff' }}>
              <h1 className="mt-5 ms-5 mb-5 pt-4" style={{fontSize: '56px'}}>{`Finance`}</h1>
            </div>
          </Link>
          <Link to={'job/joblist'} style={{ textDecoration: 'none' }}>
            <div className="align-self-center rounded-5 div-shadow  ps-3 pb-3 example example1 mb-4 ms-3" style={{ width: '400px', height: '250px', overflow: 'scroll', position: 'relative', backgroundColor: '#86A81A', color: '#ffffff' }}>
              <h1 className="mt-5 ms-5 mb-5 pt-4" style={{fontSize: '56px'}}>{`Jobs`}</h1>
            </div>
          </Link>
          <Link to={'inventory/dashboard'} style={{ textDecoration: 'none' }}>
            <div className="align-self-center rounded-5 div-shadow  ps-4 pb-4 example example1 mb-4 ms-3" style={{ width: '400px', height: '250px', overflow: 'scroll', position: 'relative', backgroundColor: '#E27C16', color: '#ffffff' }}>
              <h1 className="mt-5 ms-5 mb-5 pt-4" style={{fontSize: '56px'}}>{`Inventory`}</h1>
            </div>
          </Link>
          <Link to={'order/dashboard'} style={{ textDecoration: 'none' }}>
            <div className="align-self-center rounded-5 div-shadow  ps-4 pb-4 example example1 ms-3" style={{ width: '400px', height: '250px', overflow: 'scroll', position: 'relative', backgroundColor: '#0B47D9', color: '#ffffff' }}>
              <h1 className="mt-5 ms-5 mb-5 pt-4" style={{fontSize: '56px'}}>{`Orders`}</h1>
            </div>
          </Link>
          <Link to={'consultancy/consultancylist'} style={{ textDecoration: 'none' }}>
            <div className="align-self-center rounded-5 div-shadow  ps-4 pb-4 example example1 ms-3" style={{ width: '400px', height: '250px', overflow: 'scroll', position: 'relative', backgroundColor: '#0EB5BD', color: '#ffffff' }}>
              <h1 className="mt-5 ms-5 me-5 mb-5 pt-4" style={{fontSize: '56px'}}>{`Consultancy`}</h1>
            </div>
          </Link>
          <Link to={'employee/dashboard'} style={{ textDecoration: 'none' }}>
            <div className="align-self-center rounded-5 div-shadow  ps-4 pb-4 example example1 ms-3" style={{ width: '400px', height: '250px', overflow: 'scroll', position: 'relative', backgroundColor: '#BD0E46', color: '#ffffff' }}>
              <h1 className="mt-5 ms-5 mb-5 pt-4" style={{fontSize: '56px'}}>{`Employees`}</h1>
            </div>
          </Link>
        </div>

      </div>

      {/* <div className="me-5"><Link to='finance/dashboard'>Finance</Link></div>
        <div className="me-5"><Link to='job/joblist'>Jobs</Link></div>
        <div className="me-5"><Link to='inventory/dashboard'>Inventory</Link></div>
        <div className="me-5"><Link to='order/dashboard'>Orders</Link></div>
        <div className="me-5"><Link to='consultancy/consultancylist'>Consultancy</Link></div>
        <div className="me-5"><Link to='employee/dashboard'>Employee</Link></div> */}

    </>

  )

}