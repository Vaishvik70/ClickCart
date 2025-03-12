import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Client, Databases, ID } from "appwrite";

const client = new Client();
client.setEndpoint("https://cloud.appwrite.io/v1")
      .setProject("67cad786002fe394c8a8");
const databases = new Databases(client);
const DATABASE_ID = "67cad7e600027ac7e8c0";
const COLLECTION_ID = "67cad7ff0005fc97c570";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Fetch products from Redux store
  const products = useSelector((state) => state.products.products);
  
  // Find the selected product by ID
  const product = products.find((p) => p.id === id);

  if (!product) {
    return <h2 className="text-red-500 text-center">Product not found</h2>;
  }

  const addToCart = async () => {
    try {
      await databases.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), {
        name: product.name || product.title,
        price: Math.round(product.price), // Ensure integer format if needed
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
    <div className="p-4">
      <h1 className="text-2xl font-bold">{product.title}</h1>
      <img src={product.image} alt={product.title} className="w-64 h-64 object-cover rounded mt-4" />
      <p className="mt-2 text-gray-700">{product.category}</p>
      <p className="mt-2 text-lg font-semibold">
        ₹{product.price} {product.onSale === "true" && (
          <span className="text-red-500 ml-2">-{product.discount}% OFF</span>
        )}
      </p>
      
      <div className="mt-4">
        <button onClick={() => navigate("/products")} className="bg-blue-500 text-white py-2 px-4 rounded mr-2">
          Back to Products
        </button>
        <button onClick={addToCart} className="bg-green-500 text-white py-2 px-4 rounded mr-2">
          Add to Cart
        </button>
        <button 
          onClick={() => navigate("/payment", { state: { product } })}
          className="bg-red-500 text-white py-2 px-4 rounded mt-2">
          Buy Now
        </button>
      </div>
    </div>
  );
}
