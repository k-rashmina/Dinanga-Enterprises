import React from "react";
import { useState } from "react";
import AdminHeader from "../common/AdminHeader";
import FilterForm from "./FilterForm";
import TransactionTable from "./TransactionTable";

export default function JobTransaction() {

  const [transactList, setTransactList] = useState();

  const getTransactions = (transactions) => {

    setTransactList(transactions);

  }


  console.log(transactList)
  console.log('transactList')
  return(

    <div className="d-flex flex-column" style={{height: '100vh'}}>
      <AdminHeader pageName={'Job Transactions'}/>
      <FilterForm type={'job'} emailField={'Customer'} handleSubmit={getTransactions} />
      {(transactList.length != 0)? 
        <TransactionTable name={'Customer'} transactions={transactList}/> : 
        <div className="d-flex justify-content-center align-items-center" style={{height: '394px'}}>
          <h3 className="text-muted">Search Transactions</h3>
        </div>
      }
    </div>

  )

}