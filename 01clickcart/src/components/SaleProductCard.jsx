import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Client, Account } from "appwrite";
import { FiShoppingBag, FiLogIn, FiAlertTriangle } from "react-icons/fi";

const client = new Client();
client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("67cad786002fe394c8a8");
const account = new Account(client);

const SaleProductCard = ({ product }) => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [imageLoaded, setImageLoaded] = useState(false);

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

  const handleBuyNow = (e) => {
    e.stopPropagation();
    navigate(`/payment`, { state: { product } });
  };

  const discountedPrice = product.price - (product.price * product.discount) / 100;

  return (
    <div 
      className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 dark:border-slate-700 flex flex-col h-full cursor-pointer group"
      onClick={goToProductDetail}
    >
      {/* Product Image with Loading State */}
      <div className="aspect-[4/3] bg-gray-50 dark:bg-slate-700 rounded-lg overflow-hidden relative mb-4">
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gray-200 dark:bg-slate-600 animate-pulse"></div>
        )}
        <img
          src={product.image}
          alt={product.title}
          className={`w-full h-full object-contain transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
          loading="lazy"
          onLoad={() => setImageLoaded(true)}
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/300x300?text=Product+Image';
            setImageLoaded(true);
          }}
        />
      </div>

      {/* Product Info */}
      <div className="flex-grow">
        <h2 className="text-gray-900 dark:text-white font-semibold text-lg mb-2 line-clamp-2 group-hover:text-red-500 dark:group-hover:text-red-400 transition-colors">
          {product.title}
        </h2>

        {/* Price Section */}
        <div className="flex items-baseline gap-2 mt-3">
          <span className="text-red-500 dark:text-red-400 font-bold text-xl">
            ₹{discountedPrice.toFixed(2)}
          </span>
          {product.discount > 0 && (
            <span className="bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-300 text-xs font-medium px-2 py-0.5 rounded-full">
              {product.discount}% OFF
            </span>
          )}
        </div>
        {product.discount > 0 && (
          <p className="text-gray-500 dark:text-gray-400 text-sm line-through mt-1">
            ₹{product.price.toFixed(2)}
          </p>
        )}
      </div>

      {/* Login Status */}
      {loading ? (
        <div className="mt-3 py-2 text-center">
          <div className="h-4 bg-gray-200 dark:bg-slate-700 rounded animate-pulse"></div>
        </div>
      ) : !isLoggedIn ? (
        <div className="mt-3 flex items-center justify-center gap-2 bg-yellow-50 dark:bg-yellow-900/10 text-yellow-600 dark:text-yellow-400 text-sm py-2 px-3 rounded-lg">
          <FiAlertTriangle className="flex-shrink-0" />
          <span>Login required to purchase</span>
        </div>
      ) : null}

      {/* Buy Now Button */}
      <button
        className={`mt-4 px-4 py-3 rounded-lg font-medium w-full flex items-center justify-center gap-2 transition-all duration-200 ${
          isLoggedIn
            ? "bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-md hover:shadow-lg"
            : "bg-gray-200 dark:bg-slate-700 text-gray-500 dark:text-gray-400 cursor-not-allowed"
        }`}
        onClick={isLoggedIn ? handleBuyNow : undefined}
        disabled={!isLoggedIn}
      >
        {isLoggedIn ? (
          <>
            <FiShoppingBag />
            <span>Buy Now</span>
          </>
        ) : (
          <>
            <FiLogIn />
            <span>Login to Purchase</span>
          </>
        )}
      </button>
    </div>
  );
};

export default SaleProductCard;