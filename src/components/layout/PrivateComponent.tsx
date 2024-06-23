// // src/components/PrivateRoute.tsx
// import { useAuth } from '@/contexts/AuthContext';
// // import React from 'react';
// import { Navigate, Outlet } from 'react-router-dom';
// // import { useAuth } from '../contexts/AuthContext';

// // interface PrivateRouteProps {
// //     element: React.FC;
// // }

// // const PrivateRoute: React.FC<PrivateRouteProps> = ({ element: Component }) => {
// //     const { currentUser } = useAuth();
// //     return currentUser ? <Component /> : <Navigate to="/login" />;
// // };

// // export default PrivateRoute;


// const Privatecomponent = () => {

//     // let auth = localStorage.getItem('reader');
//     // let log = localStorage.getItem('log');
//     // let admin_auth=localStorage.getItem('adminn')
//     const { currentUser } = useAuth();
//     console.log('currentUser',currentUser)
//     return currentUser ? <Outlet /> : <Navigate to='/login' />
// }

// export default Privatecomponent;