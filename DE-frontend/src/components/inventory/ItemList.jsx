import React, { useState, useEffect } from "react";
import axios from "axios";
import SearchBar from "./SearchBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import AdminHeader from "../common/AdminHeader";

function ItemList() {
  const [inventory, setInventory] = useState([]);
  const [editableItemId, setEditableItemId] = useState(null);
  const [sortCriteria, setSortCriteria] = useState("");
  const [sortTrigger, setSortTrigger] = useState(false);

  useEffect(() => {
    fetchInventoryData();
  }, []);

  const fetchInventoryData = () => {
    axios
      .get("http://localhost:5000/inventory/getAllItems")
      .then((response) => {
        setInventory(response.data);
        setSortTrigger(false); // Reset sorting trigger on data fetch
      })
      .catch((error) => {
        console.error("Error fetching inventory data:", error);
      });
  };

  const handleUpdate = (itemId) => {
    const updatedItem = inventory.find((item) => item._id === itemId);
    axios
      .put(`http://localhost:5000/inventory/updateItem/${itemId}`, updatedItem)
      .then(() => {
        console.log("Item updated successfully");
        setEditableItemId(null); // Exit edit mode
        fetchInventoryData(); // Fetch updated inventory data
      })
      .catch((error) => {
        console.error("Error updating item:", error);
      });
  };

  const handleDelete = (itemId) => {
    axios
      .delete(`http://localhost:5000/inventory/deleteItem/${itemId}`)
      .then(() => {
        setInventory((prevInventory) =>
          prevInventory.filter((item) => item._id !== itemId)
        );
      })
      .catch((error) => {
        console.error("Error deleting item:", error);
      });
  };

  const handleEdit = (itemId) => {
    setEditableItemId(itemId);
  };

  const handleChange = (e, fieldName, itemId) => {
    setInventory((prevInventory) => {
      return prevInventory.map((item) => {
        if (item._id === itemId) {
          return {
            ...item,
            [fieldName]: e.target.value,
          };
        }
        return item;
      });
    });
  };

  const sortInventory = (inventory) => {
    if (!sortTrigger) return inventory; // Return unsorted inventory if sort not triggered

    switch (sortCriteria) {
      case "lowStock":
        return [...inventory].sort((a, b) =>
          a.reorderState === "Low Stocks" && b.reorderState !== "Low Stocks"
            ? -1
            : 1
        );
      case "outOfStock":
        return [...inventory].sort((a, b) =>
          a.reorderState === "Out of Stocks" &&
          b.reorderState !== "Out of Stocks"
            ? -1
            : 1
        );

      case "reorder":
        return [...inventory].sort((a, b) =>
          a.availability === "Reorder" && b.availability !== "Reorder" ? -1 : 1
        );
      default:
        return inventory; // Return unsorted if no criteria is selected
    }
  };

  // Trigger sorting
  const handleSort = () => {
    setSortTrigger(true);
  };

  // Apply sorting if triggered
  const sortedInventory = sortInventory(inventory);

  return (
    <>
      <AdminHeader pageName={'Item List'} />
      <div className="container mt-5" style={{width: '1200px', backgroundColor: '#EEEEEE'}}>
        <div className="d-flex rounded-5 justify-content-between mb-5 div-shadow" style={{backgroundColor: '#EEEEEE'}}>
          <div
            className="d-flex align-items-center justify-content-end pe-4"
            style={{ width: "333px", marginLeft: "60px" }}
          >
            <label
              style={{ fontSize: "18px", whiteSpace: "nowrap" }}
              htmlFor="sort"
            >
              Sort Table
            </label>
            <select
              className="ms-3 me-0 filter-input rounded-2"
              name="sort"
              value={sortCriteria}
              onChange={(e) => setSortCriteria(e.target.value)}
              style={{ width: "200px" }}
            >
              <option value="">Select Sorting Criteria</option>
              <option value="lowStock">Low Stock First</option>
              <option value="outOfStock">Out of Stock</option>
              <option value="reorder">Reorder Items First</option>
            </select>

            <button
              className="form-button rounded-5 ms-9 fw-semibold"
              type="button"
              name="submit"
              onClick={handleSort}
            >
              Sort
            </button>
          </div>

          <SearchBar />
        </div>

        <center>
          <div className=" rounded-5 div-shadow mt-5 pb-4 example example1" style={{width: '1180px', height: '450px', overflow: 'scroll', backgroundColor: '#EEEEEE'}}>

          <table className="table-hover example1" style={{width: '1090px', backgroundColor: '#EEEEEE'}}>
            <thead  style={{fontSize: '18px', height: '90px', marginBottom: '10px'}}>
              <tr className="border-bottom border-dark border-3 pt-3" style={{position: 'fixed', height: '82px', backgroundColor: '#EEEEEE', width: '1105px'}}>
                <th style={{width: '244px'}}>Item Name</th>
                <th style={{width: '107px'}}>Quantity</th>
                <th style={{width: '117px'}}>Reorder Level</th>
                <th style={{width: '141px'}}>Reorder State</th>
                <th style={{width: '173px'}}>Unit Price</th>
                <th style={{width: '163px'}}>Availability</th>
                <th style={{width: '172px'}} >Actions</th>
              </tr>
            </thead>
            <tbody
              className=""
              // style={{
              //   boxShadow: "0px 0px 10px 2px rgba(0,0,0,0.4)",
              //   borderRadius: "10px",
              // }}
            >
              {sortedInventory.map((item) => (
                <tr key={item._id} style = {{height:'50px'}}>
                  <td style = {{width:'374px'}}>
                    {editableItemId === item._id ? (
                      <input
                        type="text"
                        className="form-control"
                        id="form-control"
                        value={item.itemName}
                        onChange={(e) => handleChange(e, "itemName", item._id)}
                      />
                    ) : (
                      item.itemName
                    )}
                  </td>
                  <td style = {{width:'168px' }}>
                    {editableItemId === item._id ? (
                      <input
                        type="number"
                        className="form-control"
                        id="form-control"
                        value={item.quantity}
                        onChange={(e) => handleChange(e, "quantity", item._id)}
                      />
                    ) : (
                      item.quantity
                    )}
                  </td>
                  <td style = {{width:'196px'}}>
                    {editableItemId === item._id ? (
                      <input
                        type="number"
                        className="form-control"
                        id="form-control"
                        value={item.reorderLevel}
                        onChange={(e) => handleChange(e, "reorderLevel", item._id)}
                      />
                    ) : (
                      item.reorderLevel
                    )}
                  </td>
                  <td style = {{width:'196px'}}>
                    {editableItemId === item._id ? (
                      <input
                        type="text"
                        className="form-control"
                        id="form-control"
                        value={item.reorderState}
                        onChange={(e) => handleChange(e, "reorderState", item._id)}
                      />
                    ) : (
                      item.reorderState
                    )}
                  </td>

                  <td style = {{width:'252px'}}>
                    {editableItemId === item._id ? (
                      <input
                        type="number"
                        className="form-control"
                        id="form-control"
                        value={item.itemPrice}
                        onChange={(e) => handleChange(e, "itemPrice", item._id)}
                      />
                    ) : (
                      new Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: "LKR",
                      }).format(item.itemPrice)
                    )}
                  </td>

                  <td style = {{width:'163px'}}>
                    {editableItemId === item._id ? (
                      <select
                        className="form-select"
                        id="form-control"
                        value={item.availability}
                        onChange={(e) => handleChange(e, "availability", item._id)}
                      >
                        <option value="Available">Available</option>
                        <option value="Reorder">Reorder</option>
                      </select>
                    ) : (
                      item.availability
                    )}
                  </td>
                  <td style = {{width:'258px'}}>
                    {editableItemId === item._id ? (
                      <>
                        <button
                          className="form-button rounded-5 fw-semibold"
                          onClick={() => handleUpdate(item._id)}
                        >
                          Save
                        </button>
                        <button
                          className="form-button rounded-5 fw-semibold"
                          onClick={() => setEditableItemId(null)}
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          style={{ width: "90px" }}
                          className="form-button rounded-5 fw-semibold"
                          onClick={() => handleEdit(item._id)}
                        >
                          <FontAwesomeIcon icon={faEdit} size="lg" />
                        </button>
                        <button
                          style={{ width: "90px" }}
                          className="form-button rounded-5 fw-semibold"
                          onClick={() => handleDelete(item._id)}
                        >
                          <FontAwesomeIcon icon={faTrash} size="lg" />
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
            </div>
            </center>
        
      </div>
    </>
    //   </div>
    // </div>
    // </div>
  );
}

export default ItemList;
