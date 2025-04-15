import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { FiShoppingCart, FiMenu, FiX } from "react-icons/fi";
import { IoMdArrowDropdown } from "react-icons/io";

const Header = ({ cartCount }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSellerMenuOpen, setIsSellerMenuOpen] = useState(false);
  const dropdownRef = useRef(null);
  const menuRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsSellerMenuOpen(false);
      }
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Mobile Menu Button */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <img
                src="https://files.oaiusercontent.com/file-2f7sFegjkfFvDjFnFsT1jy?se=2025-04-15T09%3A08%3A03Z&sp=r&sv=2024-08-04&sr=b&rscc=max-age%3D604800%2C%20immutable%2C%20private&rscd=attachment%3B%20filename%3D76c6b04e-64a5-4299-b425-741bd5149bcd.webp&sig=9K0wz9HhR0JX8UA%2BCtGCzcQHWsQ0vz0AuQJFb9usJQU%3D"
                alt="ClickCart Logo"
                className="w-12 h-13"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/products"
              className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
            >
              Products
            </Link>
            <Link
              to="/best-selling"
              className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
            >
              Best Sellers
            </Link>
            <Link
              to="/coupons"
              className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
            >
              Coupons
            </Link>

            {/* Seller Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsSellerMenuOpen(!isSellerMenuOpen)}
                className="flex items-center text-gray-700 hover:text-blue-600 transition-colors font-medium"
              >
                <span>For Sellers</span>
                <IoMdArrowDropdown
                  className={`ml-1 transition-transform ${
                    isSellerMenuOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              {isSellerMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-100">
                  <Link
                    to="/seller-page"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                  >
                    Seller Page
                  </Link>
                  <Link
                    to="/seller-dashboard"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                  >
                    Seller Dashboard
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Cart Icon */}
          <div className="flex items-center space-x-4">
            <Link
              to="/cart"
              className="p-2 text-gray-700 hover:text-blue-600 relative"
            >
              <FiShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-gray-700 hover:text-blue-600"
            >
              {isMenuOpen ? (
                <FiX className="w-5 h-5" />
              ) : (
                <FiMenu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        ref={menuRef}
        className={`md:hidden ${isMenuOpen ? "block" : "hidden"}`}
      >
        <div className="px-2 pt-2 pb-4 space-y-1 bg-white border-t border-gray-200">
          <Link
            to="/products"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50"
          >
            Products
          </Link>
          <Link
            to="/best-selling"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50"
          >
            Best Sellers
          </Link>
          <Link
            to="/coupons"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50"
          >
            Coupons
          </Link>
          <div className="pt-2 border-t border-gray-200">
            <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
              For Sellers
            </h3>
            <Link
              to="/seller-dashboard"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50"
            >
              Dashboard
            </Link>
            <Link
              to="/add-product"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50"
            >
              Add Product
            </Link>
          </div>
          <Link
            to="/account"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50"
          >
            My Account
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;