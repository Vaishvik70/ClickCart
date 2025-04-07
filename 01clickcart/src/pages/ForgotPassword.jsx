import React, { useState } from "react";
import { account } from "../appwrite/appwrite";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");

  const handleReset = async (e) => {
    e.preventDefault();
    setMsg(""); setError("");

    try {
      await account.createRecovery(email, "http://localhost:5173/reset-password");
      setMsg("✅ Recovery email sent! Check your inbox.");
    } catch (err) {
      setError("❌ Something went wrong. Try again.");
      console.error(err);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 bg-white p-6 rounded shadow dark:bg-gray-800 dark:text-white">
      <h2 className="text-2xl font-bold mb-4">Forgot Password</h2>
      <form onSubmit={handleReset}>
        <input
          type="email"
          placeholder="Enter your email"
          className="w-full p-2 border rounded mb-4 text-black"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded">
          Send Reset Link
        </button>
      </form>
      {msg && <p className="text-green-500 mt-3">{msg}</p>}
      {error && <p className="text-red-500 mt-3">{error}</p>}
    </div>
  );
}
