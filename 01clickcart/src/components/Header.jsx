import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
      {/* Logo */}
      <Link to="/" className="flex items-center space-x-2">
        <img
          src="https://files.oaiusercontent.com/file-2f7sFegjkfFvDjFnFsT1jy?se=2025-03-10T12%3A33%3A20Z&sp=r&sv=2024-08-04&sr=b&rscc=max-age%3D604800%2C%20immutable%2C%20private&rscd=attachment%3B%20filename%3D76c6b04e-64a5-4299-b425-741bd5149bcd.webp&sig=G5Bqzqo%2BWs4N5kmAdG0qfhKrgU9Qm2bG70YcBJHesJ0%3D" // Replace with your actual logo URL
          alt="ClickCart Logo"
          className="w-12 h-12"
        />
        <span className="text-xl font-bold">ClickCart</span>
      </Link>

      {/* Navbar Links */}
      <div className="space-x-4">
        <Link to="/products" className="hover:text-gray-400">
          Products
        </Link>
        <Link to="/cart" className="hover:text-gray-400 flex items-center space-x-1">
          🛒 <span>Cart</span>
        </Link>
      </div>
    </nav>
  );
};

export default Header;
