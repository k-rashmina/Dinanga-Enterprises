import React, { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';


const CustomerInfo = () => {
  const [userdetails, setUserDetails] = useState({
    cusFname: '',
    cusLname: '',
    bDate: '',
    cusMail: '',
    cusPassword: '',
    pNum: '',
    cusAddr: ''
  });

  const handleInputs = (e) => {
    const {id, value} = e.target;

    setUserDetails(prevState => {
      return {
        ...prevState,
        [id]: value
      }
    })
  }

  useEffect(() =>{
    axios.get(`http://localhost:5000/customer/customerdetails/?user=${'kalindur@gmail.c'}`).then(res => setUserDetails(res.data))
  }, [])

  return (
    <div>
      <h2>Your Details</h2>
      <form>
        <div className="mb-3">
          <label htmlFor="cusFname" className="form-label">First Name</label>
          <input type="text" className="form-control" id="cusFname" value={userdetails.cusFname} onChange={handleInputs} />
        </div>
        <div className="mb-3">
          <label htmlFor="cusLname" className="form-label">Last Name</label>
          <input type="text" className="form-control" id="cusLname" value={userdetails.cusLname} onChange={handleInputs} />
        </div>
        <div className="mb-3">
          <label htmlFor="bDate" className="form-label">Date of Birth</label>
          <input type="date" className="form-control" id="bDate" value={userdetails.bDate.substring(0, 10)} onChange={handleInputs} />
        </div>
        <div className="mb-3">
          <label htmlFor="cusMail" className="form-label">Email</label>
          <input type="email" className="form-control" id="cusMail" value={userdetails.cusMail} onChange={handleInputs} />
        </div>
        <div className="mb-3">
          <label htmlFor="cusPassword" className="form-label">Address</label>
          <input type="text" className="form-control" id="cusPassword" value={userdetails.cusAddr} onChange={handleInputs} />
        </div>
        <div className="mb-3">
          <label htmlFor="pNum" className="form-label">Phone Number</label>
          <input type="tel" className="form-control" id="pNum" value={userdetails.pNum} onChange={handleInputs} />
        </div>
        <button type="submit" className="btn btn-primary me-2">Update Profile</button>
        <button type="button" className="btn btn-danger">Delete Profile</button>
      </form>
    </div>
  );
}

export default CustomerInfo;
