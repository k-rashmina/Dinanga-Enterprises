import React from 'react';
import axios from 'axios';
import {saveAs} from 'file-saver';
import NewListings from './report/NewListings';
import NewStocks from './report/NewStocks';
import SoldItems from './report/SoldItems';
import AdminHeader from '../common/AdminHeader';

function Report() {

  const generateReport = async()=>{
    const res =  await axios.get('http://localhost:5000/inventory/inventoryreport', {responseType: 'blob'});
    saveAs(new Blob([res.data],{type: 'application/pdf'}), 'inventoryReport.pdf');
  }
  return (
    <div >
      <AdminHeader pageName={'Report'}/>
      <button onClick={generateReport}>Generate Report</button>
      <center>
      <NewListings/>
      <NewStocks/>
      <SoldItems/>
      </center>
      
      
    </div>
  )
}

export default Report