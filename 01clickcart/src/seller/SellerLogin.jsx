import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../appwrite/appwrite"; // Import login function

const SellerLogin = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const session = await login(formData.email, formData.password);
      if (session) {
        navigate("/seller-home"); // Redirect to Seller Home Page after login
      }
    } catch (err) {
      setError("Invalid email or password"); // Display error message
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">Seller Login</h2>
        
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full p-2 border rounded mb-2"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full p-2 border rounded mb-2"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button 
            type="submit" 
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Login
          </button>
        </form>

        <p className="mt-4 text-center text-sm">
          Don't have an account? 
          <a href="/seller-register" className="text-blue-500 hover:underline ml-1">
            Register here
          </a>
        </p>
      </div>
    </div>
  );
};

export default SellerLogin;
