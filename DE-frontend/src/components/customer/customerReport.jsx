import React from 'react'
import axios from 'axios';
import {saveAs} from 'file-saver';

function customerReport() {

    const generateReport = async()=>{
        const res =  await axios.get('http://localhost:5000/customer/customerReport', {responseType: 'blob'});
        saveAs(new Blob([res.data],{type: 'application/pdf'}), 'customerReport.pdf');
      }
  return (
    <div>
      <button onClick={generateReport}>Generate Report</button>
    </div>
  )
}

export default customerReport