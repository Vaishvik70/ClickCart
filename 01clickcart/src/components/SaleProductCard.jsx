import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Client, Account } from "appwrite";

const client = new Client();
client.setEndpoint("https://cloud.appwrite.io/v1")
      .setProject("67cad786002fe394c8a8");

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

  return (
    <div className="bg-gray-700 p-4 rounded-lg shadow-lg">
      <img
        src={product.image}
        alt={product.title}
        className="w-full h-64 object-cover rounded cursor-pointer"
        onClick={goToProductDetail}
      />
      <h2
        className="text-white font-bold text-lg mt-2 cursor-pointer"
        onClick={goToProductDetail}
      >
        {product.title}
      </h2>
      <p className="text-red-400 font-bold">
        Sale Price: ₹{product.price - (product.price * product.discount) / 100} 
      </p>
      <p className="text-gray-300 line-through">Original: ₹{product.price}</p>

      {loading ? (
        <p className="text-gray-500 text-center mt-2">Checking login status...</p>
      ) : !isLoggedIn && (
        <p className="text-red-500 font-semibold mt-2 text-center">⚠️ Login required to buy!</p>
      )}

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
