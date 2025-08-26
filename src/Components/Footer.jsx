import React from 'react'
import logo from '../assets/Logo1.png';
import { Link } from 'react-router';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-200 py-8 mt-10">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
        {/* Branding */}
        <div className="flex items-center gap-2">
          <img src={logo} alt="Logo" className="h-10 w-10 rounded-full" />
          <span className="font-bold text-lg tracking-wide">Kinmel</span>
        </div>
        {/* Navigation Links */}
        <nav className="flex flex-wrap gap-4 text-sm">
       
          <Link to="/about" className="hover:text-white transition">About Us</Link>
          <Link to="/contact" className="hover:text-white transition">Contact Us</Link>
        </nav>
        {/* Copyright */}
        <div className="text-xs text-gray-400 text-center md:text-right">
          &copy; {new Date().getFullYear()} Kinmel. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer
