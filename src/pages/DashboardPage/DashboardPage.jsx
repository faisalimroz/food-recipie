import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaUtensils, FaShoppingCart, FaUsers } from 'react-icons/fa';

const DashboardContent = () => {
    const [statistics, setStatistics] = useState({
        totalRecipes: 0,
        totalOrdersToday: 0, 
        totalCustomers: 0,
    });

  

    useEffect(() => {
        const fetchStatistics = async () => {
            try {
                const response = await axios.get('https://food-hud-backend.vercel.app/api/v1/auth/statistic');
                setStatistics({
                    totalRecipes: response?.data?.data?.totalRecipes,
                    totalOrdersToday: 24, // If orders today are static, you might want to keep this manually or adjust based on real API
                    totalCustomers: response?.data?.data?.totalUsers,
                });
            } catch (error) {
                console.error('Error fetching statistics:', error);
            }
        };

        fetchStatistics();
    }, []);

    return (
        <div className="p-4 sm:p-6 bg-gray-100">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {/* Card 1: Total Recipes */}
                <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md flex items-center">
                    <div className="p-3 sm:p-4 bg-blue-100 rounded-full">
                        <FaUtensils className="text-2xl sm:text-3xl text-blue-600" />
                    </div>
                    <div className="ml-3 sm:ml-4">
                        <h2 className="text-xl sm:text-2xl font-bold text-gray-700">Total Recipes</h2>
                        <p className="mt-1 sm:mt-2 text-2xl sm:text-3xl font-semibold text-gray-900">{statistics.totalRecipes}</p>
                    </div>
                </div>

                {/* Card 2: Orders Today */}
                <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md flex items-center">
                    <div className="p-3 sm:p-4 bg-green-100 rounded-full">
                        <FaShoppingCart className="text-2xl sm:text-3xl text-green-600" />
                    </div>
                    <div className="ml-3 sm:ml-4">
                        <h2 className="text-xl sm:text-2xl font-bold text-gray-700">Orders Today</h2>
                        <p className="mt-1 sm:mt-2 text-2xl sm:text-3xl font-semibold text-gray-900">{statistics.totalOrdersToday}</p>
                    </div>
                </div>

                {/* Card 3: Total Customers */}
                <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md flex items-center">
                    <div className="p-3 sm:p-4 bg-yellow-100 rounded-full">
                        <FaUsers className="text-2xl sm:text-3xl text-yellow-600" />
                    </div>
                    <div className="ml-3 sm:ml-4">
                        <h2 className="text-xl sm:text-2xl font-bold text-gray-700">Total Customers</h2>
                        <p className="mt-1 sm:mt-2 text-2xl sm:text-3xl font-semibold text-gray-900">{statistics.totalCustomers}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardContent;
