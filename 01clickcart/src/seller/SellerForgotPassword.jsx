import React, { useState } from "react";
import { account } from "../appwrite/appwriteConfig";
import { Link } from "react-router-dom";

const SellerForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleReset = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await account.createRecovery(email, "http://localhost:5173/seller-reset-password");
      setSubmitted(true);
    } catch (error) {
      console.error("Recovery failed:", error.message);
      alert("Failed to send recovery email. Please check your email and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">Seller Password Recovery</h2>
        {submitted ? (
          <p className="text-center text-green-600">
            Recovery link sent! Please check your email.
          </p>
        ) : (
          <form onSubmit={handleReset} className="space-y-4">
            <input
              type="email"
              placeholder="Enter your seller email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border rounded-lg bg-gray-50"
              required
            />
            <button
              type="submit"
              className="w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
              disabled={loading}
            >
              {loading ? "Sending..." : "Send Recovery Email"}
            </button>
          </form>
        )}
        <p className="text-sm text-center mt-4 text-gray-600">
          Back to{" "}
          <Link to="/seller-login" className="text-blue-500 hover:underline">
            Seller Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SellerForgotPassword;
