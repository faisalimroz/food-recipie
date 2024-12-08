import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaHeart, FaMapMarkerAlt, FaPen, FaTrash, FaStar, FaCoins } from 'react-icons/fa';
import { Toaster, toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import DeleteModal from '../../Components/UI/DeleteModal/DeleteModal';
import { getFromLocalStorage } from '../../utils/local-storage';

const Recipe = () => {
  const [recipes, setRecipes] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRecipeId, setSelectedRecipeId] = useState(null);
  const accessToken = getFromLocalStorage('accessToken');


  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get('https://food-hud-backend.vercel.app/api/v1/recipe');
        setRecipes(response.data.data);
      } catch (error) {
        console.error('Error fetching recipes:', error);
      }
    };

    fetchRecipes();
  }, []);

  const handleDelete = async () => {
    try {
      const accessToken = getFromLocalStorage('accessToken'); 
      await axios.delete(`${apiUrl}/${selectedRecipeId}`, {
        headers: {
          Authorization:  accessToken 
        },
      });
      setRecipes(recipes.filter((recipe) => recipe._id !== selectedRecipeId));
      toast.success('Recipe deleted successfully');
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error deleting recipe:', error);
      toast.error('Failed to delete recipe');
    }
  };
  

  const openModal = (id) => {
    setSelectedRecipeId(id);
    setIsModalOpen(true);
  };

  return (
    <div className="p-6 bg-gray-100">
      <div className="flex justify-between mb-6">
        <h2 className="text-2xl font-semibold text-[#2a2a3d] mb-6">My Recipes</h2>
        <div>
          <Link to="/dashboard/create-recipe">
            <button className="text-white bg-[#22c55e] inline-flex items-center hover:text-white px-4 py-2 rounded text-md border border-[#22c55e]">
              Add Recipe
            </button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8">
        {recipes.map((recipe) => (
          <div key={recipe._id} className="bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="relative h-60 w-full">
              <img
                src={recipe.recipeImage}
                alt={recipe.recipeName}
                className="h-full w-full object-cover"
              />
              <div className="absolute top-0 left-0 m-4 bg-[#22c55e] text-white px-3 py-1 rounded-full text-sm font-medium">
                {recipe.category}
              </div>
              <div className="absolute top-0 right-0 m-4 bg-gray-800 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-1">
                <FaStar className="text-yellow-400" />
                <span>{recipe?.averageRating || '0'}</span>
              </div>
            </div>
            <div className="p-4">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center">
                  <FaMapMarkerAlt className="h-5 w-5 text-gray-400 mr-2" />
                  <span className="text-gray-500 text-sm">{recipe?.country}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <FaCoins className="h-5 w-5 text-yellow-500" />
                  <span className="text-gray-900 font-bold">10</span>
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{recipe?.recipeName}</h3>
              <div className="flex justify-end items-center">
                <div className="flex space-x-2">
                  <Link to={`/dashboard/recipe/${recipe?._id}`}>
                    <button className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-1 px-3 rounded-full flex items-center space-x-1">
                      <FaPen className="h-4 w-4" />
                      <span>Edit</span>
                    </button>
                  </Link>
                  <button
                    className="bg-red-500 hover:bg-red-600 text-white font-medium py-1 px-3 rounded-full flex items-center space-x-1"
                    onClick={() => openModal(recipe._id)} // Open delete modal
                  >
                    <FaTrash className="h-4 w-4" />
                    <span>Delete</span>
                  </button>
                </div>
               
              </div>
            </div>
            <Toaster position="top-right" reverseOrder={false} />
          </div>
        ))}
      </div>

      <DeleteModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default Recipe;
