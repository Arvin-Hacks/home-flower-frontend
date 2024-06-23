// src/components/layout/Layout.tsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from '../comman/Navbar';

const Layout: React.FC = () => {
  return (
    <div>
      <Navbar />
      <div className="container mx-auto p-4">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
