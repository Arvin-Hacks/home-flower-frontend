// src/components/ProtectedRoute.tsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { useCookies } from 'react-cookie';

interface ProtectedRouteProps {
  children: React.ReactNode;
  roles?: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, roles }) => {
//   const { user, loading } = useAuth();
const cookie=useCookies(['tete_user'])

// const userr=localStorage.getItem('tete_user')

//   if (loading) {
//     return <div>Loading...</div>;
//   }

console.log('private Route==',cookie?.[0]?.tete_user)

  if (!cookie?.[0]?.tete_user) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
