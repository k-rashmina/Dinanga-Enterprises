import React from "react";
import { Link } from "react-router-dom";
import ReportButton from './../customer/customerReport'
import apimg from '../../assets/adminPanel.jpg'


export default function AdminPanel() {

  return (


    <div className="adminPanelImg">

      <div className="row me-5 ps-5 pe-5" style={{ position: 'relative', backgroundColor: '#00ADB5', width: '100%', height: '70px', textAlign: 'center' }}><h1>Dinanga Enterprises - Admin Portal</h1></div>

      <div className="d-flex flex-wrap justify-content-between ps-5 pe-5 ms-5 me-5 pt-5" style={{ position: 'relative', minHeight: '100vh' }}>
        <Link to={'finance/dashboard'} style={{ textDecoration: 'none', height: '250px' }}>
          <button className="d-flex rounded-5 div-shadow  ps-3 pb-3  mb-4 ms-3 form-button" style={{ width: '400px', height: '250px', backgroundColor: '#00ADB5', color: '#ffffff' }}>
            <h1 className="mt-5 ms-5 mb-5 pt-4" style={{ fontSize: '56px' }}>{`Finance`}</h1>
          </button>
        </Link>
        <Link to={'job/joblist'} style={{ textDecoration: 'none', height: '250px' }}>
          <button className="align-self-center rounded-5 div-shadow  ps-3 pb-3 mb-4 ms-3 form-button" style={{ width: '400px', height: '250px', backgroundColor: '#00ADB5', color: '#ffffff' }}>
            <h1 className="mt-5 ms-5 mb-5 pt-4 ps-5" style={{ fontSize: '56px' }}>{`Jobs`}</h1>
          </button>
        </Link>
        <Link to={'inventory/dashboard'} style={{ textDecoration: 'none', height: '250px' }}>
          <button className="align-self-center rounded-5 div-shadow  ps-4 pb-4 mb-4 ms-3 form-button" style={{ width: '400px', height: '250px', backgroundColor: '#00ADB5', color: '#ffffff' }}>
            <h1 className="mt-5 ms-5 mb-5 pt-4" style={{ fontSize: '56px' }}>{`Inventory`}</h1>
          </button>
        </Link>
        <Link to={'order/dashboard'} style={{ textDecoration: 'none', height: '250px' }}>
          <button className="align-self-center rounded-5 div-shadow  ps-4 pb-4 ms-3 form-button" style={{ width: '400px', height: '250px', backgroundColor: '#00ADB5', color: '#ffffff' }}>
            <h1 className="mt-5 ms-5 mb-5 pt-4" style={{ fontSize: '56px' }}>{`Orders`}</h1>
          </button>
        </Link>
        <Link to={'consultancy/consultancylist'} style={{ textDecoration: 'none', height: '250px' }}>
          <button className="align-self-center rounded-5 div-shadow  ps-4 pb-4 ms-3 form-button" style={{ width: '400px', height: '250px', backgroundColor: '#00ADB5', color: '#ffffff' }}>
            <h1 className="mt-5 ms-3 me-5 mb-5 pt-4" style={{ fontSize: '56px' }}>{`Consultancy`}</h1>
          </button>
        </Link>
        <Link to={'employee/dashboard'} style={{ textDecoration: 'none', height: '250px' }}>
          <button className="align-self-center rounded-5 div-shadow  ps-4 pb-4 ms-3 form-button" style={{ width: '400px', height: '250px', backgroundColor: '#00ADB5', color: '#ffffff' }}>
            <h1 className="mt-5 ms-5 mb-5 pt-4" style={{ fontSize: '56px' }}>{`Employees`}</h1>
          </button>
        </Link>
      </div>
      <div className="d-flex justify-content-center mb-5">
        <div className="repbtn"><ReportButton/></div>
      </div>

    </div>

  );

}