import {BrowserRouter, Routes, Route, Link} from 'react-router-dom';
// import { useState } from 'react'
//import { useParams } from 'react-router-dom';
import Layout from './components/common/Layout';
import AdminLayout from './components/common/AdminLayout';
import AdminPanel from './components/common/AdminPanel';


import OrderDashboard from'./components/order/Dashboard';
import OnGoingOrders from './components/order/OnGoingOrders';
import OrderHistory from './components/order/OrderHistory';
import OrderPlacement from './components/order/OrderPlacement';
import OrderReport from './components/order/Report';
import ToBeOrdered from './components/order/ToBeOrdered';

import CustomerRegForm from './components/customer/CustomerRegForm';
import RegLayout from './components/common/RegLayout';
import CustomerProfile from './components/customer/CustomerProfile';
import FeedbackUpDel from './components/customer/FeedbackUpDel';

import AddConsultancy from './components/consultancy/AddConsultancy';
import ConsultantCustomer from './components/consultancy/AddConsultancyCustomer';
import ConsultancyHome from'./components/consultancy/ConsultancyHome'
import ConsultantAdmin from './components/consultancy/ConsultantAdmin';
import ConsultancyTable from './components/consultancy/ConsultancyTable'

import FinDashboard from './components/finance/DashBoard';
import JobTransaction from './components/finance/JobTransaction';
import PurchaseTransaction from './components/finance/PurchaseTransaction';
import AddTransaction from './components/finance/AddTransaction';



import AddItem from './components/inventory/AddItem';
import ItemList from './components/inventory/ItemList';
import DashBoard from './components/inventory/DashBoard';
import Report from './components/inventory/Report';



function App() {


  return (
    <BrowserRouter>
      <Routes>
        {/* main routes */}
        <Route element={<Layout/>}>
          <Route path='/' element={<h2>this is the home page</h2>}/>
          
          <Route path='/about' element/>
          <Route path='/contact' element/>
          <Route path='/cusprofile' element={<CustomerProfile />}/>
          <Route path='/cusfeedback' element={<FeedbackUpDel/>}/>
          <Route path='/job' element/>
          <Route path='/services' element/>
          <Route path='/job/reqjob' element/>
          <Route path='/consultancy' element/>
          <Route path='/consultancy/req' element/>
          <Route path='/consultancy/:consid' element/>
          <Route path='/consultancy' element={<AddConsultancy/>}/>
          <Route path='/consultancy/req' element={<ConsultancyHome/>}/>
          <Route path='/consultancy/:consid' element={<ConsultancyTable/>}/>
          <Route path='/consultancy/customer/:id' element={<ConsultantCustomer/>}/>
          <Route path='/supreg' element/>
          <Route path='/supprofile' element/>
          <Route path='/supalerts' element/>
          <Route path='/supservices' element/>
          <Route path='/supfeedback' element/>
        </Route>
        
        <Route element = {<RegLayout/>} >
          <Route path='/cusreg' element={<CustomerRegForm />} />
          <Route path='/supreg' element/>
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

          <Route path='/admin/finance/dashboard' element={<FinDashboard />}/>
          <Route path='/admin/finance/jobtransactions' element={<JobTransaction />}/>
          <Route path='/admin/finance/purchasetransactions' element={<PurchaseTransaction />}/>
          <Route path='/admin/finance/addtransaction' element={<AddTransaction />}/>

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
          <Route path='/admin/inventory/dashboard' element ={<DashBoard/>}/>
          <Route path='/admin/inventory/itemlist' element = {<ItemList/>}/>
          <Route path='/admin/inventory/additem' element = {<AddItem/>}/>
          <Route path='/admin/inventory/report' element = {<Report/>}/>
        </Route>

        {/* admin order routes */}
        <Route element={<AdminLayout page={'Order'} menu={["Dashboard", "To Be Ordered", "Current Orders", "Order History", "Report"]}/>}>
          <Route path='/admin/order/dashboard' element = {<OrderDashboard/>}/>
          <Route path='/admin/order/tobeordered' element = {<ToBeOrdered/>}/>
          <Route path='/admin/order/addorder' element = {<OrderPlacement/>}/>
          <Route path='/admin/order/currentorders' element = {<OnGoingOrders/>}/>
          <Route path='/admin/order/orderhistory' element = {<OrderHistory/>}/>
          <Route path='/admin/order/report' element = {<OrderReport/>}/>
        </Route>

        {/* admin consultancy routes */}
        <Route element={<AdminLayout page={'Consultancy'} menu={[ "Consultancy List", "Report"]}/>}>
          
          <Route path='/admin/consultancy/consultancylist' element={<ConsultantAdmin/>}/>
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

export default App
