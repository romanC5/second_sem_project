import React from 'react';
import { FiSearch, FiShoppingCart, FiUser } from 'react-icons/fi';
import Logo from '../assets/Logo1.png'; 


const Header = () => {
  return (
    <header className="bg-gradient-to-r from-red-500 to-red-600 shadow-md mb-4">
      <div className="container mx-auto px-4">
        <nav className="flex flex-col md:flex-row justify-between items-center py-4 gap-4">

          {/* Logo */}
          <a href="/">
          <div className="flex items-center gap-1 ">
              <img className='h-12 w-auto cursor-pointer' src={Logo} alt="Logo" />
               <h2 className="text-2xl md:text-4xl font-bold text-white tracking-tighter cursor-pointer">
              Kinmel
            </h2>
          </div>
          </a>

          {/* Search Bar */}
          <div className="w-full md:w-1/3">
            <form className="relative">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full py-3 px-4 pr-12 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-red-300 bg-gray-200"
               
              />
              <button 
                type="submit"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-red-600"
                aria-label="Submit search"
              >
                <FiSearch size={20} />
              </button>
            </form>
          </div>

          {/* Navigation Icons */}
          <div className="flex space-x-6">
            <button 
              className="text-white hover:text-gray-200 transition-colors relative cursor-pointer"
              aria-label="User account"
            >
              <FiUser size={24} />
            </button>
            
            <button 
              className="text-white hover:text-gray-200 transition-colors relative cursor-pointer"
              aria-label="Shopping cart"
            >
              <FiShoppingCart size={24} />
              <span className="absolute -top-2 -right-2 bg-white text-red-600 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                0
              </span>
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;