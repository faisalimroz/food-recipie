// src/components/Topbar.jsx
import React, { useState, useRef } from 'react';
import { FiMenu, FiX, FiBell } from 'react-icons/fi';
import { TfiWorld } from 'react-icons/tfi';
import { useClickAway } from 'react-use';
import { Link } from 'react-router-dom';

const Topbar = ({ isSidebarOpen, onToggleSidebar }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileButtonRef = useRef(null);
  const profileMenuRef = useRef(null);

  const toggleProfileMenu = () => {
    setIsProfileOpen((prev) => !prev);
  };

  useClickAway(profileMenuRef, () => {
    setIsProfileOpen(false);
  });

  return (
    <header className="bg-white ">
      <div className="container mx-auto flex items-center justify-between p-4">
        <div className="flex items-center">
          <button className="mr-3 md:hidden" onClick={onToggleSidebar}>
            {isSidebarOpen ? <FiX className="w-7 h-7 text-blue-600" /> : <FiMenu className="w-7 h-7 text-blue-600" />}
          </button>
          <Link to="/" className="hidden md:block">
            <div className="flex items-center space-x-3">
             
             
            </div>
          </Link>
        </div>

        <div className="flex items-center space-x-3">
          <Link to="/">
            <button className="p-2 rounded-full hover:text-blue-600 text-gray-500 flex items-center text-sm">
              <TfiWorld className="w-4 h-4 mr-2" />
              <span className="text-xs">View Site</span>
            </button>
          </Link>
         
          <div className="relative">
            <button
              onClick={toggleProfileMenu}
              ref={profileButtonRef}
              className="flex items-center space-x-2 focus:outline-none"
              tabIndex={0}
            >
              <div className="w-11 h-11 relative rounded-full overflow-hidden">
                <img
                  src="/path/to/default-avatar.png" // Add your image source
                  alt="User Image"
                  className="rounded-full object-cover w-full h-full"
                />
              </div>
            </button>
            {isProfileOpen && (
              <div
                ref={profileMenuRef}
                className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg"
              >
                <Link to="/provider/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={() => setIsProfileOpen(false)}>
                  Profile
                </Link>
                <div className="border-t border-gray-200"></div>
                <button className="block w-full text-left px-4 py-2 text-sm cursor-pointer text-red-600 hover:bg-gray-100" onClick={() => {/* Logout Logic */}}>
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Topbar;
