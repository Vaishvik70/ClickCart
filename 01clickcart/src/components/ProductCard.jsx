import React from "react";
import { useNavigate } from "react-router-dom";
import { Client, Databases, ID } from "appwrite";

const client = new Client();
client.setEndpoint("https://cloud.appwrite.io/v1").setProject("67cad786002fe394c8a8");
const databases = new Databases(client);
const DATABASE_ID = "67cad7e600027ac7e8c0";
const COLLECTION_ID = "67cad7ff0005fc97c570"; // Cart collection ID

export default function ProductCard({ product }) {
  const navigate = useNavigate();

  const productId = product.id || product.$id;
  const price = Math.round(product.salePrice || product.price);
  const originalPrice = product.price;
  const isOnSale = product.onSale === "true";
  const isOutOfStock = product.stock === 0;

  const addToCart = async (e) => {
    e.stopPropagation();
    
    try {
      await databases.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), {
        name: product.title || product.name,
        price: price,
        image: product.image,
        quantity: 1,
      });
      
      // Consider using a toast notification instead of alert for better UX
      alert("Product added to cart!");
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert("Failed to add product to cart!");
    }
  };

  return (
    <div
      className="flex flex-col h-full border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 cursor-pointer bg-white"
      onClick={() => navigate(`/product/${productId}`)}
    >
      {/* Product Image */}
      <div className="relative pt-[100%] bg-gray-50 overflow-hidden">
        {product.image ? (
          <img
            src={product.image}
            alt={product.title || "Product Image"}
            className="absolute top-0 left-0 w-full h-full object-cover transition-transform duration-300 hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-gray-100">
            <span className="text-gray-400">No Image Available</span>
          </div>
        )}
        {/* Sale Badge */}
        {isOnSale && (
          <span className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
            SALE
          </span>
        )}
        {/* Out of Stock Overlay */}
        {isOutOfStock && (
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
            <span className="text-white font-medium bg-gray-800 px-2 py-1 rounded text-sm">
              Out of Stock
            </span>
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-4 flex flex-col flex-grow">
        <h2 className="text-md font-medium text-gray-800 mb-2 line-clamp-2 hover:text-blue-600 transition-colors">
          {product.title}
        </h2>
        
        {/* Price Section */}
        <div className="mt-auto">
          <div className="flex items-center justify-center space-x-2">
            <span className="text-lg font-bold text-gray-900">₹{price}</span>
            {isOnSale && (
              <span className="text-sm text-gray-500 line-through">₹{originalPrice}</span>
            )}
          </div>
          
          {/* Add to Cart Button */}
          <button
            onClick={addToCart}
            disabled={isOutOfStock}
            className={`w-full mt-3 py-2 px-4 rounded-md font-medium text-sm transition-colors ${
              isOutOfStock
                ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
          >
            {isOutOfStock ? "Out of Stock" : "Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  );
}