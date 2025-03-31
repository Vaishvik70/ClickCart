import React from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../appwrite/appwrite"; // Import logout function

const SellerHome = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/seller-login"); // Redirect to seller login page after logout
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">Welcome, Seller!</h1>
      <p className="text-lg text-gray-700">Manage your products, orders, and earnings here.</p>
      <button 
        onClick={handleLogout}
        className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
      >
        Logout
      </button>
    </div>
  );
};

export default SellerHome;
