import { useState } from "react";
import axios from "axios";
import "./AddItems.css";
import SearchBar from "./SearchBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWarehouse } from '@fortawesome/free-solid-svg-icons';
import AdminHeader from "../common/AdminHeader";

function AddItem() {
  const [itemNumber, setItemNumber] = useState("");
  const [itemName, setItemName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [reorderLevel, setReorderLevel] = useState("");
  const [itemPrice, setItemPrice] = useState("");
  const [availability, setAvailability] = useState("");
  const [errors, setErrors] = useState({});

  const validateItemName = () => {
    const errorsCopy = { ...errors };
    const validNameRegex = /^[a-zA-Z0-9 ]+$/;
    if (!itemName) errorsCopy.itemName = "Item name is required";
    else if (!validNameRegex.test(itemName))
      errorsCopy.itemName = "Item name must be alphanumeric";
    else delete errorsCopy.itemName;
    setErrors(errorsCopy);
  };

  const validateItemNumber = () => {
    const errorsCopy = { ...errors };
    if (!itemNumber) errorsCopy.itemNumber = "Item number is required";
    else if (!/^DE\d{3}$/i.test(itemNumber))
      errorsCopy.itemNumber =
        "Item number must start with DE followed by 3 digits";
    else delete errorsCopy.itemNumber;
    setErrors(errorsCopy);
  };

  const validateQuantity = () => {
    const errorsCopy = { ...errors };
    if (!quantity) errorsCopy.quantity = "Quantity is required";
    else if (!/^\d+$/.test(quantity))
      errorsCopy.quantity = "Quantity must be a number";
    else delete errorsCopy.quantity;
    setErrors(errorsCopy);
  };

  const validateReorderLevel = () => {
    const errorsCopy = { ...errors };
    if (!reorderLevel) errorsCopy.reorderLevel = "Reorder level is required";
    else if (!/^\d+$/.test(reorderLevel))
      errorsCopy.reorderLevel = "Reorder level must be a number";
    else delete errorsCopy.reorderLevel;
    setErrors(errorsCopy);
  };

  const validateItemPrice = () => {
    const errorsCopy = { ...errors };
    if (!itemPrice) errorsCopy.itemPrice = "Item price is required";
    else if (!/^\d+$/.test(itemPrice))
      errorsCopy.itemPrice = "Item Price must be a number";
    else delete errorsCopy.itemPrice;
    setErrors(errorsCopy);
  };

  const validateAvailability = () => {
    const errorsCopy = { ...errors };
    if (!availability) errorsCopy.availability = "Availability is required";
    else delete errorsCopy.availability;
    setErrors(errorsCopy);
  };

  function sendData(e) {
    e.preventDefault();
    validateItemName() &
      validateItemNumber() &
      validateQuantity() &
      validateReorderLevel() &
      validateItemPrice() &
      validateAvailability();
    // Check if there are any errors after validation
    const noErrors = Object.keys(errors).length === 0;
    if (noErrors) {
      const newItem = {
        itemNumber,
        itemName,
        quantity,
        reorderLevel,
        itemPrice,
        availability,
      };
      axios
        .post("http://localhost:5000/inventory/add", newItem)
        .then(() => {
          alert("Item Added");
        })
        .catch((err) => {
          alert("Please fill all the fields");
        });
    }
  }

  return (
    <div class="con">
      <AdminHeader pageName={'Add Item'}/>
      <SearchBar/>
      <div class="container-fluid px-1 py-5 mx-auto">
        <div class="row d-flex justify-content-center">
          <div class="col-xl-7 col-lg-8 col-md-9 col-11 text-center">
            
           
            <div class="card"style = {{borderRadius:"10px",boxShadow:"0px 0px 10px 2px rgba(0,0,0,0.4)"}}>
              <h5 class="text-center mb-4">
                Add Details for warehouse records
                <FontAwesomeIcon icon={faWarehouse} style={{ marginLeft: "10px" }} />
              </h5>
              <form className="form-card" onSubmit={sendData}>
                <div class="row justify-content-between text-left">
                  <div class="row justify-content-between text-left">
                    <div class="form-group col-12 flex-column d-flex mb-3">
                      <label class="form-control-label px-3">
                        New Item Name
                        <span class="text-danger"> *</span>
                      </label>

                      <input
                        type="text"
                        id="ans"
                        name="ans"
                        className={`form-control ${
                          errors.itemName ? "is-invalid" : ""
                        }`}
                        placeholder="Item Name"
                        value={itemName}
                        onChange={(e) =>{
                          setItemName(e.target.value)
                          validateItemName(); // Validate in real-time  
                        }}
                        onBlur={validateItemName}
                      />
                      {errors.itemName && (
                        <div className="invalid-feedback">
                          {errors.itemName}
                        </div>
                      )}
                    </div>
                  </div>

                  <div class="row justify-content-between text-left">
                    <div class="form-group col-md-6 mb-3">
                      <label class="form-control-label px-3">
                        Item Number<span class="text-danger"> *</span>
                      </label>
                      <input
                        type="text"
                        id="itemnumber"
                        name="itemnumber"
                        // class="form-control"
                        className={`form-control ${
                          errors.itemNumber ? "is-invalid" : ""
                        }`}
                        placeholder="Enter item number"
                        value={itemNumber}
                        onChange={(e) => {
                          setItemNumber(e.target.value);
                          validateItemNumber(); // Validate in real-time
                        }}
                        onBlur={validateItemNumber}
                      />
                      {errors.itemNumber && (
                        <div className="invalid-feedback">
                          {errors.itemNumber}
                        </div>
                      )}
                    </div>

                    <div class="form-group col-md-6 mb-3">
                      <label class="form-control-label px-3">
                        Quantity<span class="text-danger"> *</span>
                      </label>
                      <input
                        type="text"
                        id="quantity"
                        name="quantity"
                        // class="form-control"
                        className={`form-control ${
                          errors.quantity ? "is-invalid" : ""
                        }`}
                        placeholder="Enter quantity"
                        value={quantity}
                        onChange={(e) => {
                          setQuantity(e.target.value);
                          validateQuantity(); // Validate in real-time
                        }}
                        onBlur={validateQuantity}
                      />
                      {errors.quantity && (
                        <div className="invalid-feedback">
                          {errors.quantity}
                        </div>
                      )}
                    </div>

                    <div class="form-group col-md-6 mb-3">
                      <label class="form-control-label px-3">
                        Re Order Level<span class="text-danger"> *</span>
                      </label>
                      <input
                        type="text"
                        id="reorderlevel"
                        name="reorderlevel"
                        className={`form-control ${
                          errors.reorderLevel ? "is-invalid" : ""
                        }`}
                        placeholder=""
                        value={reorderLevel}
                        onChange={(e) => {
                          setReorderLevel(e.target.value);
                          validateReorderLevel(); // Validate in real-time
                        }}
                        onBlur={validateReorderLevel}
                      />
                      {errors.reorderLevel && (
                        <div className="invalid-feedback">
                          {errors.reorderLevel}
                        </div>
                      )}
                    </div>
                    <div class="form-group col-md-6 mb-3">
                      <label class="form-control-label px-3">
                        Unit Price<span class="text-danger"> *</span>
                      </label>
                      <input
                        type="text"
                        id="unitprice"
                        name="unitprice"
                        // class="form-control"
                        className={`form-control ${
                          errors.itemPrice ? "is-invalid" : ""
                        }`}
                        placeholder=""
                        value={itemPrice}
                        onChange={(e) => {setItemPrice(e.target.value)
                        validateItemPrice(); // Validate in real-time
                        }}
                        onBlur={validateItemPrice}
                      />
                      {errors.itemPrice && (
                        <div className="invalid-feedback">
                          {errors.itemPrice}
                        </div>
                      )}
                    </div>
                  </div>

                  <div class="row justify-content-between text-left">
                    <div class=" form-group col-12 flex-column d-flex mb-3">
                      <label class="form-control-label px-3 ">
                        Availability<span class="text-danger"> *</span>
                      </label>
                      <select
                        className={`form-control ${
                          errors.availability ? "is-invalid" : ""
                        }`}
                        id="availability"
                        value={availability}
                        onChange={(e) => setAvailability(e.target.value)}
                        onBlur={validateAvailability}
                      >
                        <option value="">Select availability...</option>
                        <option value="Available">Available</option>
                        <option value="Reorder">Reorder</option>
                      </select>
                      {errors.availability && (
                        <div className="invalid-feedback">
                          {errors.availability}
                        </div>
                      )}
                    </div>
                  </div>

                  <div class="row justify-content-end">
                    <div class="form-group col-sm-6">
                      <button
                        type="submit"
                        class="btn-block btn-primary"
                        style={{ backgroundColor: "#00BCD4" }}
                      >
                        List Item
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddItem;
