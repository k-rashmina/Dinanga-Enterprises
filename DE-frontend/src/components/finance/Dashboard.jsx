import React, { useEffect, useState } from "react";
import AdminHeader from '../common/AdminHeader';
import {saveAs} from 'file-saver';
import axios from 'axios';
import { Link } from 'react-router-dom';


export default function Dashboard() {

  const [dashboardStats, setDashboardStats] = useState({});

  useEffect(() => {

    axios.get('http://localhost:5000/transaction/getdashboardstat')
    .then(res => setDashboardStats(res.data))

  }, [])

  const handleGenerateReport = async () => {

    const res =  await axios.get('http://localhost:5000/transaction/gettransactionreport', {responseType: 'blob'});
    saveAs(new Blob([res.data],{type: 'application/pdf'}), `TransactionReport - ${new Date().toLocaleString('default', { month: 'long' })}.pdf`);

  }

  return (

    <>
      <AdminHeader pageName={'Dashboard'} />
      <div className="d-flex flex-wrap justify-content-between ps-5 pe-5 ms-5 me-5 pt-5" style={{position: 'relative'}}>
        <h4 className="mb-4" style={{ width: '500px'}}>Job Transactions - This Month</h4>
        <h4 className="mb-4" style={{ width: '500px'}}>Purchase Transactions - This Month</h4>
        <div className="align-self-center rounded-5 div-shadow  ps-4 pb-4 example example1" style={{ width: '500px', height: '250px', position: 'relative', backgroundColor: '#CBFAE0' }}>
          <h5 className="mt-4">{`Job Transaction Count ${dashboardStats.JTStat?.txCount}`}</h5>
          <h1 className="mt-4 ms-5">{`LKR ${dashboardStats.JTStat?.txAmount.toFixed(2)}`}</h1>
          <Link to={'/admin/finance/jobtransactions'}><button className="form-button fw-semibold" style={{position: 'absolute', bottom: '30px', right: '30px'}}>View Transactions</button></Link>
        </div>
        
        <div className="align-self-center rounded-5 div-shadow  ps-4 pb-4 example example1" style={{ width: '500px', height: '250px', position: 'relative', backgroundColor: '#FCC8D4' }}>
          <h5 className="mt-4">{`Purchase Transaction Count ${dashboardStats.PTStat?.txCount}`}</h5>
          <h1 className="mt-4 ms-5">{`LKR ${dashboardStats.PTStat?.txAmount.toFixed(2)}`}</h1>
          <Link to={'/admin/finance/purchasetransactions'}><button className="form-button fw-semibold" style={{position: 'absolute', bottom: '30px', right: '30px'}}>View Transactions</button></Link>
        </div>

        <div className="d-flex justify-content-between div-shadow rounded-5 ps-5 pe-5 pt-4 pb-4 mt-5" style={{width: '100%'}}>
          <h4 className="mb-4 mt-4" style={{ width: '500px'}}>Generate Monthly Transaction Report</h4>
          <button className="align-self-center form-button fw-semibold" style={{width: '200px'}} onClick={() =>  handleGenerateReport()}>Generate Report</button>
        </div>

      </div>
    </>

  )

}