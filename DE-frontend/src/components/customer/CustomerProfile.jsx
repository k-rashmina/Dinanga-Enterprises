import React from 'react';
import ProfilePicture from './ProfilePicture.jsx';
import CustomerInfo from './CustomerInfo.jsx';
import FeedbackForm from './FeedbackForm.jsx';

const CustomerProfile = () => {
  // Replace imageUrl with the actual path to the customer's profile picture
  const imageUrl = 'https://source.unsplash.com/600x300/?student';

  return (
    <div className="">
      <div className="d-flex justify-content-between">
        <div className="col-lg-4" style={{ backgroundColor: '#393E46', height: '100vh', maxWidth: '300px' }}>
          <div className="profile-container">
            <ProfilePicture imageUrl={imageUrl}  />
          </div>
        </div>
        <div className="col-lg-4" style={{ backgroundColor: '#EEEEEE', height: '100vh' }}>
          <div className="info-container">
            <CustomerInfo />
          </div>
        </div>
        <div className="col-lg-4" style={{ backgroundColor: '#EEEEEE', height: '100vh', marginRight: '40px' }}>
          <div className="feedback-container">
            <FeedbackForm />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CustomerProfile;
