import React, { useState } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const [isSellerMenuOpen, setIsSellerMenuOpen] = useState(false);

  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
      {/* Logo */}
      <Link to="/" className="flex items-center space-x-2">
        <img
          src="https://files.oaiusercontent.com/file-2f7sFegjkfFvDjFnFsT1jy?se=2025-03-27T04%3A50%3A19Z&sp=r&sv=2024-08-04&sr=b&rscc=max-age%3D604800%2C%20immutable%2C%20private&rscd=attachment%3B%20filename%3D76c6b04e-64a5-4299-b425-741bd5149bcd.webp&sig=K0b19r/H7NtoWwvSI11ukmmDumfHxxkiHytxkTD2f7I%3D"
          alt="ClickCart Logo"
          className="w-12 h-12"
        />
        <span className="text-xl font-bold">ClickCart</span>
      </Link>

      {/* Navbar Links */}
      <div className="inline-flex space-x-6 items-center">
        <Link to="/products" className="hover:text-gray-400">Products</Link>
        <Link to="/cart" className="hover:text-gray-400 flex space-x-1">
          🛒 <span>Cart</span>
        </Link>
        <Link to="/best-selling" className="hover:text-gray-400">Best Selling</Link>

        {/* Seller Dropdown */}
        <div className="relative">
          <button
            className="bg-blue-500 px-4 py-2 rounded hover:bg-blue-600 transition"
            onClick={() => setIsSellerMenuOpen(!isSellerMenuOpen)}
          >
            Seller Portal ▼
          </button>

          {isSellerMenuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded shadow-lg z-50">
              <Link 
                to="/seller-register" 
                className="block px-4 py-2 hover:bg-gray-200"
                onClick={() => setIsSellerMenuOpen(false)}  // Closes dropdown after clicking
              >
                Seller Register
              </Link>
              <Link 
                to="/seller-login" 
                className="block px-4 py-2 hover:bg-gray-200"
                onClick={() => setIsSellerMenuOpen(false)}
              >
                Seller Login
              </Link>
              <Link 
                to="/seller-dashboard" 
                className="block px-4 py-2 hover:bg-gray-200 border-t"
                onClick={() => setIsSellerMenuOpen(false)}
              >
                Seller Dashboard
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
