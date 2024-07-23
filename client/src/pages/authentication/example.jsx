import React from 'react';

const UserProfile = ({ user }) => {
  if (!user) return null;

  return (
    <div>
      <h1>User Profile</h1>
      <p>Email: {user.email}</p>
      <p>First Name: {user.userName}</p>
      <p>Phone Number: {user.number}</p>
      <p>User Type: {user.userType}</p>
    </div>
  );
};

export default UserProfile;