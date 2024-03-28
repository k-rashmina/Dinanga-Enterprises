// import React from 'react'

// function ItemList() {
//   return (
//     <div>ItemList</div>
//   )
// }

// export default ItemList



import React, { useState, useEffect } from "react";
import axios from "axios";

function ItemList() {
  const [inventory, setInventory] = useState([]);
  const [editableItemId, setEditableItemId] = useState(null);

  useEffect(() => {
    fetchInventoryData();
  }, []);

  const fetchInventoryData = () => {
    axios
      .get("http://localhost:5000/inventory/getAllItems")
      .then((response) => {
        setInventory(response.data);
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

  return (
    <div className="container mt-5">
      <div className="card shadow">
        <div className="card-body">
          <h2 className="card-title">Inventory</h2>
          <table className="table table-bordered table-hover">
            <thead>
              <tr>
                <th className="col-1">Item Number</th>
                <th className="col-2">Item Name</th>
                <th className="col-1">Quantity</th>
                <th className="col-1">Reorder Level</th>
                <th className="col-2">Reorder State</th>
                <th className="col-2">Availability</th>
                <th className="col-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {inventory.map((item) => (
                <tr key={item._id}>
                  <td className="col-1">
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
                  </td>
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
  );
}

export default ItemList;
