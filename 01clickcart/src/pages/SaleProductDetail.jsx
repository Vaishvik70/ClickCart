import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Client, Account, Databases, ID, Query } from "appwrite";

const client = new Client();
client.setEndpoint("https://cloud.appwrite.io/v1").setProject("67cad786002fe394c8a8");

const account = new Account(client);
const databases = new Databases(client);
const DATABASE_ID = "67cad7e600027ac7e8c0";
const COLLECTION_ID = "67cad7ff0005fc97c570"; // Cart collection ID

export default function SaleProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [addedToCart, setAddedToCart] = useState(false);

  const saleProducts = useSelector((state) => state?.saleProducts?.saleProducts || []);
  const product = saleProducts.find((p) => String(p.id) === String(id)); // Ensures correct ID match

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

  const handleAddToCart = async () => {
    if (!product) return;

    try {
      // Check if product is already in Appwrite cart
      const response = await databases.listDocuments(DATABASE_ID, COLLECTION_ID, [
        Query.equal("productId", product.id),
      ]);

      if (response.total > 0) {
        alert("Product is already in the cart.");
        return;
      }

      const discountedPrice = product.price - (product.price * product.discount) / 100;

      await databases.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), {
        productId: product.id,
        name: product.title,
        price: Math.floor(discountedPrice), // Store discounted price
        image: product.image,
        quantity: 1,
      });

      setAddedToCart(true);
      setTimeout(() => setAddedToCart(false), 3000);
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert("Failed to add product to cart.");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="bg-white p-8 rounded-lg shadow-lg text-center">
          <h2 className="text-2xl font-bold text-red-500 mb-4">❌ Product not found</h2>
          <button
            onClick={() => navigate("/")}
            className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-md transition duration-300"
          >
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  const discountedPrice = product.price - (product.price * product.discount) / 100;

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="md:flex">
            {/* Product Image */}
            <div className="md:w-1/2 p-6 flex items-center justify-center bg-gray-100">
              <img
                src={product.image}
                alt={product.title}
                className="max-h-96 w-full object-contain rounded-lg"
              />
            </div>

            {/* Product Details */}
            <div className="md:w-1/2 p-8">
              <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
                {product.category}
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mt-2">
                {product.title}
              </h1>

              {/* Price Section */}
              <div className="mt-6">
                <div className="flex items-center">
                  <span className="text-3xl font-bold text-gray-900">
                    ₹{discountedPrice.toFixed(2)}
                  </span>
                  {product.discount > 0 && (
                    <>
                      <span className="ml-3 text-sm line-through text-gray-500">
                        ₹{product.price.toFixed(2)}
                      </span>
                      <span className="ml-3 px-2 py-1 text-xs font-semibold bg-red-100 text-red-800 rounded-full">
                        {product.discount}% OFF
                      </span>
                    </>
                  )}
                </div>
                {product.discount > 0 && (
                  <p className="mt-1 text-sm text-green-600">
                    You save ₹{(product.price - discountedPrice).toFixed(2)}
                  </p>
                )}
              </div>

              {/* Description */}
              {product.description && (
                <div className="mt-6">
                  <h3 className="text-sm font-medium text-gray-900">Description</h3>
                  <p className="mt-2 text-sm text-gray-600">{product.description}</p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="mt-8 space-y-3">
                <button
                  onClick={() => navigate("/payment", { state: { product } })}
                  disabled={!isLoggedIn}
                  className={`w-full flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white ${
                    isLoggedIn
                      ? "bg-indigo-600 hover:bg-indigo-700"
                      : "bg-gray-400 cursor-not-allowed"
                  }`}
                >
                  {isLoggedIn ? "Buy Now" : "Login to Purchase"}
                </button>

                <button
                  onClick={handleAddToCart}
                  className="w-full flex items-center justify-center px-6 py-3 border border-indigo-600 rounded-md shadow-sm text-base font-medium text-indigo-600 bg-white hover:bg-indigo-50"
                >
                  {addedToCart ? "✓ Added to Cart" : "Add to Cart"}
                </button>

                <button
                  onClick={() => navigate("/")}
                  className="w-full flex items-center justify-center px-6 py-3 border border-gray-300 rounded-md shadow-sm text-base font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  Continue Shopping
                </button>
              </div>

              {/* Login Reminder */}
              {!isLoggedIn && (
                <div className="mt-4 p-3 bg-yellow-50 rounded-md">
                  <p className="text-sm text-yellow-700">
                    <span className="font-medium">⚠️ Login required</span> to complete your purchase.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
