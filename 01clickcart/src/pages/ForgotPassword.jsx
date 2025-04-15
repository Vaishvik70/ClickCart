import React, { useState } from "react";
import { account } from "../appwrite/appwrite";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { Link } from "react-router-dom";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleReset = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    setLoading(true);

    try {
      // Replace with your actual reset password URL
      const resetUrl = `${window.location.origin}/reset-password`;
      await account.createRecovery(email, resetUrl);
      
      setMessage("Recovery email sent! Please check your inbox.");
    } catch (err) {
      console.error("Password recovery error:", err);
      
      if (err.code === 429) {
        setError("Too many requests. Please try again later.");
      } else if (err.code === 404) {
        setError("No account found with this email address.");
      } else {
        setError("Failed to send recovery email. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
          <div className="p-8">
            <div className="text-center mb-6">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">Reset Password</h2>
              <p className="text-gray-600">
                Enter your email to receive a password reset link
              </p>
            </div>

            {message && (
              <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded text-green-700 text-center">
                {message}
              </div>
            )}

            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded text-red-600 text-center">
                {error}
              </div>
            )}

            <form onSubmit={handleReset} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
                  placeholder="your@email.com"
                  disabled={loading}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3 px-4 rounded-lg font-medium text-white transition ${
                  loading
                    ? "bg-blue-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <AiOutlineLoading3Quarters className="animate-spin mr-2" />
                    Sending...
                  </span>
                ) : (
                  "Send Reset Link"
                )}
              </button>
            </form>

            <div className="mt-6 text-center text-sm text-gray-600">
              Remember your password?{" "}
              <Link
                to="/user-login"
                className="text-blue-600 hover:text-blue-500 hover:underline font-medium"
              >
                Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}