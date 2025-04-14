import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const Header = ({ cartCount }) => {
  const [isSellerMenuOpen, setIsSellerMenuOpen] = useState(false);
  const dropdownRef = useRef(null);


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
    <nav className="bg-white text-black p-4 flex justify-between items-center">
      {/* Logo */}
      <Link to="/" className="flex items-center space-x-2">
        <img
          src="https://play-lh.googleusercontent.com/kD2dsWkri2do90CA9vRoBnosTS3VpMVHqkcGjmUnQlkbhy93WbKSoEPTPREIk4qu5Cko=w240-h480-rw"
          alt="ClickCart Logo"
          className="w-12 h-12"
        />
        <span className="text-xl font-bold">ClickCart</span>
      </Link>

      {/* Navbar Links */}
      <div className="inline-flex space-x-6 items-center">
        <Link to="/products" className="hover:text-blue-500">Products</Link>
        
        {/* Cart with Badge */}
        <Link to="/cart" className="hover:text-blue-500 relative flex items-center space-x-1">
          🛒 <span>Cart</span>
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-4 bg-red-500 text-white text-xs rounded-full px-2 py-0.5">
              {cartCount}
            </span>
          )}
        </Link>
        
        <Link to="/best-selling" className="hover:text-blue-500">Best Selling</Link>
        <Link to="/coupons" className="hover:text-blue-500">Coupons</Link>
        <Link to="/seller-page" className="hover:text-blue-500">Seller Page</Link>
        
      </div>
    </nav>
  );
};

export default Header;
