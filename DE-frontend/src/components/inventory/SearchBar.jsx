import React, { useState, useEffect } from "react";
import axios from "axios";
import PopUp from "./popup/PopUp";

function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState("");
  const [buttonPopup, setButtonPopup] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    if (searchTerm.trim() !== "") {
      axios
        .get(`http://localhost:5000/inventory/searchItem/${searchTerm}`)
        .then((response) => {
          console.log("Search results:", response.data);
          setSearchResults(response.data.searchResults);
          setError("");
        })
        .catch((error) => {
          console.error("Error searching inventory:", error);
          setSearchResults([]);
          setError("An error occurred while searching. Please try again.");
        });
    } else {
      setSearchResults([]); // Clear search results when search term is empty
      setError("");
    }
  }, [searchTerm]);

  return (
    <div className="container mt-5">
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search inventory..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          className="btn btn-primary"
          type="button"
          onClick={() => setSearchTerm("")}
        >
          Clear
        </button>
      </div>
      {error && <div className="alert alert-danger">{error}</div>}
      {searchResults.length > 0 && ( // Render search results only when there are results
        <div className="card shadow">
          <div className="card-body">
            <h2 className="card-title">Search Results</h2>
            <table className="table table-bordered table-hover">
              <thead>
                <tr>
                  <th>Item Number</th>
                  <th>Item Name</th>
                  <th>Quantity</th>
                  <th>Reorder Level</th>
                  <th>Reorder State</th>
                  <th>Availability</th>
                </tr>
              </thead>
              <tbody>
                {searchResults.map((item) => (
                  <tr key={item._id}>
                    <td>{item.itemNumber}</td>
                    <td>{item.itemName}</td>
                    <td>{item.quantity}</td>
                    <td>{item.reorderLevel}</td>
                    <td>{item.reorderState}</td>
                    <td>{item.availability}</td>
                    <button
                      className="btn btn-info"
                      onClick={() => {
                        setButtonPopup(true);
                        setSelectedItem(item);
                      }}
                    >
                      view Details
                    </button>
                    <PopUp
                      props={{
                        trigger: buttonPopup,
                        setTrigger: setButtonPopup,
                      }}
                      selectedItem={selectedItem}
                    ></PopUp>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default SearchBar;
