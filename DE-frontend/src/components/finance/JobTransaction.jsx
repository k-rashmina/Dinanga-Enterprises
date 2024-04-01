import React from "react";
import AdminHeader from "../common/AdminHeader";
import FilterForm from "./FilterForm";
import TransactionTable from "./TransactionTable";

export default function JobTransaction() {

  return(

    <div className="d-flex flex-column" style={{height: '100vh'}}>
      <AdminHeader pageName={'Job Transactions'}/>
      <FilterForm type={'job'} emailField={'Customer'} />
      <TransactionTable name={'Customer'}/>
    </div>

  )

}