import React, { useState } from "react";
import { account, databases, ID } from "../appwrite/appwrite"; // ✅ Corrected import
import { DATABASE_ID, SELLER_COLLECTION_ID } from "../appwrite/appwriteConfig";


const SellerRegister = () => {
  const [formData, setFormData] = useState({
    businessName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate password
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
      // Step 1: Create a new user in Appwrite
      const newUser = await account.create(ID.unique(), formData.email, formData.password);
      console.log("✅ User Created:", newUser);

      // Step 2: Store Seller Details in the Database
      await databases.createDocument(
        DATABASE_ID,  // ✅ Using real Database ID
        SELLER_COLLECTION_ID, // ✅ Using real Collection ID
        ID.unique(),
        {
          businessName: formData.businessName,
          email: formData.email,
          userId: newUser.$id,
        }
      );

      setSuccess("🎉 Registration successful! Redirecting...");
      setError(null);

      // Redirect after 2 seconds
      setTimeout(() => {
        window.location.href = "/seller-login";
      }, 2000);
    } catch (err) {
      console.error("❌ Registration Error:", err);
      setError(err.message || "Failed to register. Try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">Seller Register</h2>
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
        {success && <p className="text-green-500 text-sm mb-2">{success}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="businessName"
            placeholder="Business Name"
            className="w-full p-2 border rounded mb-2"
            value={formData.businessName}
            onChange={handleChange}
            required
          />
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
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            className="w-full p-2 border rounded mb-2"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Register
          </button>
        </form>
        <p className="mt-4 text-center text-sm">
          Already have an account?
          <a href="/seller-login" className="text-blue-500 hover:underline ml-1">
            Login here
          </a>
        </p>
      </div>
    </div>
  );
};

export default SellerRegister;
