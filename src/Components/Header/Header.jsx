import React from 'react';
import Navbar from '../Navbar/Navbar';
import Hero from '../Hero/Hero';

const Header = () => {
    return (
        <div className='bg-image'>
            <Navbar/>
            <Hero/>
        </div>
    );
};

export default Header;