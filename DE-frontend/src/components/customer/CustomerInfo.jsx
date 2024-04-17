import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CustomerInfo = () => {
  const [userDetails, setUserDetails] = useState({
    cusFname: '',
    cusLname: '',
    bDate: '',
    cusMail: '',
    cusPassword: '',
    pNum: '',
    cusAddr: ''
  });
  const [editable, setEditable] = useState(false); // State to track if fields are editable

  // useEffect(()=>{
  //   fetchData();
  // },[]);

  const handleInputs = (e) => {
    const { id, value } = e.target;

    setUserDetails(prevState => ({
      ...prevState,
      [id]: value
    }));
  };

  const handleUpdateProfile = () => {

    axios.put(`http://localhost:5000/customer/upcustomerdetails/?user=${'kalindur@gmail.c'}`)
    .then(res=>{
      console.log(res);
      setEditable(true); // Set fields as editable on update profile button click
      fetchData(); // fetch updated data after successfully update

    })
    .catch(err => console.log(err));

  };

  const handleSubmit = () => {
    // Logic to submit updated profile
    setEditable(false); // Set fields as non-editable after submission
  };

  useEffect(() => {
    axios.get(`http://localhost:5000/customer/customerdetails/?user=${'kalindur@gmail.c'}`)
      .then(res => setUserDetails(res.data));
  }, []);

  return (
    <div>
      <h2>Your Details</h2>
      <form>
        <div className="mb-3">
          <label htmlFor="cusFname" className="form-label">First Name</label>
          <input
            type="text"
            className="form-control"
            id="cusFname"
            value={userDetails.cusFname}
            onChange={handleInputs}
            readOnly={!editable} // Set readOnly based on editable state
          />
        </div>
        <div className="mb-3">
          <label htmlFor="cusLname" className="form-label">Last Name</label>
          <input
            type="text"
            className="form-control"
            id="cusLname"
            value={userDetails.cusLname}
            onChange={handleInputs}
            readOnly={!editable} // Set readOnly based on editable state
          />
        </div>
        <div className="mb-3">
          <label htmlFor="bDate" className="form-label">Date of Birth</label>
          <input
            type="date"
            className="form-control"
            id="bDate"
            value={userDetails.bDate.substring(0, 10)}
            onChange={handleInputs}
            readOnly={!editable} // Set readOnly based on editable state
          />
        </div>
        <div className="mb-3">
          <label htmlFor="cusMail" className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            id="cusMail"
            value={userDetails.cusMail}
            readOnly // Email is always read-only
            disabled
          />
        </div>
        <div className="mb-3">
          <label htmlFor="cusPassword" className="form-label">Address</label>
          <input
            type="text"
            className="form-control"
            id="cusPassword"
            value={userDetails.cusAddr}
            onChange={handleInputs}
            readOnly={!editable} // Set readOnly based on editable state
          />
        </div>
        <div className="mb-3">
          <label htmlFor="pNum" className="form-label">Phone Number</label>
          <input
            type="tel"
            className="form-control"
            id="pNum"
            value={userDetails.pNum}
            onChange={handleInputs}
            readOnly={!editable} // Set readOnly based on editable state
          />
        </div>
        {editable ? (
          <button
            type="button"
            className="btn btn-primary me-2"
            onClick={handleSubmit}
          >
            Submit
          </button>
        ) : (
          <button
            type="button"
            className="btn btn-primary me-2"
            onClick={handleUpdateProfile}
          >
            Update Profile
          </button>
        )}
        {!editable && (
          <button type="button" className="btn btn-danger">Delete Profile</button>
        )}
      </form>
    </div>
  );
};

export default CustomerInfo;
