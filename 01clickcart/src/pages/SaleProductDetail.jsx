import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Client, Account } from "appwrite";

const client = new Client();
client.setEndpoint("https://cloud.appwrite.io/v1").setProject("67cad786002fe394c8a8");
const account = new Account(client);

export default function SaleProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  const saleProducts = useSelector((state) => state?.saleProducts?.saleProducts || []);
  const product = saleProducts.find((p) => p.id === id);

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

  if (loading) {
    return <p className="text-center text-gray-500">Loading...</p>;
  }

  if (!product) {
    return <h2 className="text-red-500 text-center mt-8">❌ Sale Product not found</h2>;
  }

  const discountedPrice = product.price - (product.price * product.discount) / 100;

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white rounded-lg shadow-md text-center">
      <h1 className="text-2xl font-bold mb-4">{product.title}</h1>
      <img
        src={product.image}
        alt={product.title}
        className="w-80 h-52 object-contain mx-auto rounded"
      />
      <p className="text-gray-600 text-base mt-3">{product.category}</p>

      <div className="mt-2">
        <span className="text-xl font-semibold text-black">₹{discountedPrice}</span>
        <span className="text-red-500 text-md ml-2">-{product.discount}% OFF</span>
      </div>

      <div className="flex flex-col sm:flex-row justify-center gap-3 mt-6">
        <button
          onClick={() => navigate("/")}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
        >
          Back to HomePage
        </button>
        <button
          onClick={() => {
            const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
            localStorage.setItem("cart", JSON.stringify([...existingCart, product]));
          }}
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md"
        >
          Add to Cart
        </button>
        <button
          onClick={() => navigate("/payment", { state: { product } })}
          disabled={!isLoggedIn}
          className={`${
            isLoggedIn ? "bg-red-500 hover:bg-red-600" : "bg-gray-400 cursor-not-allowed"
          } text-white px-4 py-2 rounded-md`}
        >
          Buy Now
        </button>
      </div>

      {!isLoggedIn && (
        <p className="text-red-500 font-medium mt-4">⚠️ Login required to purchase.</p>
      )}
    </div>
  );
}
