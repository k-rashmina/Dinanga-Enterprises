import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./CustomerRegForm.css";

const CustomerInfo = () => {

  const loggedUser = localStorage.getItem('loggedUser');
  const delNav = useNavigate();

  const [userDetails, setUserDetails] = useState({
    _id: '',
    cusFname: '',
    cusLname: '',
    bDate: '',
    cusMail: '',
    cusPassword: '',
    pNum: '',
    cusAddr: ''
  });
  const [editable, setEditable] = useState(false); // State to track if fields are editable
  const [errorMsg, setErrorMsg] = useState(''); // State to track error message

  // Function to fetch user details from the database
  const fetchUserDetails = () => {
    axios.get(`http://localhost:5000/customer/customerdetails/?user=${loggedUser}`)
      .then(res => setUserDetails(res.data))
      .catch(err => console.log(err));
  };

  useEffect(() => {
    fetchUserDetails(); // Fetch user details when component mounts
  }, []);

  const handleInputs = (e) => {
    const { id, value } = e.target;

    setUserDetails(prevState => ({
      ...prevState,
      [id]: value
    }));
  };

  const handleUpdateProfile = () => {
    // Check if any field is empty
    if (Object.values(userDetails).some(value => value === '')) {
      setErrorMsg('Please fill all fields before submitting.');
    } else {
      axios.put(`http://localhost:5000/customer/upcustomerdetails/?user=${loggedUser}`, userDetails)
        .then(res => {
          console.log(res);
          setEditable(false); // Set fields as non-editable on update profile button click
          setErrorMsg(''); // Clear error message
          alert('Successfully Submitted');
        })
        .catch(err => console.log(err));
    }
  };

  const handleCancel = () => {
    fetchUserDetails(); // Fetch user details again from the database
    setEditable(false); // Set fields as non-editable
    setErrorMsg(''); // Clear error message
  };

  const handleSubmit = () => {
    // Logic to submit updated profile
    setEditable(prevState => !prevState); // Toggle editable state
  };

  const handleDeleteEvent = () => {
    const confirmVal = window.confirm('Confirm delete profile');

    if(confirmVal === true) { 
      axios.delete(`http://localhost:5000/customer/delcustomerdetails?id=${userDetails._id}`)
        .then(res => {
          delNav('/');
        })
        .catch(err => console.log(err));
    }   
  };

  return (
    <div>
      <h2 style={{ color: '#393E46', textAlign: 'center', fontWeight: 'bold', marginTop: '20px' }}>Your Details</h2>
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
            value={userDetails.bDate ? userDetails.bDate.substring(0, 10) : ''}
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
          <label htmlFor="cusAddr" className="form-label">Address</label>
          <input
            type="text"
            className="form-control"
            id="cusAddr"
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
        {errorMsg && <div className="alert alert-danger">{errorMsg}</div>} {/* Display error message */}
        {editable ? (
          <div>
            <button type="button" className="btn btn-primary me-2" onClick={handleUpdateProfile}>Submit</button>
            <button className='btn btn-danger' onClick={handleCancel}>Cancel</button>
          </div>
        ) : (
          <button
            type="button"
            className="reg-form-button me-2"
            onClick={handleSubmit}
          >
            Update Profile
          </button>
        )}
        {!editable && (
          <button type="button" className="reg-form-button2 me-2" onClick={handleDeleteEvent}>Delete Profile</button>
        )}
      </form>
    </div>
  );
};

export default CustomerInfo;
