// src/components/layout/Layout.tsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from '../comman/Navbar';

const Layout: React.FC = () => {
  return (
    <div>
      <Navbar />
      <div className="container md:p-4 lg:p-4 sm:p-0" style={{paddingLeft:0}}>
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
