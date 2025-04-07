import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { account, logout } from "../appwrite/appwrite";

const Navbar = () => {
  const [user, setUser] = useState(null);
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
  };

  return (
    <nav className="p-4 flex flex-wrap justify-between items-center shadow-md bg-white text-black">
      {/* Left section - Brand + Links */}
      <div className="flex items-center space-x-6">
        <Link to="/" className="text-xl font-bold">
          Home
        </Link>
        <Link to="/about" className="hover:underline text-blue-500">About Us</Link>
        <Link to="/contact" className="hover:underline text-blue-500">Contact Us</Link>
        <Link to="/history" className="hover:underline text-blue-500">History</Link>
        <Link to="/help" className="hover:underline text-blue-500">Help</Link>
      </div>

      {/* Right section - Auth */}
      <div className="flex items-center space-x-4 mt-2 sm:mt-0">
        {user ? (
          <>
            <span className="font-medium">Welcome, {user.name}</span>
            <button
              onClick={handleLogout}
              className="bg-red-500 px-3 py-1 rounded hover:bg-red-600 transition"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="text-blue-600 font-medium">Login</Link>
            <Link to="/register" className="text-blue-600 font-medium">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
