import React from 'react';
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi'; // Import arrow icons

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className="flex justify-center items-center mt-[4rem] mb-[8rem]">
      <ul className="inline-flex space-x-2">
        {/* Previous Button */}
        <li>
          <button
            onClick={handlePrevious}
            disabled={currentPage === 1}
            className={`flex items-center justify-center h-10 sm:h-12 w-10 sm:w-auto px-3 py-2 text-white rounded-md ${
              currentPage === 1 ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-500 hover:bg-green-600'
            }`}
          >
            {/* Show icon with text, but hide text on small devices */}
            <span className="flex items-center">
              <FiArrowLeft className="text-xl" />
              <span className="hidden sm:inline ml-1">Previous</span> {/* Show text on small and larger devices */}
            </span>
          </button>
        </li>

        {/* Page Numbers - show on all device sizes */}
        {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => (
          <li key={pageNumber}>
            <button
              onClick={() => onPageChange(pageNumber)}
              className={`h-10 sm:h-12 w-10 sm:w-auto px-4 py-2 rounded-md ${
                currentPage === pageNumber
                  ? 'bg-green-500 text-white border-green-500'
                  : 'bg-white text-green-500 border border-green-500 hover:bg-green-500 hover:text-white'
              }`}
            >
              {pageNumber}
            </button>
          </li>
        ))}

        {/* Next Button */}
        <li>
          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className={`flex items-center justify-center h-10 sm:h-12 w-10 sm:w-auto px-3 py-2 text-white rounded-md ${
              currentPage === totalPages ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-500 hover:bg-green-600'
            }`}
          >
            {/* Show icon with text, but hide text on small devices */}
            <span className="flex items-center">
              <span className="hidden sm:inline mr-1">Next</span> {/* Show text on small and larger devices */}
              <FiArrowRight className="text-xl" />
            </span>
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Pagination;
