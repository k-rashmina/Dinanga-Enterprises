import React, { useState, useEffect } from 'react';
import axios from 'axios';
const ProfilePicture = ({ imageUrl }) => {

  const loggedUser = localStorage.getItem('loggedUser');
  const [userDetails, setUserDetails] = useState({});

  useEffect(() => {
    axios.get(`http://localhost:5000/customer/customerdetails/?user=${loggedUser}`)
      .then(res => setUserDetails(res.data));
  }, []);
  
  return (
    <div className="text-center"><br/>
      <img src={imageUrl} alt="Profile Picture" className="rounded-circle" style={{ width: '150px', height: '150px' }} />
      <h4 class="text-white">{userDetails.cusFname}</h4>
      <h5 class="text-white">{userDetails.cusMail}</h5>

    </div>
  );
}

export default ProfilePicture;