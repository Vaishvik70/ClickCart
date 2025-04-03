import React from "react";
import { useNavigate } from "react-router-dom";
import { Client, Databases, ID } from "appwrite";

const client = new Client();
client.setEndpoint("https://cloud.appwrite.io/v1").setProject("67cad786002fe394c8a8");
const databases = new Databases(client);
const DATABASE_ID = "67cad7e600027ac7e8c0";
const COLLECTION_ID = "67cad7ff0005fc97c570";

export default function ProductCard({ product }) {
  const navigate = useNavigate();

  const addToCart = async () => {
    try {
      await databases.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), {
        name: product.name || product.title,  // Change to match Appwrite field name
        price: Math.round(product.price),
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
      className="border p-4 rounded-lg shadow-lg cursor-pointer"
      onClick={() => navigate(`/product/${product.id}`)}
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
      <h2 className="text-lg font-semibold mt-2">{product.name}</h2>
      <p className="text-gray-600">₹{product.price}</p>
      <button
        onClick={(e) => {
          e.stopPropagation(); // Prevent triggering the navigation when clicking the button
          addToCart();
        }}
        className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
      >
        Add to Cart
      </button>
    </div>
  );
}
