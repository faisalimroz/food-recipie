import React from 'react';
import { AiFillTwitterSquare, AiFillFacebook, AiFillInstagram, AiFillLinkedin, AiFillYoutube } from 'react-icons/ai';

const Footer = () => {
  return (
    <div className='mx-auto sm:px-6 md:px-[6rem] bg-gray-900 text-white'>
      <div className="mx-auto py-12 lg:py-16">
        <div className="flex flex-col space-y-8 md:flex-row md:space-y-0">
          <div className="md:pr-16">
            <a className="block h-[45px] w-[45px] sm:h-[60px] sm:w-[60px]" href="/" title="Food Hub">
              <span className="sr-only">Food Hub</span>
             <div className="w-[200px] h-[40px]">
             <img
                src="https://foodhub.modeltheme.com/wp-content/themes/foodhub/images/logo.png"
                alt="Logo"
                
              />
             </div>
            </a>
            <p className="mt-4 text-sm">Unlock the flavors of life with Food Hub. Explore our collection of delicious recipes and discover the joy of cooking.</p>
          </div>
          <div className="flex flex-col space-y-8 sm:flex-row sm:space-x-16 sm:space-y-0 md:justify-items-center">
            <div>
              <h3 className="font-semibold tracking-wider">Explore</h3>
              <ul className="mt-2 space-y-1">
                <li><a href="/recipes" className="font-light text-sm text-inherit">All Recipes</a></li>
                <li><a href="/categories" className="font-light text-sm text-inherit">Recipe Categories</a></li>
                <li><a href="/trending" className="font-light text-sm text-inherit">Trending Recipes</a></li>
                <li><a href="/add-recipe" className="font-light text-sm text-inherit">Add a Recipe</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold tracking-wider">About Us</h3>
              <ul className="mt-2 space-y-1">
                <li><a href="/about" className="font-light text-sm text-inherit">Our Story</a></li>
                <li><a href="/team" className="font-light text-sm text-inherit">Our Team</a></li>
                <li><a href="/contact" className="font-light text-sm text-inherit">Contact Us</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold tracking-wider">Help</h3>
              <ul className="mt-2 space-y-1">
                <li><a href="/faq" className="font-light text-sm text-inherit">FAQs</a></li>
                <li><a href="/support" className="font-light text-sm text-inherit">Customer Support</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-200 pt-8 md:flex md:items-center md:justify-between">
          <div className="flex space-x-6 md:order-2">
           
            <a href="https://web.facebook.com/syedmilka.cricket/" target="_blank"><AiFillFacebook size={25} /></a>
            <a href="https://www.instagram.com/mikat_syed/" target="_blank"><AiFillInstagram size={25} /></a>
            <a href="https://www.linkedin.com/in/mikat-syed/" target="_blank"><AiFillLinkedin size={25} /></a>
           
          </div>
          <p className="mt-8 text-base md:order-1 md:mt-0">&copy; 2024 Food Hub</p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
