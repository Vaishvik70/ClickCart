import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Client, Account } from "appwrite";

const client = new Client();
client.setEndpoint("https://cloud.appwrite.io/v1").setProject("67cad786002fe394c8a8");
const account = new Account(client);

const SaleProductCard = ({ product }) => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkUserLogin();
  }, []);

  const checkUserLogin = async () => {
    try {
      await account.get();
      setIsLoggedIn(true);
    } catch (error) {
      console.log("User not logged in:", error);
      setIsLoggedIn(false);
    } finally {
      setLoading(false);
    }
  };

  const goToProductDetail = () => {
    navigate(`/sale-product/${product.id}`, { state: { product } });
  };

  const discountedPrice = product.price - (product.price * product.discount) / 100;

  return (
    <div className="bg-slate-800 p-4 rounded-lg shadow-lg">
      {/* Image Container */}
      <div
        className="aspect-[4/3] bg-white flex items-center justify-center overflow-hidden rounded cursor-pointer"
        onClick={goToProductDetail}
      >
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-contain"
        />
      </div>

      {/* Title */}
      <h2
        className="text-white font-bold text-lg mt-4 cursor-pointer"
        onClick={goToProductDetail}
      >
        {product.title}
      </h2>

      {/* Prices */}
      <p className="text-red-400 font-bold mt-1">
        Sale Price: ₹{discountedPrice}
      </p>
      <p className="text-gray-300 line-through">Original: ₹{product.price}</p>

      {/* Login Message */}
      {loading ? (
        <p className="text-gray-500 text-center mt-2">Checking login status...</p>
      ) : !isLoggedIn && (
        <p className="text-red-500 font-semibold mt-2 text-center">⚠️ Login required to buy!</p>
      )}

      {/* Buy Now Button */}
      <button
        className={`px-4 py-2 rounded mt-2 w-full ${
          isLoggedIn ? "bg-red-500 text-white" : "bg-gray-400 cursor-not-allowed"
        }`}
        onClick={() => navigate(`/payment`, { state: { product } })}
        disabled={!isLoggedIn}
      >
        Buy Now
      </button>
    </div>
  );
};

export default SaleProductCard;