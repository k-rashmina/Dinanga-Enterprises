import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Popup.css";

function PopUp({ props, selectedItem }) {
  const [isEditing, setIsEditing] = useState(false);
  const [item, setItem] = useState(null);

  useEffect(() => {
    setItem(selectedItem);
  }, [selectedItem]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    setIsEditing(false);
    // Save the item here
    try {
      await axios.put(
        `http://localhost:5000/inventory/updateItem/${selectedItem._id}`,
        item
      );
      alert("Item updated successfully");
      props.setTrigger(false);
    } catch (error) {
      console.error("Error updating item", error);
    }
  };

  const handleDelete = async () => {
    // Delete the item here
    try {
      await axios.delete(
        `http://localhost:5000/inventory/deleteItem/${item._id}`
      );
      alert("Item Deleted Successfully");
      props.setTrigger(false);
    } catch (error) {
      console.error("Error deleting item", error);
    }
  };

  if (!item) return null;

  return props.trigger ? (
    <div className="popup">
      <div className="popup-inner">
        <button className="close-btn" onClick={() => props.setTrigger(false)}>
          close
        </button>
        <h3>Item Details</h3>
        {isEditing ? (
          <>
            <p>
              Item Number{" "}
              <input
                value={item.itemNumber}
                onChange={(e) =>
                  setItem({ ...item, itemNumber: e.target.value })
                }
              />
            </p>

            <p>Item Name
              <input
                value={item.itemName}
                onChange={(e) => setItem({ ...item, itemName: e.target.value })}
              />
            </p>
            <p>Quantity
              <input
                value={item.quantity}
                onChange={(e) => setItem({ ...item, quantity: e.target.value })}
              />
            </p>

            <p>Re Order Level
              <input
                value={item.reorderLevel}
                onChange={(e) =>
                  setItem({ ...item, reorderLevel: e.target.value })
                }
              />
            </p>

            <p>Unit Price
              <input
                value={item.itemPrice}
                onChange={(e) =>
                  setItem({ ...item, itemPrice: e.target.value })
                }
              />
            </p>

            <p>Re Order State
              <input
                value={item.reorderState}
                onChange={(e) =>
                  setItem({ ...item, reorderState: e.target.value })
                }
              />
            </p>

            <button onClick={handleSave}>Save</button>
          </>
        ) : (
          <>
            <h4>Item Number: {item.itemNumber}</h4>
            <h4>Item Name: {item.itemName}</h4>
            <h4>Quantity: {item.quantity}</h4>
            <h4>Re-Order Level:{item.reorderLevel}</h4>
            <h4>Unit Price:{item.itemPrice}</h4>
            <h4>Reorder State: {item.reorderState}</h4>
            <button onClick={handleEdit}>Edit</button>
            <button onClick={handleDelete}>Delete</button>
          </>
        )}
      </div>
    </div>
  ) : (
    ""
  );
}

export default PopUp;

// import React from "react";
// import './Popup.css'

// function PopUp({props , selectedItem}) {
//   return (props.trigger)?(
//     <div className="popup">
//       <div className="popup-inner">
//         <button className="close-btn"onClick={()=>props.setTrigger(false)}>close</button>
//         <h3>Item Details</h3>
//         <h4>Item Number: {selectedItem.itemNumber}</h4>
//         <h4>Item Name: {selectedItem.itemName}</h4>
//         <h4>Quantity: {selectedItem.quantity}</h4>
//         <h4>Unit Price: {selectedItem.itemPrice}</h4>
//         <h4>Re-Order Level:{selectedItem.reorderLevel} </h4>
//         <h4>Re-Order State:{selectedItem.reorderState}</h4>
//       </div>
//     </div>
//   ):"";
// }

// export default PopUp;
