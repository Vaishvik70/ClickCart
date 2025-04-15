import React, { useState } from "react";
import { account } from "../appwrite/appwriteConfig";
import { Link, useNavigate } from "react-router-dom";
import { FiMail } from "react-icons/fi";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const SellerForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleReset = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const resetUrl = `${window.location.origin}/seller-reset-password`;
      await account.createRecovery(email, resetUrl);
      setSubmitted(true);
    } catch (error) {
      console.error("Recovery failed:", error);
      setError(
        error.code === 429 
          ? "Too many attempts. Please try again later."
          : error.code === 404
          ? "No seller account found with this email"
          : "Failed to send recovery email. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50 p-4">
      <div className="w-full max-w-md">
        <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
          <div className="text-center mb-6">
            <div className="mx-auto w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-4">
              <FiMail className="text-blue-600 text-2xl" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Reset Seller Password</h2>
            <p className="text-gray-600">
              {submitted 
                ? "We've sent a password reset link to your email"
                : "Enter your seller email to receive a reset link"}
            </p>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg text-sm text-center">
              {error}
            </div>
          )}

          {submitted ? (
            <div className="text-center py-4">
              <div className="mb-4 p-3 bg-green-50 text-green-600 rounded-lg">
                Check your inbox for the password reset link
              </div>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setEmail("");
                }}
                className="text-blue-600 hover:underline"
              >
                Resend email
              </button>
            </div>
          ) : (
            <form onSubmit={handleReset} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Seller Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition"
                  placeholder="seller@example.com"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3 px-4 rounded-lg font-medium text-white transition flex items-center justify-center ${
                  loading
                    ? "bg-blue-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                {loading ? (
                  <>
                    <AiOutlineLoading3Quarters className="animate-spin mr-2" />
                    Sending...
                  </>
                ) : (
                  "Send Reset Link"
                )}
              </button>
            </form>
          )}

          <div className="mt-6 text-center text-sm text-gray-600">
            Remember your password?{" "}
            <Link
              to="/seller-login"
              className="text-blue-600 hover:text-blue-500 hover:underline font-medium"
            >
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerForgotPassword;