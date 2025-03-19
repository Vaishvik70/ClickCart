import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function SaleProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Get sale products from Redux
  const saleProducts = useSelector((state) => state.saleProducts?.saleProducts || []);

  // Find the product by ID
  const product = saleProducts.find((p) => p.id === id);

  if (!product) {
    return <h2 className="text-red-500 text-center">Sale Product not found</h2>;
  }

  const discountedPrice = product.price - (product.price * product.discount) / 100;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">{product.title}</h1>
      <img src={product.image} alt={product.title} className="w-64 h-64 object-cover rounded mt-4" />
      <p className="mt-2 text-gray-700">Category: {product.category || "Electronics"}</p>
      <p className="mt-2 text-lg font-semibold">
        ₹{discountedPrice} <span className="text-red-500 ml-2">({product.discount}% OFF)</span>
      </p>
      
      <div className="mt-4">
        <button onClick={() => navigate("/")} className="bg-blue-500 text-white py-2 px-4 rounded mr-2">
          Back to Home
        </button>
        <button 
          onClick={() => navigate("/payment", { state: { product } })}
          className="bg-red-500 text-white py-2 px-4 rounded">
          Buy Now
        </button>
      </div>
    </div>
  );
}
