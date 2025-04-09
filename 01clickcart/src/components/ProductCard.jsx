import React from "react";
import { useNavigate } from "react-router-dom";
import { Client, Databases, ID } from "appwrite";

// Appwrite setup
const client = new Client();
client.setEndpoint("https://cloud.appwrite.io/v1").setProject("67cad786002fe394c8a8");
const databases = new Databases(client);
const DATABASE_ID = "67cad7e600027ac7e8c0";
const COLLECTION_ID = "67cad7ff0005fc97c570";

export default function ProductCard({ product }) {
  const navigate = useNavigate();

  const productId = product.id || product.$id;
  const price = Math.round(product.salePrice || product.price);
  const originalPrice = product.price;
  const isOnSale = product.onSale === "true";
  const isOutOfStock = product.stock === 0;

  const addToCart = async (e) => {
    e.stopPropagation(); // Prevent navigation when clicking the button

    try {
      await databases.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), {
        name: product.title || product.name,
        price: price,
        image: product.image,
        quantity: 1,
      });

      alert("Product added to cart!");
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert("Failed to add product to cart!");
    }
  };

  return (
    <div
      className="border p-4 rounded-lg shadow-lg cursor-pointer text-center"
      onClick={() => navigate(`/product/${productId}`)}
    >
      {product.image ? (
        <img
          src={product.image}
          alt={product.title || "Product Image"}
          className="w-full h-48 object-cover rounded"
        />
      ) : (
        <div className="w-full h-48 bg-gray-200 flex items-center justify-center rounded">
          <span className="text-gray-500">No Image</span>
        </div>
      )}

      <h2 className="text-lg font-semibold mt-3">{product.title}</h2>

      <p className="text-red-600 font-bold mt-1 text-base">
        ₹{price}
        {isOnSale && (
          <span className="text-sm text-gray-500 line-through ml-2">₹{originalPrice}</span>
        )}
      </p>

      <button
        onClick={addToCart}
        disabled={isOutOfStock}
        className={`${
          isOutOfStock
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-500 hover:bg-blue-600"
        } text-white px-4 py-2 rounded mt-3 transition`}
      >
        {isOutOfStock ? "Out of Stock" : "Add to Cart"}
      </button>
    </div>
  );
}
