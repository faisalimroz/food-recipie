// src/pages/Dashboard/Dashboard.jsx
import React, { useState } from 'react';
import Sidebar from './Sidebar'; // Adjust the path as necessary
import Topbar from './Topbar'; // Adjust the path as necessary

const DashboardLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
  <div>
      <div className="flex h-screen bg-gray-100 main" >
      {/* Sidebar Component */}
      <Sidebar isOpen={isSidebarOpen} onToggle={toggleSidebar} />

      <div className={`flex-1 flex flex-col transition-transform duration-300 `}>
        {/* Topbar Component */}
        <Topbar isSidebarOpen={isSidebarOpen} onToggleSidebar={toggleSidebar} />

        {/* Main Content */}
        <main className="flex-1 p-4 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  </div>
  );
};

export default DashboardLayout;
