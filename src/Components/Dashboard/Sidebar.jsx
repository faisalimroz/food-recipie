// src/components/Sidebar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { MdDashboard, MdRestaurantMenu, MdPerson, MdExitToApp } from 'react-icons/md';
import { FiX } from 'react-icons/fi';

const Sidebar = ({ isOpen, onToggle }) => {
  return (
    <div
      className={`fixed md:relative  inset-y-0 left-0 w-64 bg-gray-800 text-white transition-transform duration-300 transform ${
        isOpen ? 'translate-x-0 z-50' : '-translate-x-full z-40'
      } md:translate-x-0`}
    >
      <div className="flex flex-col h-full">
        <div className="text-center py-4 border-b border-gray-700 relative">
          <img
            src="https://foodhub.modeltheme.com/wp-content/themes/foodhub/images/logo.png"
            alt="Logo"
            className="h-[30px] w-[150px] ml-2"
          />
          <button
            onClick={onToggle}
            className="absolute top-4 right-4 text-white hover:text-gray-200 md:hidden"
          >
            <FiX size={24} />
          </button>
        </div>
        <nav className="mt-6 flex-1">
          <ul>
            <li>
              <Link to="/dashboard" className="flex items-center p-4 hover:bg-gray-700">
                <MdDashboard className="text-lg mr-3" />
                <span>Dashboard</span>
              </Link>
            </li>
            <li>
              <Link to="/dashboard/recipe" className="flex items-center p-4 hover:bg-gray-700">
                <MdRestaurantMenu className="text-lg mr-3" />
                <span>Recipe</span>
              </Link>
            </li>
            <li>
              <Link to="/dashboard/user" className="flex items-center p-4 hover:bg-gray-700">
                <MdPerson className="text-lg mr-3" />
                <span>User</span>
              </Link>
            </li>
          </ul>
        </nav>
        <div className="p-4 border-t border-gray-700">
          <button
            className="w-full bg-gray-900 text-white py-2 px-4 rounded-lg flex items-center justify-center"
            onClick={onToggle}
          >
            <MdExitToApp className="text-lg mr-2" />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
