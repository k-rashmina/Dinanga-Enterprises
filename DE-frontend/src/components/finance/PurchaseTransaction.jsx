import React from "react";
import { useState } from "react";
import AdminHeader from "../common/AdminHeader";
import FilterForm from "./FilterForm";
import TransactionTable from "./TransactionTable";

export default function PurchaseTransaction() {

  const [PurchTransactionList, setPurchTransactionList] = useState();

  const getPurchTransactions = (transactions) => {

    setPurchTransactionList(transactions);

  }

  console.log('purchase transaction list', PurchTransactionList)

  return(

    <div className="d-flex flex-column" style={{height: '100vh'}}>
      <AdminHeader pageName={'Purchase Transactions'} />
      <FilterForm type={'purchtransactionlist'} emailField={'Supplier'} handleSubmit={getPurchTransactions} />
      {PurchTransactionList ?
        <TransactionTable name={'Supplier'} transactions={PurchTransactionList} />:
        <div className="d-flex justify-content-center align-items-center" style={{height: '394px'}}>
          <h3 className="text-muted">Search Transactions</h3>
        </div>
      }
    </div>

  )

}