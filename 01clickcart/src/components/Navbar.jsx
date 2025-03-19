import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { account, logout } from "../appwrite/appwrite";

const Navbar = ({ darkMode, setDarkMode }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Fetch logged-in user details
  const fetchUser = async () => {
    try {
      const userData = await account.get();
      setUser(userData);
    } catch (error) {
      setUser(null);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  // Logout function
  const handleLogout = async () => {
    await logout();
    setUser(null);
    navigate("/"); // Redirect to Home page after logout
  };

  return (
    <nav className={`p-4 flex justify-between items-center ${darkMode ? "bg-black text-white" : "bg-gray-800 text-white"}`}>
      {/* Home Link */}
      <Link to="/" className="text-lg font-bold">
        Home
      </Link>
      <Link to="/about" className="text-blue-400 hover:underline">About Us</Link>
      <Link to="/contact" className="text-blue-400 hover:underline">Contact Us</Link>
      <Link to="/history" className="text-blue-400 hover:underline">History</Link>
      <Link to="/help" className="text-blue-400 hover:underline">Help</Link>


      <div className="flex items-center space-x-4">
        {/* Dark Mode Toggle Button */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="px-4 py-2 bg-gray-600 text-white rounded"
        >
          {darkMode ? "☀ Light Mode" : "🌙 Dark Mode"}
        </button>

        {/* Show user info if logged in */}
        {user && <span>Welcome, {user.name}</span>}

        {/* Show Logout button only when user is logged in */}
        {user ? (
          <button
            onClick={handleLogout}
            className="bg-red-500 px-3 py-1 rounded hover:bg-red-600 transition"
          >
            Logout
          </button>
        ) : (
          <>
            <Link to="/login" className="mr-4">Login</Link>
            <Link to="/register" className="mr-4">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
