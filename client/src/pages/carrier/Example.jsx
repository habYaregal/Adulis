import { useState, useEffect } from 'react';
//import jwt_decode from 'jwt-decode';

function MyComponent() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const getToken = () => {
      const cookies = document.cookie.split(';');
      for (const cookie of cookies) {
        const [key, value] = cookie.trim().split('=');
        if (key === 'token') {
          return value;
        }
      }
      return null;
    };

    const token = getToken();
    if (token) {
      try {
        const decodedData = jwt_decode(token);
        setUserData(decodedData);
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    }
  }, []);

  return (
    <div>
      {userData ? (
        <div>
          <h2>User Details</h2>
          <p>Username: {userData.username}</p>
          <p>Email: {userData.email}</p>
          {/* Add other user details as needed */}
        </div>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
}

export default MyComponent;
