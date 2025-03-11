import React, { useState } from "react";
import { login } from "../appwrite/appwrite"; // Import login function
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirection

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Hook for redirection

  const handleSubmit = async (e) => {
    e.preventDefault();

    const session = await login(email, password);

    if (session) {
      alert("Login successful!");
      navigate("/"); // Redirect to Home Page
    } else {
      alert("Login failed. Check your credentials and try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
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
        <button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 p-2 rounded">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
