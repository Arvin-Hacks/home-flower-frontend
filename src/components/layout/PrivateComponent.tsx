// // src/components/PrivateRoute.tsx
// import { useAuth } from '@/contexts/AuthContext';
// // import React from 'react';
// import { Navigate, Outlet } from 'react-router-dom';
// // import { useAuth } from '../contexts/AuthContext';

import { useCookies } from "react-cookie"
import { Navigate, Outlet } from "react-router-dom"

// // interface PrivateRouteProps {
// //     element: React.FC;
// // }

// // const PrivateRoute: React.FC<PrivateRouteProps> = ({ element: Component }) => {
// //     const { currentUser } = useAuth();
// //     return currentUser ? <Component /> : <Navigate to="/login" />;
// // };

// // export default PrivateRoute;


const Privatecomponent = () => {

    // let auth = localStorage.getItem('reader');
    // let log = localStorage.getItem('log');
    const [cookie] = useCookies(['tete_user'])

    console.log('currentUser', cookie?.tete_user)
    console.log('currentUser', cookie?.tete_user?._doc)
    console.log('currentUser', cookie?.tete_user?.flower)
    console.log('currentUser', cookie?.tete_user)
    return cookie?.tete_user ? <Outlet /> : <Navigate to='/login' />
}

export default Privatecomponent;