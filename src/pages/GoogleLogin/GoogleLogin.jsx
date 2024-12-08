import React from 'react';
import { auth, provider } from '../../firebase/firebase';
import { FcGoogle } from 'react-icons/fc';
import { signInWithPopup } from 'firebase/auth';
import axios from 'axios';
import { storeUserInfo } from '../../utils/auth.service';
import { useNavigate } from 'react-router-dom';


const GoogleLogin = () => {
  const navigate = useNavigate();
 
  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const { displayName,email,photoURL} = result.user;
    
      const userData = {
      
        displayName: displayName,
        email: email, 
        photoURL:photoURL,
        coins:50
      };
  
      // Send user information to the server
      const response = await axios.post('https://food-hud-backend.vercel.app/api/v1/auth/login', userData);
      console.log(response.data.data.accessToken,'23')
      storeUserInfo({ accessToken: response.data.data.accessToken });
      
      // Handle the response from the server
      if (response.data.data.accessToken) {
  const redirectPath = new URLSearchParams(location.search).get('redirect');
  if (redirectPath) {
    navigate(redirectPath); 
  } else {
    navigate('/');
  }
      } else {
        console.error('Error logging in:', response.data.message);
      }
    } catch (error) {
      console.error('Error signing in with Google:', error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
    <button
      onClick={handleGoogleLogin}
      className="flex items-center justify-center px-6 py-3 text-white bg-gray-800 rounded-md shadow-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-opacity-50"
    >
      <FcGoogle className="w-6 h-6 mr-2" />
      <span className="font-medium">Sign in with Google</span>
    </button>
  </div>
  );
};

export default GoogleLogin;
