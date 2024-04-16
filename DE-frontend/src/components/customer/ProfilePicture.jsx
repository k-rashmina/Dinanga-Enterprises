import React from 'react';

const ProfilePicture = ({ imageUrl }) => {
  return (
    <div className="text-center">
      <img src={imageUrl} alt="Profile Picture" className="rounded-circle" style={{ width: '150px', height: '150px' }} />
    </div>
  );
}

export default ProfilePicture;