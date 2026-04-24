import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return <div className="h-screen w-full flex items-center justify-center"><span className="loading loading-spinner loading-lg"></span></div>;
  if (!user) return <Navigate to="/login" />;

  return <>{children}</>;
};

export const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return <div className="h-screen w-full flex items-center justify-center"><span className="loading loading-spinner loading-lg"></span></div>;
  if (!user || user.role !== 'admin') return <Navigate to="/" />;

  return <>{children}</>;
};
