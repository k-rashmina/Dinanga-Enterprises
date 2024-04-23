import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import axios from 'axios';

const CustomerInfo = () => {

  const loggedUser = localStorage.getItem('loggedUser');

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


  const handleInputs = (e) => {
    const { id, value } = e.target;

    setUserDetails(prevState => ({
      ...prevState,
      [id]: value
    }));
  };

//handle updating activities
  const [updateSubmitValue, setUpdateSubmitValue] = useState(false);

  const handleUpdateProfile = () => {
    setUpdateSubmitValue(prev => !prev);
  };

  //API call for updating profile details
  useEffect(() => {

    if(editable){
      axios.put(`http://localhost:5000/customer/upcustomerdetails/?user=${loggedUser}`, userDetails)
      .then(res=>{
        console.log(res);
        setEditable(false); // Set fields as editable on update profile button click

      })
      .catch(err => console.log(err));
    }

  }, [updateSubmitValue])

  const handleSubmit = () => {
    // Logic to submit updated profile
    setEditable(prevState => !prevState); // Set fields as non-editable after submission
  };

  useEffect(() => {
    axios.get(`http://localhost:5000/customer/customerdetails/?user=${loggedUser}`)
      .then(res => setUserDetails(res.data));
  }, []);



//handle deleting activities
  let confirmVal;
  const [deleteValue, setDeleteValue] = useState(false);
  const handleDeleteEvent = () => {
    confirmVal = confirm('Confirm delete profile');

    if(confirmVal == true) { setDeleteValue(prev => !prev)};
    
  }

  const delNav = useNavigate();
  //API call for delete profile
  useEffect(() => {

    if(deleteValue){
      axios.delete(`http://localhost:5000/customer/delcustomerdetails?id=${userDetails._id}`)
      .then(res => {
        delNav('/');
      })
      .catch(err => console.log(err));
    }

  }, [deleteValue])

 
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
          <div>
            <button type="button" className="btn btn-primary me-2" onClick={handleUpdateProfile}>Submit</button>
            <button className='btn btn-primary me-2' onClick={handleSubmit}>Cancel</button>
          </div>
        ) : (
          <button
            type="button"
            className="btn btn-primary me-2"
            onClick={handleSubmit}
          >
            Update Profile
          </button>
        )}
        {!editable && (
          <button type="button" className="btn btn-danger" onClick={handleDeleteEvent}>Delete Profile</button>
        )}
      </form>
    </div>
  );
};

export default CustomerInfo;
