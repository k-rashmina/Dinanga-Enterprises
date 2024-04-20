import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./OnGoingOrders.css";

const OnGoingOrders = () => {
  const [order, setOrder] = useState([]);
  const [editableItemId, setEditableItemId] = useState(null);

  useEffect(() => {
    fetchOrderData();
  }, []);

  const fetchOrderData = () => {
    axios
      .get("http://localhost:5000/order/getAllItems")
      .then((response) => {
        setOrder(response.data);
      })
      .catch((error) => {
        console.error("Error fetching order data:", error);
      });
  };

  const handleUpdate = (itemId) => {
    const updatedItem = order.find((item) => item._id === itemId);
    axios
      .put(`http://localhost:5000/order/updateItem/${itemId}`, updatedItem)
      .then(() => {
        console.log("Item updated successfully");
        setEditableItemId(null);
        fetchOrderData();
      })
      .catch((error) => {
        console.error("Error updating order:", error);
      });
  };

  const handleDelete = (itemId) => {
    axios
      .delete(`http://localhost:5000/order/deleteItem/${itemId}`)
      .then(() => {
        setOrder((prevOrder) =>
          prevOrder.filter((item) => item._id !== itemId)
        );
      })
      .catch((error) => {
        console.error("Error deleting order:", error);
      });
  };

  const handleEdit = (itemId) => {
    setEditableItemId(itemId);
  };

  const handleChange = (e, fieldName, itemId) => {
    setOrder((prevOrder) => {
      return prevOrder.map((item) => {
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

  const renderButtons = (itemId) => {
    if (editableItemId === itemId) {
      return (
        <>
          <button 
            className="btn-save" 
            onClick={() => handleUpdate(itemId)}
            style={{ borderRadius: "20px" }}
          >
            Save
          </button>
          <button 
            className="btn-cancel" 
            onClick={() => setEditableItemId(null)}
            style={{ borderRadius: "20px" }}
          >
            Cancel
          </button>
        </>
      );
    } else {
      return (
        <>
          <button 
            className="btn-edit" 
            onClick={() => handleEdit(itemId)}
            style={{ borderRadius: "20px" }}
          >
            Update
          </button>
          <button 
            className="btn-delete" 
            onClick={() => handleDelete(itemId)}
            style={{ borderRadius: "20px" }}
          >
            Delete
          </button>
          
        </>
      );
    }
  };

  return (
    <div style={{ marginTop: "90px", maxWidth: '1500px', overflow: 'scroll'}}>
      <h3 style={{ marginBottom: "30px", marginLeft: "20px", fontWeight: "bold" }}>
        Current Orders
      </h3>
      <table className="styled-table" style={{ marginLeft: "20px", marginRight: "20px", height:'900px',fontSize:"20px"}}>
        <thead>
          <tr>
            <th>itemName</th>
            <th>itemNumber</th>
            <th>Quantity</th>
            <th>DateOfOrder</th>
            <th>CompanyAddress</th>
            <th>SupplierName</th>
            <th>Comments</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {order.map((item) => (
            <tr key={item._id}>
              <td>
                {editableItemId === item._id ? (
                  <input
                    type="text"
                    value={item.itemName}
                    onChange={(e) => handleChange(e, 'itemName', item._id)}
                  />
                ) : (
                  item.itemName
                )}
              </td>
              <td>
                {editableItemId === item._id ? (
                  <input
                    type="text"
                    value={item.itemNumber}
                    onChange={(e) => handleChange(e, 'itemNumber', item._id)}
                  />
                ) : (
                  item.itemNumber
                )}
              </td>
              <td>
                {editableItemId === item._id ? (
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) => handleChange(e, 'quantity', item._id)}
                  />
                ) : (
                  item.quantity
                )}
              </td>
              <td>
                {editableItemId === item._id ? (
                  <input
                    type="date"
                    value={item.dateofOrder}
                    onChange={(e) => handleChange(e, 'dateofOrder', item._id)}
                  />
                ) : (
                  item.dateofOrder
                )}
              </td>
              <td>
                {editableItemId === item._id ? (
                  <input
                    type="text"
                    value={item.companyAddress}
                    onChange={(e) => handleChange(e, 'companyAddress', item._id)}
                  />
                ) : (
                  item.companyAddress
                )}
              </td>
              <td>
                {editableItemId === item._id ? (
                  <input
                    type="text"
                    value={item.supplierName}
                    onChange={(e) => handleChange(e, 'supplierName', item._id)}
                  />
                ) : (
                  item.supplierName
                )}
              </td>
              <td>
                {editableItemId === item._id ? (
                  <input
                    type="text"
                    value={item.comments}
                    onChange={(e) => handleChange(e, 'comments', item._id)}
                  />
                ) : (
                  item.comments
                )}
              </td>
              <td>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <div style={{ display: 'flex', gap: '15px' }}>
                    {renderButtons(item._id)}
                  </div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OnGoingOrders;
