import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { account, logout } from "../appwrite/appwrite";
import { FiUser, FiLogOut, FiMenu, FiX, FiShoppingCart, FiHelpCircle, FiMail, FiClock, FiHome } from "react-icons/fi";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await account.get();
        setUser(userData);
      } catch {
        setUser(null);
      }
    };

    fetchUser();
  }, []);

  const handleLogout = async () => {
    await logout();
    setUser(null);
    navigate("/");
    setMobileMenuOpen(false);
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and mobile menu button */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <span className="text-xl font-bold text-gray-900">ClickCart</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className="flex items-center text-gray-700 hover:text-blue-600 transition-colors"
            >
              <FiHome className="mr-1" /> Home
            </Link>
            <Link
              to="/about"
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              About Us
            </Link>
            <Link
              to="/contact"
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              Contact
            </Link>
            <Link
              to="/history"
              className="flex items-center text-gray-700 hover:text-blue-600 transition-colors"
            >
              <FiClock className="mr-1" /> History
            </Link>
            <Link
              to="/help"
              className="flex items-center text-gray-700 hover:text-blue-600 transition-colors"
            >
              <FiHelpCircle className="mr-1" /> Help
            </Link>
          </nav>

          {/* Right side items */}
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <div className="hidden md:flex items-center space-x-2">
                  <FiUser className="text-gray-700" />
                  <span className="text-gray-700 font-medium">Hi, {user.name}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="hidden md:flex items-center space-x-1 bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-md transition-colors text-gray-700"
                >
                  <FiLogOut /> <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/user-login"
                  className="hidden md:block text-gray-700 hover:text-blue-600 transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/user-register"
                  className="hidden md:block bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded-md transition-colors"
                >
                  Register
                </Link>
              </>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-gray-700 hover:text-blue-600"
            >
              {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden ${mobileMenuOpen ? "block" : "hidden"} bg-white border-t border-gray-200`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1">
          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50"
          >
            <FiHome className="inline mr-2" /> Home
          </Link>
          <Link
            to="/about"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50"
          >
            About Us
          </Link>
          <Link
            to="/contact"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50"
          >
            <FiMail className="inline mr-2" /> Contact
          </Link>
          <Link
            to="/history"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50"
          >
            <FiClock className="inline mr-2" /> History
          </Link>
          <Link
            to="/help"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50"
          >
            <FiHelpCircle className="inline mr-2" /> Help
          </Link>

          {user ? (
            <>
              <div className="px-3 py-2 text-gray-700">
                <FiUser className="inline mr-2" /> Welcome, {user.name}
              </div>
              <button
                onClick={handleLogout}
                className="w-full text-left px-3 py-2 rounded-md text-base font-medium text-red-600 hover:bg-red-50"
              >
                <FiLogOut className="inline mr-2" /> Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/user-login"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-md text-base font-medium text-blue-600 hover:bg-blue-50"
              >
                Login
              </Link>
              <Link
                to="/user-register"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-md text-base font-medium bg-blue-600 text-white hover:bg-blue-700"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;