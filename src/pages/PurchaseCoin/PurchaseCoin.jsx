import React from 'react';
import toast from 'react-hot-toast';
import axios from 'axios';
import { FaCheck, FaMedal, FaCrown } from 'react-icons/fa';

const PurchaseCoinCard = ({ title, coins, price, bonus, onClick, tier }) => {
  const getTierStyles = () => {
    switch (tier) {
      case 'basic':
        return {
          bgColor: 'bg-white', // White for basic
          textColor: 'text-green-500', // Standard green
          borderColor: 'border-green-500',
          buttonColor: 'bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 text-white',
          icon: <FaCheck className="text-[#22c55e] h-6 w-6" />, // Basic check icon
          badge: 'Basic',
        };
      case 'standard':
        return {
          bgColor: 'bg-white',
          textColor: 'text-green-500', // Green text for standard
          borderColor: 'border-green-500',
          buttonColor: 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-500 hover:to-green-700 text-white',
          icon: <FaMedal className="text-green-400 h-6 w-6" />, // Standard medal icon
          badge: 'Standard',
        };
      case 'premium':
        return {
          bgColor: 'bg-white',
          textColor: 'text-green-500', // Darker green for premium
          borderColor: 'border-green-500',
          buttonColor: 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-500 hover:to-green-700 text-white',
          icon: <FaCrown className="text-green-500 h-6 w-6" />, // Premium crown icon
          badge: 'Premium',
        };
      default:
        return {};
    }
  };

  const { bgColor, textColor, borderColor, buttonColor, icon, badge } = getTierStyles();

  return (
    <div className={` mx-4 md:mx-0 border rounded-lg overflow-hidden mb-8 transition-transform duration-300 transform hover:shadow-md ${borderColor} ${bgColor}`}>
      <div className="p-8">
        <div className="flex items-center justify-between mb-4">
          <span className={`bg-green-500 text-white font-bold text-sm py-1 px-3 rounded-full`}>{badge}</span>
          {icon}
        </div>
        <h3 className={`text-2xl font-bold mb-4 ${textColor}`}>{title}</h3>
        <div className="flex items-center mb-6">
          <span className={`text-4xl font-bold mr-2 ${textColor}`}>{coins}</span>
          <span className="text-gray-700 text-base">Coins</span>
        </div>
        <div className="flex items-center mb-6">
          <span className={`text-4xl font-bold mr-2 ${textColor}`}>${price}</span>
          <span className="text-gray-700 text-base">USD</span>
        </div>
        {bonus && <p className="text-sm text-gray-500 mb-4">Get {bonus} bonus coins with this purchase!</p>}
        <button
          onClick={onClick}
          className={`w-full font-semibold py-3 px-6 rounded-full transition-colors duration-300 shadow-lg ${buttonColor}`}
        >
          Buy Now
        </button>
      </div>
    </div>
  );
};

const PurchaseCoin = () => {


  const handlePurchase = async (coins, price) => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      if (!accessToken) {
        toast.error('You need to log in to make a purchase.');
        return;
      }
      

      const response = await axios.post(
        'https://food-hud-backend.vercel.app/api/v1/payment/init',
        {
          total_amount: price,
          coins: coins,
        },
        {
          headers: {
            Authorization: `${accessToken}`,
          },
        }
      );

      if (response.data) {
        const redirectPath = response.data.data;
        window.location.href = redirectPath;
      } else {
        toast.error('Failed to initiate payment. Please try again.');
      }
    } catch (error) {
      console.error('Error initiating payment:', error);
      toast.error('An error occurred while initiating payment.');
    }
  };

  return (
    <div className="mx-auto sm:px-6 md:px-[6rem] my-4 main">
      <h2 className="text-3xl font-bold text-gray-900 mb-8 mx-4 md:mx-0">Purchase Coins</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <PurchaseCoinCard
          title="Basic 100 Coins"
          coins={100}
          price={5}
          tier="basic"
          onClick={() => handlePurchase(100, 5)}
        />
        <PurchaseCoinCard
          title="Standard 500 Coins"
          coins={500}
          price={10}
          bonus={50}
          tier="standard"
          onClick={() => handlePurchase(500, 10)}
        />
        <PurchaseCoinCard
          title="Premium 1000 Coins"
          coins={1000}
          price={20}
          bonus={200}
          tier="premium"
          onClick={() => handlePurchase(1000, 20)}
        />
      </div>
    </div>
  );
};

export default PurchaseCoin;
