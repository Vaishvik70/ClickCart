import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { account } from "../appwrite/appwriteConfig";

const Navbar = () => {
  const [seller, setSeller] = useState(null);
  const navigate = useNavigate();

  // ✅ Check if the seller is logged in
  useEffect(() => {
    const fetchSeller = async () => {
      try {
        const user = await account.get(); // Get current seller session
        setSeller(user);
      } catch (error) {
        console.log("No seller logged in");
      }
    };
    fetchSeller();
  }, []);

  const handleLogout = async () => {
    try {
      await account.deleteSession("current"); // Logout seller
      setSeller(null);
      alert("Logged out successfully!");
      navigate("/seller-login");
    } catch (error) {
      console.error("Logout failed:", error.message);
    }
  };

  return (
    <nav className="bg-white p-4 shadow-md flex justify-between items-center">
      <h1 className="text-xl font-bold text-blue-600">Click Cart Seller Hub</h1>

      <div>
        <Link to="/fees-commission" className="mr-4 text-blue-600 hover:underline">
          Fees & Commission
        </Link>

        {seller ? (
          // ✅ Show seller name & logout button if logged in
          <div className="flex items-center gap-4">
            <span className="text-lg font-semibold text-green-600">Welcome, {seller.name}!</span>
            <button onClick={handleLogout} className="bg-red-500 px-4 py-2 rounded text-white">
              Logout
            </button>
          </div>
        ) : (
          // ✅ Show Login & Register buttons if not logged in
          <>
            <Link to="/seller-login" className="bg-blue-400 px-4 py-2 mr-3 rounded text-white">
              Seller Login
            </Link>
            <Link to="/seller-register" className="bg-blue-400 px-4 py-2 rounded text-white">
              Register as Seller
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
