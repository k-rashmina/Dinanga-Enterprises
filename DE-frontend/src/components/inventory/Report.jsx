import React from 'react';
import axios from 'axios';
import {saveAs} from 'file-saver';

function Report() {

  const generateReport = async()=>{
    const res =  await axios.get('http://localhost:5000/inventory/inventoryreport', {responseType: 'blob'});
    saveAs(new Blob([res.data],{type: 'application/pdf'}), 'inventoryReport.pdf');
  }
  return (
    <div>Report
      <button onClick={generateReport}>Generate Report</button>
    </div>
  )
}

export default Report