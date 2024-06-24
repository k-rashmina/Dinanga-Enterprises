import { useState } from "react";
import axios from "axios";
import "./AddItems.css";
import SearchBar from "./SearchBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWarehouse } from "@fortawesome/free-solid-svg-icons";
import AdminHeader from "../common/AdminHeader";

function AddItem() {
 
  const [brand, setBrand] = useState("");
  const [itemName, setItemName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [reorderLevel, setReorderLevel] = useState("");
  const [itemPrice, setItemPrice] = useState("");
  const [availability, setAvailability] = useState("");
  const [errors, setErrors] = useState({});

  const validateItemName = () => {
    const errorsCopy = { ...errors };
    const validNameRegex = /^[a-zA-Z 0-9]+$/;
    if (!itemName) errorsCopy.itemName = "Item name is required";
    else if (!validNameRegex.test(itemName))
      errorsCopy.itemName = "Item name must be alphanumeric only";
    else delete errorsCopy.itemName;
    setErrors(errorsCopy);
  };

 
  const validateBrand = () => {
    const errorsCopy = { ...errors };
    if (!brand) errorsCopy.brand = " Vehicle Brand is required";
    else delete errorsCopy.brand;
    setErrors(errorsCopy);
  };

  const validateQuantity = () => {
    const errorsCopy = { ...errors };
    if (!quantity) errorsCopy.quantity = "Quantity is required";
    else if (!/^[\d]+$/.test(quantity))
      errorsCopy.quantity = "Quantity must be a number";
    else delete errorsCopy.quantity;
    setErrors(errorsCopy);
  };

  const validateReorderLevel = () => {
    const errorsCopy = { ...errors };
    if (!reorderLevel) errorsCopy.reorderLevel = "Reorder level is required";
    else if (!/^[\d]+$/.test(reorderLevel))
      errorsCopy.reorderLevel = "Reorder level must be a number";
    else delete errorsCopy.reorderLevel;
    setErrors(errorsCopy);
  };

  const validateItemPrice = () => {
    const errorsCopy = { ...errors };
    if (!itemPrice) errorsCopy.itemPrice = "Item price is required";
    else if (!/^[\d]+$/.test(itemPrice))
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
      validateBrand() &
      validateQuantity() &
      validateReorderLevel() &
      validateItemPrice() &
      validateAvailability();
    // Check if there are any errors after validation
    const noErrors = Object.keys(errors).length === 0;
    if (noErrors) {
      const newItem = { 
        itemName,
        brand,
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
          console.log(newItem)
          console.log(err)
        });
    }
  }

  return (
    <div class="con">
      <AdminHeader pageName={"Add Item"} />
      <SearchBar />
      <div class="container-fluid px-1 py-5 mx-auto" style={{ marginTop: '-60px' }}>
        <div class="row d-flex justify-content-center">
          <div class="col-xl-7 col-lg-8 col-md-9 col-11 text-center">
            <div
              class="card"
              style={{
                borderRadius: "10px",
                boxShadow: "0px 0px 10px 2px rgba(0,0,0,0.4)",
                width:"auto"
              }}
            >
              <h5 class="text-center mb-4">
                Add Details for warehouse records
                <FontAwesomeIcon
                  icon={faWarehouse}
                  style={{ marginLeft: "10px" }}
                />
              </h5>
              <form className="form-card" onSubmit={sendData}>
                <div class="row justify-content-between text-left" >
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
                        onChange={(e) => {
                          setItemName(e.target.value);
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
                        Vehicle Brand<span class="text-danger"> *</span>
                      </label>
                      <select
                       style={{ borderColor: '#00ADB5', borderWidth: '2px', borderStyle: 'solid' }}
                      id="brand"
                      name="brand"
                      className={`form-control ${
                        errors.brand ? "is-invalid" : ""
                      }`}
                      value={brand}
                      onChange={(e) => {
                        setBrand(e.target.value);
                        validateBrand(); // Validate in real-time
                      }}
                      onBlur={validateBrand}
                    >
                      <option value="">Select vehicle brand</option>
                      <option value="Toyota">Toyota </option>
                      <option value="Honda">Honda </option>
                      <option value="Suzuki">Suzuki</option>
                      <option value = "Mazda">Mazda</option>
                      <option value = "Any">Any</option>
                    
                    </select>
                      {errors.brand && (
                        <div className="invalid-feedback">
                          {errors.brand}
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
                          const validQuantityRegex = /^[0-9]*$/;
                          if (validQuantityRegex.test(e.target.value)) {
                            setQuantity(e.target.value);
                            validateQuantity(); // Validate in real-time
                          }
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
                          const validReorderlevelRegex = /^[0-9]*$/;
                          if (validReorderlevelRegex.test(e.target.value)) {
                            setReorderLevel(e.target.value);
                            validateReorderLevel(); // Validate in real-time
                          }
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
                        onChange={(e) => {
                          const validitemPriceRegex = /^[0-9]*$/;
                          if (validitemPriceRegex.test(e.target.value)) {
                            setItemPrice(e.target.value);
                            validateItemPrice(); // Validate in real-time
                          }
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
