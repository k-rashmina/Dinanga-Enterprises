import React, { useState, useEffect } from "react";
import axios from "axios";
import SearchBar from "./SearchBar";

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
        return [...inventory].sort((a,b) =>
          a.reorderState === "Low Stocks" && b.reorderState !== "Low Stocks" ? -1 : 1
        );
      case "outOfStock":
        return [...inventory].sort((a,b) =>
        a.reorderState === "Out of Stocks" && b.reorderState !== "Out of Stocks" ? -1 : 1
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
    // <div>
    //   
    <div className="container mt-1">
      <div className="card shadow">
        <div className="card-body">
        <h2 className="card-title text-center">Warehouse Inventory List</h2>
        <SearchBar/>
          <div className="mb-3 form-select">
            <label htmlFor="sortCriteria" className="form-label">
              Sort By:
            </label>
            <select
              id="sortCriteria"
              className="form-select"
              value={sortCriteria}
              onChange={(e) => setSortCriteria(e.target.value)}
            >
              <option value="">Select Sorting Criteria</option>
              <option value="lowStock">Low Stock First</option>
              <option value="outOfStock">Out of Stock</option>
              <option value="reorder">Reorder Items First</option>
            </select>
          </div>

          <div className="mb-3">
            <button className="btn btn-info" onClick={handleSort}>
              Sort Inventory
            </button>
          </div>
        

          <table className="table table-bordered table-hover">
            <thead className = "table-info">
              <tr>
                {/* <th className="col-1">Item Number</th> */}
                <th className="col-2">Item Name</th>
                <th className="col-1">Quantity</th>
                <th className="col-1">Reorder Level</th>
                <th className="col-2">Reorder State</th>
                <th className="col-2">Unit Price (LKR)</th>
                <th className="col-2">Availability</th>
                <th className="col-3">Actions</th>
              </tr>
            </thead>
            <tbody className = "table-info">
              {sortedInventory.map((item) => (
                <tr key={item._id}>
                  {/* <td className="col-1">
                    {editableItemId === item._id ? (
                      <input
                        type="text"
                        className="form-control"
                        style={{ width: "100%" }}
                        value={item.itemNumber}
                        onChange={(e) =>
                          handleChange(e, "itemNumber", item._id)
                        }
                      />
                    ) : (
                      item.itemNumber
                    )}
                  </td> */}
                  <td className="col-2">
                    {editableItemId === item._id ? (
                      <input
                        type="text"
                        className="form-control"
                        style={{ width: "100%" }}
                        value={item.itemName}
                        onChange={(e) => handleChange(e, "itemName", item._id)}
                      />
                    ) : (
                      item.itemName
                    )}
                  </td>
                  <td className="col-1">
                    {editableItemId === item._id ? (
                      <input
                        type="number"
                        className="form-control"
                        style={{ width: "100%" }}
                        value={item.quantity}
                        onChange={(e) => handleChange(e, "quantity", item._id)}
                      />
                    ) : (
                      item.quantity
                    )}
                  </td>
                  <td className="col-1">
                    {editableItemId === item._id ? (
                      <input
                        type="number"
                        className="form-control"
                        style={{ width: "100%" }}
                        value={item.reorderLevel}
                        onChange={(e) =>
                          handleChange(e, "reorderLevel", item._id)
                        }
                      />
                    ) : (
                      item.reorderLevel
                    )}
                  </td>
                  <td className="col-2">
                    {editableItemId === item._id ? (
                      <input
                        type="text"
                        className="form-control"
                        style={{ width: "100%" }}
                        value={item.reorderState}
                        onChange={(e) =>
                          handleChange(e, "reorderState", item._id)
                        }
                      />
                    ) : (
                      item.reorderState
                    )}
                  </td>

                  <td className="col-1">
                    {editableItemId === item._id ? (
                      <input
                        type="number"
                        className="form-control"
                        style={{ width: "100%" }}
                        value={item.itemPrice}
                        onChange={(e) => handleChange(e, "itemPrice", item._id)}
                      />
                    ) : (
                      item.itemPrice
                    )}
                  </td>

                  <td className="col-2">
                    {editableItemId === item._id ? (
                      <select
                        className="form-select"
                        style={{ width: "100%" }}
                        value={item.availability}
                        onChange={(e) =>
                          handleChange(e, "availability", item._id)
                        }
                      >
                        <option value="Available">Available</option>
                        <option value="Reorder">Reorder</option>
                      </select>
                    ) : (
                      item.availability
                    )}
                  </td>
                  <td className="col-3">
                    {editableItemId === item._id ? (
                      <>
                        <button
                          className="btn btn-success"
                          onClick={() => handleUpdate(item._id)}
                        >
                          Save
                        </button>
                        <button
                          className="btn btn-secondary"
                          onClick={() => setEditableItemId(null)}
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          className="btn btn-primary"
                          onClick={() => handleEdit(item._id)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-danger"
                          onClick={() => handleDelete(item._id)}
                        >
                          Delete
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    // </div>
  );
}

export default ItemList;
