import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { account, databases } from "../appwrite/appwriteConfig";

const SellerRegister = () => {
  const [sellerData, setSellerData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    password: "", // Only for authentication, not stored in DB
    storeName: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setSellerData({ ...sellerData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // ✅ 1. Create a new seller account in Appwrite Authentication
      const user = await account.create(
        crypto.randomUUID(), // Generates a unique user ID
        sellerData.email,
        sellerData.password,
        sellerData.name
      );

      // ✅ 2. Store seller details in Appwrite Database (without password)
      await databases.createDocument(
        "67cad7e600027ac7e8c0", // Replace with your Database ID
        "67ea22e3000a9c49cd04", // Replace with your Collection ID
        crypto.randomUUID(), // Unique document ID
        {
          userId: user.$id, // ✅ Store Appwrite user ID
          name: sellerData.name,
          email: sellerData.email,
          phone: sellerData.phone,
          address: sellerData.address,
          storeName: sellerData.storeName,
        }
      );

      alert("Registration successful! Please log in.");
      navigate("/seller-login");
    } catch (error) {
      console.error("Registration failed:", error);

      if (error.code === 409) {
        alert("This email is already registered. Please log in.");
      } else {
        alert("Registration failed. Please try again.");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">Seller Register</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input 
            type="text" 
            name="name" 
            placeholder="Full Name" 
            value={sellerData.name} 
            onChange={handleChange} 
            className="w-full p-2 border rounded" required 
          />
          <input 
            type="email" 
            name="email" 
            placeholder="Email" 
            value={sellerData.email} 
            onChange={handleChange} 
            className="w-full p-2 border rounded" required 
          />
          <input 
            type="tel" 
            name="phone" 
            placeholder="Phone Number" 
            value={sellerData.phone} 
            onChange={handleChange} 
            className="w-full p-2 border rounded" required 
          />
          <input 
            type="text" 
            name="address" 
            placeholder="Address" 
            value={sellerData.address} 
            onChange={handleChange} 
            className="w-full p-2 border rounded" required 
          />
          <input 
            type="text" 
            name="storeName" 
            placeholder="Store Name" 
            value={sellerData.storeName} 
            onChange={handleChange} 
            className="w-full p-2 border rounded" required 
          />
          <input 
            type="password" 
            name="password" 
            placeholder="Password" 
            value={sellerData.password} 
            onChange={handleChange} 
            className="w-full p-2 border rounded" required 
          />
          <button 
            type="submit" 
            className="w-full bg-blue-600 text-white p-2 rounded">
            Register as Seller
          </button>
        </form>
      </div>
    </div>
  );
};

export default SellerRegister;
