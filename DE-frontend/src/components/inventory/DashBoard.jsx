import React from "react";
import CardList from "./cards/CardList";
import InventoryStockValueChart from "./charts/InventoryStockValueChart";
import InventoryStockStatus from "./charts/InventoryStockStatus";
import SearchBar from "./SearchBar";
function DashBoard() {
  return (
    <div>
      
        
        <SearchBar />
     
      <CardList/>

      <div className="d-flex justify-content-center">
        <InventoryStockValueChart />
      </div>
      <div ClassName="shadow p-3 mb-5 bg-white rounded">
        <InventoryStockStatus />
      </div>
    </div>
  );
}

export default DashBoard;
