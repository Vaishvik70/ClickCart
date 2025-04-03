import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const Header = ({ cartCount }) => {
  const [isSellerMenuOpen, setIsSellerMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsSellerMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
        
        {/* Cart with Badge */}
        <Link to="/cart" className="hover:text-gray-400 relative flex items-center space-x-1">
          🛒 <span>Cart</span>
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-4 bg-red-500 text-white text-xs rounded-full px-2 py-0.5">
              {cartCount}
            </span>
          )}
        </Link>
        
        <Link to="/best-selling" className="hover:text-gray-400">Best Selling</Link>
        <Link to="/seller-page" className="hover:text-gray-400">Seller Page</Link>
        
      </div>
    </nav>
  );
};

export default Header;
