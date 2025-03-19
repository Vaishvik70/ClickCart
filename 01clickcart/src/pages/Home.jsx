import React from "react";

const Home = () => {
  return (
    <div
      className="bg-gray-900 text-white min-h-screen flex flex-col bg-no-repeat bg-center bg-contain"
      style={{
        backgroundImage: "url('https://files.oaiusercontent.com/file-USgtpoWpy3ScPH776sJb2D?se=2025-03-13T09%3A14%3A09Z&sp=r&sv=2024-08-04&sr=b&rscc=max-age%3D604800%2C%20immutable%2C%20private&rscd=attachment%3B%20filename%3D7b20bd50-53ab-4f5e-bbdc-af1671a7e3b4.webp&sig=GSYu9dz1xkUZUeUaZTEhG3NLudhNHjfSo8Ibffyr848%3D')",
      }}
    >
      <div className="min-h-screen flex flex-col items-center justify-center px-6">
        <h1 className="text-4xl font-bold text-blue-500 mb-10 drop-shadow-md">Welcome to Click Cart</h1>
        <p className="text-lg font-bold text-blue-500 mb-6 drop-shadow-md">Your one-stop shop for amazing deals!</p>
      </div>
    </div>
  );
};

export default Home;
