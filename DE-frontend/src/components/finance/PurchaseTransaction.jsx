import React from "react";
import AdminHeader from "../common/AdminHeader";
import FilterForm from "./FilterForm";
import TransactionTable from "./TransactionTable";

export default function PurchaseTransaction() {

  return(

    <div className="d-flex flex-column" style={{height: '100vh'}}>
      <AdminHeader pageName={'Purchase Transactions'} />
      <FilterForm type={'purchase'} emailField={'Supplier'} />
      <TransactionTable name={'Supplier'}/>
    </div>

  )

}