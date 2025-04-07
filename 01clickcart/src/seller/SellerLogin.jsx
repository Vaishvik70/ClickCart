import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { account } from "../appwrite/appwriteConfig"; // ✅ Import Appwrite account

const SellerLogin = () => {
  const [sellerLogin, setSellerLogin] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setSellerLogin({ ...sellerLogin, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // ✅ Delete any existing session to prevent session conflict
      await account.deleteSession('current');
    } catch (error) {
      console.log("No existing session to delete.");
    }

    try {
      // ✅ Log in the seller
      await account.createEmailPasswordSession(
        sellerLogin.email,
        sellerLogin.password
      );
      alert("Login successful!");
      navigate("/seller-dashboard"); // Redirect to Seller Dashboard
    } catch (error) {
      console.error("Login failed:", error.message);
      alert("Login failed. Check your credentials and try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">Seller Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input 
            type="email" 
            name="email" 
            placeholder="Email" 
            value={sellerLogin.email} 
            onChange={handleChange} 
            className="w-full p-2 border rounded" 
            required 
          />
          <input 
            type="password" 
            name="password" 
            placeholder="Password" 
            value={sellerLogin.password} 
            onChange={handleChange} 
            className="w-full p-2 border rounded" 
            required 
          />
          <button 
            type="submit" 
            className="w-full bg-blue-600 text-white p-2 rounded">
            Login as Seller
          </button>
        </form>
      </div>
    </div>
  );
};

export default SellerLogin;
