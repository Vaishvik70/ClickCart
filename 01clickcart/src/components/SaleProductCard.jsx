import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { account } from "../appwrite/appwriteConfig"; // assuming it's in src/

const SaleProductCard = ({ product }) => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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

    checkUserLogin();
  }, []);

  const goToProductDetail = () => {
    navigate(`/sale-product/${product.id}`, { state: { product } });
  };

  const handleBuyNow = () => {
    if (isLoggedIn) {
      navigate("/payment", { state: { product } });
    }
  };

  const discountedPrice = product.price - (product.price * product.discount) / 100;

  return (
    <div className="w-full bg-gray-500 dark:bg-gray-800 p-4 rounded shadow-md flex flex-col items-center justify-between transition-transform duration-200 hover:scale-105">
      <div className="w-full h-48 flex items-center justify-center overflow-hidden cursor-pointer" onClick={goToProductDetail}>
        <img
          src={product.image || "/placeholder.jpg"}
          alt={product.title}
          onError={(e) => (e.target.src = "/placeholder.jpg")}
          className="h-full object-contain"
        />
      </div>

      <h2 className="text-white font-bold text-lg mt-2 text-center cursor-pointer" onClick={goToProductDetail}>
        {product.title}
      </h2>

      <p className="text-red-400 font-bold mt-1">Sale Price: ₹{discountedPrice}</p>
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
        onClick={handleBuyNow}
        disabled={!isLoggedIn}
      >
        Buy Now
      </button>
    </div>
  );
};

export default SaleProductCard;
