import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { account } from "../appwrite/appwriteConfig";
import { FiLogOut, FiUser, FiBarChart2, FiDollarSign, FiHelpCircle } from "react-icons/fi";

const SellerNavbar = ({ seller, setSeller }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await account.deleteSession("current");
      setSeller(null);
      alert("Logged out successfully!");
      navigate("/seller-login");
    } catch (error) {
      console.error("Logout failed:", error.message);
    }
  };

  return (
    <nav className="bg-white text-black p-4 flex justify-between items-center shadow-md">
      <h1 className="text-2xl font-bold tracking-wide">
        Seller Hub
      </h1>

      <div className="flex gap-8">
        <Link to="/seller-dashboard" className="hover:text-yellow-400 flex items-center gap-2">
          <FiBarChart2 /> Dashboard
        </Link>
        <Link to="/fees-commission" className="hover:text-yellow-400 flex items-center gap-2">
          <FiDollarSign /> Fees & Commission
        </Link>
        <Link to="/seller-help" className="hover:text-yellow-400 flex items-center gap-2">
          <FiHelpCircle /> Seller Help
        </Link>
      </div>

      {seller ? (
        <div className="flex items-center gap-6">
          <span className="text-lg font-medium flex items-center gap-2 bg-green-600 px-3 py-1 rounded-lg">
            <FiUser /> {seller.name || "Seller"}
          </span>
          <button
            onClick={handleLogout}
            className="bg-red-600 px-4 py-2 rounded-lg font-medium flex items-center gap-2 hover:bg-red-700 transition"
          >
            <FiLogOut /> Logout
          </button>
        </div>
      ) : (
        <div className="flex gap-4">
          <Link
            to="/seller-login"
            className="bg-yellow-500 px-4 py-2 rounded-lg font-medium hover:bg-yellow-600 transition"
          >
            Login
          </Link>
          <Link
            to="/seller-register"
            className="bg-green-500 px-4 py-2 rounded-lg font-medium hover:bg-green-600 transition"
          >
            Register
          </Link>
        </div>
      )}
    </nav>
  );
};

export default SellerNavbar;
