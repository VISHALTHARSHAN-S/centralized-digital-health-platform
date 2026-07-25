import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/navbar/Navbar';
import Sidebar from '../components/sidebar/Sidebar';
import ToastContainer from '../components/common/Toast';

const DashboardLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-healthBg">
      <Navbar />
      <ToastContainer />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-6 lg:p-8 max-w-7xl overflow-x-hidden">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
