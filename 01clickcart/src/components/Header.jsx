import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
      {/* Logo */}
      <Link to="/" className="flex items-center space-x-2">
        <img
          src="https://files.oaiusercontent.com/file-2f7sFegjkfFvDjFnFsT1jy?se=2025-03-18T06%3A25%3A10Z&sp=r&sv=2024-08-04&sr=b&rscc=max-age%3D604800%2C%20immutable%2C%20private&rscd=attachment%3B%20filename%3D76c6b04e-64a5-4299-b425-741bd5149bcd.webp&sig=J6lQsHoQP6xFjM78rE1eCNUulSBpn69USP3eU%2BEUhO8%3D" // Replace with your actual logo URL
          alt="ClickCart Logo"
          className="w-12 h-12"
        />
        <span className="text-xl font-bold">ClickCart</span>
      </Link>

      {/* Navbar Links */}
      <div className="mr-4 space-x-4">
        <Link to="/products" className="hover:text-gray-400">
          Products
        </Link>
        <Link to="/cart" className="hover:text-gray-400 flex space-x-1">
          🛒 <span>Cart</span>
        </Link>
        <Link to="/best-selling" className="hover:text-gray-400 flex"> 
          Best Selling
        </Link>
      </div>
    </nav>
  );
};

export default Header;
