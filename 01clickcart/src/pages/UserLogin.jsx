import React, { useState } from "react";
import { userLogin } from "../appwrite/appwrite"; // 👈 import user login logic
import { useNavigate } from "react-router-dom";

const UserLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const session = await userLogin(email, password);

    if (session) {
      alert("User login successful!");
      navigate("/"); // You can redirect to a user-specific dashboard if needed
    } else {
      alert("Login failed. Try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded shadow-lg">
        <h2 className="text-2xl font-bold mb-4">User Login</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full p-2 mb-3 rounded bg-gray-700"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full p-2 mb-3 rounded bg-gray-700"
        />
        <p className="mt-2">
          <a href="/forgot-password" className="text-blue-400 hover:underline">
            Forgot Password?
          </a>
        </p>
        <button type="submit" className="w-full bg-green-500 hover:bg-green-600 p-2 rounded">
          Login as User
        </button>
      </form>
    </div>
  );
};

export default UserLogin;
