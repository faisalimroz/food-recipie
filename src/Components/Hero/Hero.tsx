import React from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
    return (
        <div className=' sm:px-6 md:px-[6rem] mx-4 md:mx-0'>
              <div className="relative z-10 text-white  py-[8rem] ">
        <h1 className="text-5xl font-bold mb-4">Discover Delicious Recipes</h1>
        <p className="text-xl mb-8">Find the perfect dish for any occasion</p>
        <div className="space-x-4 py-4">
         <Link to="/recipes"> <button
           
           className="bg-[#22c55e] hover:bg-white text-white hover:text-[#22c55e] font-semibold py-3 px-7 rounded-full"
         >
           See Recipes
         </button></Link>
        
      
        </div>
      </div>
        </div>
    );
};

export default Hero;