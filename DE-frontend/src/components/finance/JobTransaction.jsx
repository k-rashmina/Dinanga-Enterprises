import React from "react";
import { useState } from "react";
import AdminHeader from "../common/AdminHeader";
import FilterForm from "./FilterForm";
import TransactionTable from "./TransactionTable";

export default function JobTransaction() {

  const [jobtransactList, setJobTransactList] = useState();

  const getTransactions = (transactions) => {

    setJobTransactList(transactions);

  }


  console.log('jobtransactList', jobtransactList)

  return(

    <div className="d-flex flex-column" style={{height: '100vh'}}>
      <AdminHeader pageName={'Job Transactions'}/>
      <FilterForm type={'jobtransactionlist'} emailField={'Customer'} handleSubmit={getTransactions} />
      {jobtransactList? 
        <TransactionTable name={'Customer'} transactions={jobtransactList}/> : 
        <div className="d-flex justify-content-center align-items-center" style={{height: '394px'}}>
          <h3 className="text-muted">No Transactions</h3>
        </div>
      }
    </div>

  )

}