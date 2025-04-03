import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Client, Account } from "appwrite";

const client = new Client();
client.setEndpoint("https://cloud.appwrite.io/v1")
      .setProject("67cad786002fe394c8a8");

const account = new Account(client);

export default function SaleProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  // Get sale products from Redux
  const saleProducts = useSelector((state) => state.saleProducts?.saleProducts || []);
  const product = saleProducts.find((p) => p.id === id);

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

  if (!product) {
    return <h2 className="text-red-500 text-center">Sale Product not found</h2>;
  }

  const discountedPrice = product.price - (product.price * product.discount) / 100;

  return (
    <div className="bg-gray-800 p-4 rounded-xl shadow-lg text-center w-72">
      <h1 className="text-2xl font-bold">{product.title}</h1>
      <img src={product.image} alt={product.title} className="w-full h-40 object-cover rounded mt-4" />
      <p className="mt-2 text-gray-700">Category: {product.category || "Electronics"}</p>
      <p className="mt-2 text-lg font-semibold">
        ₹{discountedPrice} <span className="text-red-500 ml-2">({product.discount}% OFF)</span>
      </p>

      {loading ? (
        <p className="text-gray-500">Checking login status...</p>
      ) : !isLoggedIn && (
        <p className="text-red-500 font-semibold mt-4">⚠️ You must be logged in to purchase!</p>
      )}

      <div className="mt-4">
        <button onClick={() => navigate("/")} className="bg-blue-500 text-white py-2 px-4 rounded mr-2">
          Back to Home
        </button>
        <button 
          onClick={() => navigate("/payment", { state: { product } })}
          className={`py-2 px-4 rounded ${isLoggedIn ? "bg-red-500 text-white" : "bg-gray-400 cursor-not-allowed"}`}
          disabled={!isLoggedIn} 
        >
          Buy Now
        </button>
      </div>
    </div>
  );
}
