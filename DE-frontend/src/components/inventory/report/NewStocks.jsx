import React, { useState, useEffect } from "react";
import axios from "axios";


function NewStocks() {
  const [stocks, setStocks] = useState([]);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/inventory/weeklyNewStocks"
        );
        setStocks(response.data);
      } catch (error) {
        console.error("Failed to fetch listings:", error);
      }
    };

    fetchListings();
  }, []);

  return (
    <>
      <div>
        
        <h4>Weekly New Stocks</h4>
        <div
          className="align-self-center rounded-5 div-shadow mt-5 ps-4 pb-4 example example1"
          style={{ width: "1140px", overflow: "scroll" }}
        >
          <table className="table-hover example1 " style={{ width: "990px" }}>
            <thead style={{ fontSize: "18px", height: "56px" }}>
              <tr
                className="border-bottom border-dark border-3 pt-3"
                style={{
                  height: "56px",
                  backgroundColor: "#EEEEEE",
                  width: "980px",
                }}
              >
                <th style={{ width: "171px" }}>Item Name</th>
                <th style={{ width: "258px" }}>Received New Stocks(qty)</th>
                <th style={{ width: "206px" }}>Unit Selling Price</th>
                <th style={{ width: "140px" }}>Increased Stock Value</th>
              </tr>
            </thead>
            <tbody className="">
              {stocks.map((stocks, index) => (
                <tr key={index} style={{ height: "50px" }}>
                  <td style={{ width: "171px" }}>{stocks.itemName}</td>
                  <td style={{ width: "258px" }}>
                    {new Intl.NumberFormat("en-LK", {
                      style: "currency",
                      currency: "LKR",
                    }).format(stocks.itemPrice)}
                  </td>
                  <td style={{ width: "206px" }}>{stocks.itemPrice}</td>
                  <td style={{ width: "140px" }}>
                    {new Intl.NumberFormat("en-LK", {
                      style: "currency",
                      currency: "LKR",
                    }).format((stocks.quantity - stocks.previousQuantity) *
                      stocks.itemPrice)}
                  </td>
                  
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default NewStocks;
