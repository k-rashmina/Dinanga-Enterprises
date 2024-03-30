import React from "react";
import CardList from "./cards/CardList";
import InventoryStockValueChart from "./charts/InventoryStockValueChart";
import InventoryStockStatus from "./charts/InventoryStockStatus";
function DashBoard() {
  return (
    <div>
      <CardList/>
      <InventoryStockValueChart/>
      <InventoryStockStatus/>
      <div className="card mb-3" style={{width: "18rem"}}>
        <div className="card-body">
          <h5 className="card-title">Special title treatment</h5>
          <p className="card-text">
            With supporting text below as a natural lead-in to additional
            content.
          </p>
          <a href="#" class="btn btn-primary">
            Go somewhere
          </a>
        </div>
      </div>

      <div className="card text-center mb-3"  style={{width: "18rem"}}>
        <div className="card-body">
          <h5 className="card-title">Special title treatment</h5>
          <p className="card-text">
            With supporting text below as a natural lead-in to additional
            content.
          </p>
          <a href="#" class="btn btn-primary">
            Go somewhere
          </a>
        </div>
      </div>

      <div className="card text-end"  style={{width: "18rem"}}>
        <div className="card-body">
          <h5 className="card-title">Special title treatment</h5>
          <p className="card-text">
            With supporting text below as a natural lead-in to additional
            content.
          </p>
          <a href="#" className="btn btn-primary">
            Go somewhere
          </a>
        </div>
      </div>
    </div>
  );
}

export default DashBoard;
