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
     <button onClick={generateReport} className="btn btn-primary" style={{ backgroundColor: '#00ADB5', marginTop: '5px' }}>Generate Customer Report</button>

    </div>
  )
}

export default customerReport