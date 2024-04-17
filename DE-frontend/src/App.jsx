import {BrowserRouter, Routes, Route, Link} from 'react-router-dom';
// import { useState } from 'react'
import Layout from './components/common/Layout';
import AdminLayout from './components/common/AdminLayout';
import AdminPanel from './components/common/AdminPanel';
import RegLayout from './components/common/RegLayout';
import SupplierRegForm from './components/supplier/SupplierRegForm';
import SupplierProfile from './components/supplier/SupplierProfile';
import ServicesProvided from './components/supplier/ServicesProvided';
import OrderAlerts from './components/supplier/Alerts';
import FeedbackTable from './components/supplier/FeedbackTable';


function App() {

  return (
    <BrowserRouter>
      <Routes>
        {/* main routes */}
        <Route element={<Layout/>}>
          <Route path='/' element={<h2>this is the home page</h2>}/>
          
          <Route path='/about' element/>
          <Route path='/contact' element/>
          <Route path='/cusprofile' element/>
          <Route path='/cusfeedback' element/>
          <Route path='/job' element/>
          <Route path='/services' element/>
          <Route path='/job/reqjob' element/>
          <Route path='/consultancy' element/>
          <Route path='/consultancy/req' element/>
          <Route path='/consultancy/:consid' element/>
          <Route path='/supprofile' element = {<SupplierProfile/>}/>
          <Route path='/supalerts' element = {<OrderAlerts/>}/>
          <Route path='/supservices' element= {<ServicesProvided/>}/>
          <Route path='/supfeedback' element= {<FeedbackTable/>}/>
        </Route>
        
        <Route element = {<RegLayout/>} >
          <Route path='/cusreg' element />
          <Route path='/supreg' element={<SupplierRegForm />}/>
        </Route>

        {/* employee routes */}
        {/* <Route element={EmpLayout}>
          <Route path='/emplogin' element/>
          <Route path='/empprofile' element/>
          <Route path='/empjobs' element/>
          <Route path='/empconsultancy' element/>
        </Route> */}
        
        <Route path='/admin' element={<AdminPanel/>}/>

        {/* admin finance routes */}
        <Route element={<AdminLayout page={'Finance'} menu={["Dashboard", "Job Transactions", "Purchase Transactions", "Add Transaction", "Refunds", "Reports"]}/>}>
          <Route path='/admin/finance/dashboard' element={<div>Dashboard</div>}/>
          <Route path='/admin/finance/jobtransactions' element/>
          <Route path='/admin/finance/purchasetransactions' element/>
          <Route path='/admin/finance/addtransaction' element/>
          <Route path='/admin/finance/refunds' element/>
          <Route path='/admin/finance/reports' element/>
        </Route>

        {/* admin job routes */}
        <Route element={<AdminLayout page={'Job'} menu={["Job List", "Add Job"]}/>}>
          <Route path='/admin/job/joblist' element/>
          <Route path='/admin/job/addjob' element/>
          <Route path='/admin/job/updatejob' element/>
          <Route path='/admin/job/deletejob' element/>
        </Route>

        {/* admin inventory routes */}
        <Route element={<AdminLayout page={'Inventory'} menu={["Dashboard", "Item List", "Add Item", "Report"]}/>}>
          <Route path='/admin/inventory/dashboard' element/>
          <Route path='/admin/inventory/itemlist' element/>
          <Route path='/admin/inventory/additem' element/>
          <Route path='/admin/inventory/report' element/>
        </Route>

        {/* admin order routes */}
        <Route element={<AdminLayout page={'Order'} menu={["Dashboard", "To Be Ordered", "Add Order", "Current Orders", "Order History", "Report"]}/>}>
          <Route path='/admin/order/dashboard' element/>
          <Route path='/admin/order/tobeordered' element/>
          <Route path='/admin/order/addorder' element/>
          <Route path='/admin/order/currentorders' element/>
          <Route path='/admin/order/orderhistory' element/>
          <Route path='/admin/order/report' element/>
        </Route>

        {/* admin consultancy routes */}
        <Route element={<AdminLayout page={'Consultancy'} menu={["Dashboard", "Consultancy List", "Report"]}/>}>
          <Route path='/admin/consultancy/dashboard' element/>
          <Route path='/admin/consultancy/consultancylist' element/>
          <Route path='/admin/consultancy/:consid' element/>
          <Route path='/admin/consultancy/report' element/>
        </Route>

        {/* admin employee routes */}
        <Route element={<AdminLayout page={'Employee'} menu={["Dashboard", "Add Employee", "Reports"]}/>}>
          <Route path='/admin/employee/dashboard' element/>
          <Route path='/admin/employee/addemployee' element/>
          <Route path='/admin/employee/:empid' element/>
          <Route path='/admin/employee/report' element/>
        </Route>

      </Routes>
    </BrowserRouter>
    // <BrowserRouter>
    //   <Routes>
    //     <Route element={<Layout/>}>
    //       <Route path='/about' element={<p>hello</p>}/>
    //     </Route>
    //     <Route element={<AdminLayout/>}>
    //       <Route path='/admin/about' element={<p>hello admin</p>}/>
    //     </Route>
    //   </Routes>
    // </BrowserRouter>
  )
}

export default App
