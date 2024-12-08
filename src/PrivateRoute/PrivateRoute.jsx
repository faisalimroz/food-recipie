import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { getFromLocalStorage } from '../utils/local-storage';

const PrivateRoute = ({ children }) => {
  const isAuthenticated = getFromLocalStorage('accessToken');
  const location = useLocation();

  return isAuthenticated ? children : <Navigate to={`/login?redirect=${location.pathname}`} />;
};

export default PrivateRoute;
