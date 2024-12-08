import React from 'react';
import { FaSearch, FaRedoAlt } from 'react-icons/fa'; // Importing reset icon from react-icons
import { foodCategoryOptions, countryCategoryOptions } from '../../constants/constants';

const FiltersRecipe = ({ searchTerm, handleSearch, filters, handleFilterChange, resetFilters }) => {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between  mx-4 md:mx-0 ">
      {/* Search Input */}
      <div className="relative w-full sm:w-auto flex-1 mb-4 sm:mb-0 sm:mr-4">
        <FaSearch className="absolute top-1/2 left-4 transform -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search recipes..."
          value={searchTerm}
          onChange={handleSearch}
          className="w-full sm:w-[400px] pl-12 pr-4 py-3 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500  transition duration-300"
        />
      </div>

      {/* Category Filter */}
      <div className="relative w-full sm:w-auto mb-4 sm:mb-0 sm:mr-4">
        <select
          value={filters.category}
          onChange={(e) => handleFilterChange('category', e.target.value)}
          className="w-full sm:w-auto px-4 py-3 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300"
        >
          <option value="">Filter by Category</option>
          {foodCategoryOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {/* Country Filter */}
      <div className="relative w-full sm:w-auto mb-4 sm:mb-0 sm:mr-4">
        <select
          value={filters.country}
          onChange={(e) => handleFilterChange('country', e.target.value)}
          className="w-full sm:w-auto px-4 py-3 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500  transition duration-300"
        >
          <option value="">Filter by Country</option>
          {countryCategoryOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

     
      <button
  onClick={resetFilters}
  className="flex items-center px-6 py-3.5 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-300 justify-start sm:justify-center"
>
  <FaRedoAlt className="mr-2" />
  Reset Filters
</button>

    </div>
  );
};

export default FiltersRecipe;
