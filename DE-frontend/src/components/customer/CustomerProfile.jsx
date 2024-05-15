import React from 'react';
import ProfilePicture from './ProfilePicture.jsx';
import CustomerInfo from './CustomerInfo.jsx';
import FeedbackForm from './FeedbackForm.jsx';

const CustomerProfile = () => {
  // Replace imageUrl with the actual path to the customer's profile picture
  const imageUrl = 'https://source.unsplash.com/600x300/?student';

  return (
    <div style={{backgroundColor: 'white'}}>
      <div className="d-flex justify-content-between">
        <div className="col-lg-4 mt-3" style={{ backgroundColor: '#393E46', height: '100vh', maxWidth: '300px' }}>
          <div className="profile-container">
            <ProfilePicture imageUrl={imageUrl}  />
          </div>
        </div>
        <div className="col-lg-4 ps-3 pe-3 mt-3 mb-3" style={{ backgroundColor: '#EEEEEE', height: '100vh', width: '600px' }}>
          <div className="info-container">
            <CustomerInfo />
          </div>
        </div>
        <div className="col-lg-4 ps-3 pe-3 mt-3 mb-3" style={{ backgroundColor: '#EEEEEE', height: '100vh', marginRight: '20px', width: '600px' }}>
          <div className="feedback-container">
            <FeedbackForm />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CustomerProfile;
