import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Popup.css";
import list_image from "./../../../assets/inventory_list.png";
import close_image from "./../../../assets/cross.png";

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
    <div className="Searchpopup">
      <div className="Searchpopup-inner">
        <img className="list-img" src={list_image} alt="popuplist" />
        <img
          className="close-img"
          src={close_image}
          alt="close"
          onClick={() => props.setTrigger(false)}
        />

        <h5 className="d-flex justify-content-center">Item Details</h5>
        {isEditing ? (
          <>
            <dl className="row d-flex justify-content-center">
              <dt className="col-sm-4">Item Number</dt>
              <dd className="col-sm-7">{item.itemNumber}</dd>

              <dt className="col-sm-4">Item Name</dt>
              <dd className="col-sm-7">
                <input
                 style={{border: '2px solid #00ADB5'}}
                  value={item.itemName}
                  onChange={(e) =>
                    setItem({ ...item, itemName: e.target.value })
                  }
                />
              </dd>

              <dt className="col-sm-4">Quantity</dt>
              <dd className="col-sm-7">
                <input
                   style={{border: '2px solid #00ADB5'}}
                  value={item.quantity}
                  onChange={(e) =>
                    setItem({ ...item, quantity: e.target.value })
                  }
                />
              </dd>

              <dt className="col-sm-4">Re-Order Level</dt>
              <dd className="col-sm-7">
                <input
                   style={{border: '2px solid #00ADB5'}}
                  value={item.reorderLevel}
                  onChange={(e) =>
                    setItem({ ...item, reorderLevel: e.target.value })
                  }
                />
              </dd>

              <dt className="col-sm-4">Unit Price</dt>
              <dd className="col-sm-7">
                <input
                   style={{border: '2px solid #00ADB5'}}
                  value={item.itemPrice}
                  onChange={(e) =>
                    setItem({ ...item, itemPrice: e.target.value })
                  }
                />
              </dd>

              <dt className="col-sm-4">Reorder State</dt>
              <dd className="col-sm-7">
                <input
                   style={{border: '2px solid #00ADB5'}}
                  value={item.reorderState}
                  onChange={(e) =>
                    setItem({ ...item, reorderState: e.target.value })
                  }
                  readOnly
                />
              </dd>

              <dt className="col-sm-4">Availability</dt>
              <dd className="col-sm-7">
                <select
                   style={{border: '2px solid #00ADB5'}}
                  className = "form-control"
                  value={item.availability}
                  onChange={(e) =>
                    setItem({ ...item, availability: e.target.value })
                  }
                >
                  <option value="Available">Available</option>
                  <option value="Reorder">Reorder</option>
                </select>
              </dd>
            </dl>

            <div className="d-flex justify-content-end">
            <button type="button" class="form-button rounded-5 fw-semibold" onClick={handleSave}>
              Save
            </button>
            <button
              type="button"
              class="form-button rounded-5 fw-semibold"
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </button>
            </div>
          </>
        ) : (
          <>
            <dl className="row d-flex justify-content-center">
              <dt className="col-sm-4">Item Number</dt>
              <dd className="col-sm-7">{item.itemNumber}</dd>

              <dt className="col-sm-4">Item Name</dt>
              <dd className="col-sm-7">{item.itemName}</dd>

              <dt className="col-sm-4">Quantity</dt>
              <dd className="col-sm-7">{item.quantity}</dd>

              <dt className="col-sm-4">Re-Order Level</dt>
              <dd className="col-sm-7">{item.reorderLevel}</dd>

              <dt className="col-sm-4">Unit Price</dt>
              <dd className="col-sm-7">{new Intl.NumberFormat('en-LK',{style:'currency',currency:'LKR'}).format(item.itemPrice)}</dd>

              <dt className="col-sm-4">Stock Value</dt>
              <dd className="col-sm-7">{new Intl.NumberFormat('en-LK', { style: 'currency', currency: 'LKR' }).format(item.itemPrice * item.quantity)}</dd>

              <dt className="col-sm-4">Reorder State</dt>
              <dd className="col-sm-7">{item.reorderState}</dd>

              <dt className="col-sm-4">Availability</dt>
              <dd className="col-sm-7">{item.availability}</dd>
            </dl>

            <div className="d-flex justify-content-end">
              <button
                type="button"
                class="form-button rounded-5 fw-semibold"
                onClick={handleEdit}
              >
                Edit
              </button>
              <button
                type="button"
                class="form-button rounded-5 fw-semibold"
                onClick={handleDelete}
              >
                Delete
              </button>
            </div>
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
