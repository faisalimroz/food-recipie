import { useEffect, useState } from 'react';
import { FiMenu, FiX, FiChevronDown } from 'react-icons/fi';
import { Link, useLocation } from 'react-router-dom'; // Import useLocation from react-router
import { getFromLocalStorage } from '../../utils/local-storage';
import axios from 'axios';
import { TbCoinFilled } from "react-icons/tb";
import { removeUserInfo } from '../../utils/auth.service';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState({});
  const [userData, setUserData] = useState(null);
  const location = useLocation(); 

  
  const authKey = 'accessToken'; 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const accessToken = getFromLocalStorage(authKey);
        if (accessToken) {
          const response = await axios.get('https://food-hud-backend.vercel.app/api/v1/auth/profile', {
            headers: {
              Authorization: accessToken
            }
          });
          setUserData(response.data.data);
        }
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    fetchData();
  }, []);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  const toggleDropdown = (linkIndex) => {
    setDropdownOpen((prevState) => ({
      ...prevState,
      [linkIndex]: !prevState[linkIndex] || false,
    }));
  };

  const closeDropdown = () => {
    setDropdownOpen({});
  };

  const handleLogout = () => {
    removeUserInfo(); 
    setUserData(null); 
  };

  const navItems = [
    {
      title: 'Home',
      href: '/',
    },
    {
      title: 'Recipes',
      href: '/recipes',
    },

    ...(userData?.role === 'Admin' ? [{ title: 'Dashboard', href: '/dashboard' }] : []),
  ];

  // Determine if the current pathname is '/recipes'
  const isRecipesPage = location.pathname === '/recipes';

  return (
    <nav className={`mx-auto sm:px-6 md:px-[6rem] ${isRecipesPage ? 'bg-gray-900' : ''}`}>
      <div className="max-w-7xl py-4 mx-4 md:mx-0">
        <div className={`flex items-center justify-between ${isRecipesPage ? 'h-12' : 'h-16'}`}>
          <div className="flex items-center">
            <div className="flex-shrink-0 mr-8">
              <img
                src="https://foodhub.modeltheme.com/wp-content/themes/foodhub/images/logo.png"
                alt="Logo"
                className="h-[40px] w-[200px]"
              />
            </div>
          </div>
          <div className="hidden md:flex flex-grow justify-between items-center">
            <ul className="flex space-x-6 mx-auto">
              {navItems.map((item, index) => (
                <li key={index} className="relative">
                  <Link
                    to={item.href}
                    className='font-semibold text-white hover:text-[#22c55e] py-2 rounded-md text-md flex items-center'
                    onMouseEnter={() => toggleDropdown(index)}
                    onMouseLeave={closeDropdown}
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
            {userData ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <TbCoinFilled className="text-yellow-500 w-6 h-6" />
                  <span className='text-white ml-1'>{userData?.coins}</span>
                </div>
                <div className='flex items-center'>
                  <p className='text-white px-2'>{userData?.displayName}</p>
                  <img src={userData?.photoURL} alt="User" className="w-10 h-10 rounded-full" />
                </div>
                <button className="bg-red-500 hover:bg-red-400 text-white font-semibold py-2 px-8 rounded-full ml-6" onClick={() => handleLogout()}>
                  Logout
                </button>
              </div>
            ) : (
              <Link to="/login" className={`font-semibold py-2 px-8 rounded-full ml-6 ${isRecipesPage ? 'bg-[#22c55e] text-white' : 'bg-white text-[#22c55e] hover:bg-[#22c55e] hover:text-white'}`}>
                Login
              </Link>
            )}
          </div>
          <div className="flex items-center md:hidden">
            {userData && (
              <div className="flex items-center space-x-2 mr-4">
                <div className="flex items-center">
                  <TbCoinFilled className="text-yellow-500 w-6 h-6" />
                  <span className='text-white ml-1'>{userData?.coins}</span>
                </div>
                <div className="flex items-center">
                  <p className='text-white px-2'>{userData?.displayName}</p>
                  <img src={userData?.photoURL} alt="User" className="w-10 h-10 rounded-full" />
                </div>
              </div>
            )}
            <button
              className="text-white hover:text-[#22c55e] focus:outline-none"
              onClick={toggleNavbar}
            >
              {/* Hamburger menu icon */}
              <FiMenu className={`${isOpen ? 'hidden' : 'block'} h-8 w-8`} />
              {/* Close menu icon */}
              <FiX className={`${isOpen ? 'block' : 'hidden'} h-8 w-8`} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <div className={`fixed inset-0 z-40 bg-gray-800 bg-opacity-75 transition-opacity ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <div className={`fixed top-0 right-0 w-3/4 h-full bg-white p-6 transform transition-transform ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <button
            className="text-gray-800 hover:text-green-500 focus:outline-none"
            onClick={toggleNavbar}
          >
            <FiX className="h-8 w-8" />
          </button>
          <div className="mt-8">
            {navItems.map((item, index) => (
              <div key={index} className="mb-4">
                <Link
                  to={item.href}
                  className="font-semibold block text-gray-800 hover:text-green-500 py-2"
                  onClick={toggleNavbar}
                >
                  {item.title}
                </Link>
              </div>
            ))}
            {userData ? (
              <div className="mt-6">
                <button
                  onClick={handleLogout}
                  className="w-full bg-red-500 hover:bg-red-400 text-white font-semibold py-2 rounded-full"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="w-full bg-white text-[#22c55e] hover:bg-[#22c55e] hover:text-white font-semibold py-2 rounded-full mt-6 block text-center"
                onClick={toggleNavbar}
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
