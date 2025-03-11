import React from "react";

const Home = () => {
  return (
    <div
      className="bg-gray-900 text-white min-h-screen flex flex-col bg-cover bg-center"
      style={{
        backgroundImage: "url('https://www.kindpng.com/picc/m/732-7329685_e-commerce-website-background-image-e-commerce-website.png')",
      }}
    >
      <div className="flex-grow flex items-center justify-center bg-black bg-opacity-50">
        <h1 className="text-5xl font-bold">Welcome to ClickCart</h1>
      </div>
      <div className="flex-grow flex items-center justify-center bg-black bg-opacity-50">
        <h2 className="text-5xl text-black font-bold">Your one-stop shop for the best deals and latest trends!</h2>
      </div>
    </div>
  );
};

export default Home;
