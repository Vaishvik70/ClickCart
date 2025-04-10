import React, { useState } from "react";
import { userRegister } from "../appwrite/appwrite"; // 👈 Import userRegister function
import { useNavigate } from "react-router-dom";

const UserRegister = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = await userRegister(name, email, password);

    if (user) {
      alert("User registration successful! Please log in.");
      navigate("/user-login"); // 👈 redirect to user login
    } else {
      alert("User registration failed. Try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded shadow-lg">
        <h2 className="text-2xl font-bold mb-4">User Register</h2>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full p-2 mb-3 rounded bg-gray-700"
        />
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
        <p className="text-xs text-gray-400 mb-3">Password must be 8-16 characters</p>
        <button type="submit" className="w-full bg-green-500 hover:bg-green-600 p-2 rounded">
          Register as User
        </button>
      </form>
    </div>
  );
};

export default UserRegister;
