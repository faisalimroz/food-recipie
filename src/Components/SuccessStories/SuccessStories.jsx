import React from 'react';
import CountUp from 'react-countup';

const SuccessStories = () => {
  return (
    <div className="bg-gray-100 py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Success Stories
          </h2>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
            See why thousands of people love using our food recipe platform.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-white shadow-lg rounded-lg p-8 text-center">
            <div className="text-4xl font-extrabold text-[#22c55e]">
              <CountUp end={12345} duration={3} />+
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mt-4">Recipes</h3>
            <p className="text-gray-500 mt-2">
              Discover a wide variety of delicious recipes.
            </p>
          </div>
          <div className="bg-white shadow-lg rounded-lg p-8 text-center">
            <div className="text-4xl font-extrabold text-[#22c55e]">
              <CountUp end={54321} duration={3} />+
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mt-4">Users</h3>
            <p className="text-gray-500 mt-2">
              Join our growing community of food enthusiasts.
            </p>
          </div>
          <div className="bg-white shadow-lg rounded-lg p-8 text-center">
            <div className="text-4xl font-extrabold text-[#22c55e]">
              <CountUp end={98} duration={3} />%
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mt-4">
              Satisfaction Rate
            </h3>
            <p className="text-gray-500 mt-2">
              Our users love the platform and keep coming back.
            </p>
          </div>
          <div className="bg-white shadow-lg rounded-lg p-8 text-center">
            <div className="text-4xl font-extrabold text-[#22c55e]">
              <CountUp end={4.9} duration={3} />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mt-4">
              Average Rating
            </h3>
            <p className="text-gray-500 mt-2">
              Our users consistently rate us highly.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessStories;
