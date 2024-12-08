import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaUserEdit, FaTrashAlt } from 'react-icons/fa';
import { getFromLocalStorage } from '../../utils/local-storage';

// Utility function to format date
const formatDate = (dateString) => {
  const date = new Date(dateString);
  const options = { day: '2-digit', month: 'short', year: 'numeric' };
  return date.toLocaleDateString(undefined, options);
};

const User = () => {
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const accessToken = getFromLocalStorage('accessToken');


  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('https://food-hud-backend.vercel.app/api/v1/auth/users',{
          headers: {
            Authorization: accessToken
          }
          });
        setUsers(response?.data?.data || []);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleDeleteClick = (userId) => {
    setSelectedUserId(userId);
    setIsModalOpen(true);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`https://food-hud-backend.vercel.app/api/v1/auth/users/${selectedUserId}`,{
        headers: {
          Authorization: accessToken
        }
        });
      setUsers(users.filter((user) => user._id !== selectedUserId));
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-4xl font-extrabold text-gray-900 mb-8 text-center">User List</h2>
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full bg-white">
          <thead className="bg-gradient-to-r from-green-500 to-green-600 text-white">
            <tr>
              <th className="py-3 px-6 text-left text-sm font-medium uppercase tracking-wider">Name</th>
              <th className="py-3 px-6 text-left text-sm font-medium uppercase tracking-wider">Email</th>
              <th className="py-3 px-6 text-left text-sm font-medium uppercase tracking-wider">Coins</th>
              <th className="py-3 px-6 text-left text-sm font-medium uppercase tracking-wider">Role</th>
              <th className="py-3 px-6 text-left text-sm font-medium uppercase tracking-wider">Created At</th>
              <th className="py-3 px-6 text-left text-sm font-medium uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {users
              .filter(user => user.role !== 'Admin') // Filter out Admins
              .map((user) => (
                <tr key={user._id} className="border-b border-gray-200 hover:bg-gray-50 transition duration-200">
                  <td className="py-4 px-6 text-sm font-medium flex items-center">
                    <img
                      src={user.photoURL || 'https://via.placeholder.com/150'}
                      alt={user.displayName}
                      className="h-12 w-12 rounded-full mr-3 object-cover"
                    />
                    {user.displayName}
                  </td>
                  <td className="py-4 px-6 text-sm">{user.email}</td>
                  <td className="py-4 px-6 text-sm">{user.coins}</td>
                  <td className="py-4 px-6 text-sm">{user.role}</td>
                  <td className="py-4 px-6 text-sm">{formatDate(user.createdAt)}</td>
                  <td className="py-4 px-6 text-sm">
                    <div className="flex space-x-4">
                      
                      <button
                        className="text-red-500 hover:text-red-700 transition duration-200"
                        onClick={() => handleDeleteClick(user._id)}
                      >
                        <FaTrashAlt className="h-5 w-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {/* Delete Confirmation Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-600 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold mb-4">Confirm Deletion</h3>
            <p className="mb-4">Are you sure you want to delete this user?</p>
            <div className="flex space-x-4">
              <button
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                onClick={handleDelete}
              >
                Delete
              </button>
              <button
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default User;
