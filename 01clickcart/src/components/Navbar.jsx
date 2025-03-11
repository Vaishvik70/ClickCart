import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { account, logout } from "../appwrite/appwrite";

const Navbar = () => {
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
    fetchUser(); // Call when component loads
  }, []);

  // Logout function
  const handleLogout = async () => {
    await logout();
    setUser(null);
    navigate("/"); // Redirect to Home page after logout
  };

  return (
    <nav className="bg-gray-800 p-4 text-white flex justify-between items-center">
      {/* Home Link */}
      <Link to="/" className="text-lg font-bold">
        Home
      </Link>

      <div className="flex items-center space-x-4">
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
