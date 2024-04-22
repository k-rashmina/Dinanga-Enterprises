import React, { useState, useEffect } from "react";
import axios from "axios";
import PopUp from "./popup/PopUp";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

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
    < div className="d-flex justify-content-end" >
    <div className="d-flex align-items-center justify-content-end pe-4 align-items-center" style={{width: '400px'}}>
    <div className="container" style={{backgroundColor: '#EEEEEE'}}>
      <div className="input-group mb-3">
      <div style={{ position: 'relative' }}>
      <FontAwesomeIcon icon={faSearch} size = "lg" style={{ position: 'absolute', top: '14px', left: '10px' }} />
        <input 
          style={{border:'3px solid #00ADB5',backgroundColor:'#EEEEEE',paddingLeft: '40px'}}
          type="text"
          className="form-control"
          placeholder="Search inventory..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        </div>
        <button
          className="form-button rounded-5 fw-semibold"
          type="button"
          onClick={() => setSearchTerm("")}
        >
          Clear
        </button>
        
      </div>
      {error && <div className="alert alert-danger"style = {{position:'absolute',}}>{error}</div>}
      {searchResults.length > 0 && ( // Render search results only when there are results
       
        <table style = {{position:'absolute', zIndex: 9999,background:'#FFFFFF',borderRadius:'10px', backgroundColor:'#EEEEEE',fontSize:'20px'}}>
          
          <tbody>
            {searchResults.map((item) => (
              <tr key={item._id}>
               
                <td style = {{padding:'0.3rem'}}>{item.itemName}</td>
                <td style = {{padding:'0.3rem'}}>
                <a
                  href="#!"
                  onClick={(e) => {
                    e.preventDefault(); // Prevent default link behavior
                    setButtonPopup(true);
                    setSelectedItem(item);
                  }}
                  style={{ cursor: "pointer", textDecoration: "none" }} 
                >
                  View Details
                </a>
                </td>
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
        //   </div>
        // </div>
      )}
    </div>
    </div>
    </div>
  );
  
}

export default SearchBar;