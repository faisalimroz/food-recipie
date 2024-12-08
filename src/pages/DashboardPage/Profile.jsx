import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getFromLocalStorage } from '../../utils/local-storage';



const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const accessToken = getFromLocalStorage('accessToken');


  useEffect(() => {
    const fetchProfile = async () => {
      try {

        const profileResponse = await axios.get('https://food-hud-backend.vercel.app/api/v1/auth/profile', {
          headers: { Authorization: accessToken },
        });
        setUser(profileResponse?.data?.data);

        
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { day: '2-digit', month: 'short', year: 'numeric' };
    return date.toLocaleDateString(undefined, options);
  };
  

  if (loading) return <div>Loading...</div>;


  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {user && (
        <div className="bg-white shadow-lg rounded-lg p-8">
          <div className="flex items-center mb-8">
            <img
              src={user.photoURL || 'https://via.placeholder.com/150'}
              alt={user.displayName}
              className="h-24 w-24 rounded-full object-cover mr-8 shadow-md"
            />
            <div>
              <h2 className="text-xl font-extrabold text-gray-900">{user.displayName}</h2>
              <p className="text-md text-gray-700">{user.email}</p>
              <p className="text-md text-gray-600">Coins: {user.coins}</p>
              <p className="text-md text-gray-500">Role: {user.role}</p> {/* Added role display */}
              <p className="text-md text-gray-500">Member Since: {formatDate(user.createdAt)}</p>
            </div>
          </div>
       
        </div>
      )}
    </div>
  );
};

export default Profile;
