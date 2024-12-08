import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RecipeCard from './RecipeCard';
import { useLocation, Link } from 'react-router-dom';
import FiltersRecipe from './FiltersRecipe';
import Pagination from '../UI/Pagination/Pagination';
import Footer from '../Footer/Footer';
import Navbar from '../Navbar/Navbar';
import { FiArrowRight } from 'react-icons/fi'; // Import the right arrow icon
import Loader from '../UI/Loader/Loader';

const AllRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    category: '',
    country: '',
  });
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  const itemsPerPage = 6;


 

  // Fetch recipes from the API
  useEffect(() => {
    const fetchRecipes = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`https://food-hud-backend.vercel.app/api/v1/recipe`, {
          params: {
            searchTerm: searchTerm || undefined,
            category: filters.category || undefined,
            country: filters.country || undefined,
            page,
            limit: itemsPerPage,
          },
        });

        const recipeData = response?.data?.data || [];
        const totalRecipes = response?.data?.meta?.total || 0;

        setRecipes(recipeData);
        setTotalPages(Math.ceil(totalRecipes / itemsPerPage));
      } catch (error) {
        console.error('Error fetching recipes:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, [searchTerm, filters, page]);

  // Handle search input change
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setPage(1); // Reset to the first page after search
  };

  // Handle filter change
  const handleFilterChange = (field, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [field]: value,
    }));
    setPage(1); // Reset to the first page when filters change
  };

  // Reset filters and search
  const resetFilters = () => {
    setSearchTerm('');
    setFilters({
      category: '',
      country: '',
    });
    setPage(1); // Reset to the first page when filters are reset
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  return (
    <div className={`${location.pathname === '/' ? 'py-[5rem]' : 'main'}`}>
      {location.pathname === '/recipes' && <Navbar />}

      <div className="mx-auto sm:px-6 md:px-[6rem] my-4 ">
        <div className="mb-8">
          <div className={`text-start  ${location.pathname === '/' ? '' : 'my-12'}`}>
            <h2 className="text-2xl font-semibold text-gray-900 sm:text-4xl mb-6 mx-4 md:mx-0">
              All Recipes
            </h2>
          </div>

          {/* Filters Component */}
          {location.pathname === '/recipes' && (
            <FiltersRecipe
              searchTerm={searchTerm}
              handleSearch={handleSearch}
              filters={filters}
              handleFilterChange={handleFilterChange}
              resetFilters={resetFilters}
            />
          )}
        </div>

        {/* Loading and Recipes List */}
        {loading ? (
          <div><Loader/></div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8 mx-4 md:mx-0">
              {recipes.map((recipe) => (
                <RecipeCard key={recipe._id} recipe={recipe} />
              ))}
            </div>

            {/* Pagination */}
            {location.pathname === '/recipes' && (
              <Pagination
                currentPage={page}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            )}

            {/* See More Button for Homepage */}
            {location.pathname === '/' && (
              <div className="flex justify-center mt-8">
                <Link
                  to="/recipes"
                  className="flex items-center justify-center bg-green-500 text-white hover:bg-green-600 px-6 py-3 rounded-md text-lg font-semibold transition duration-300"
                >
                  See More <FiArrowRight className="ml-2" />
                </Link>
              </div>
            )}
          </>
        )}
      </div>
      {location.pathname === '/recipes' && <Footer />}
    </div>
  );
};

export default AllRecipes;
