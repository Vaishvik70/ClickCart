import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function BestSelling() {
  const navigate = useNavigate();

  // Get products from Redux store
  const products = useSelector((state) => state.products?.products || []);

  // Filter best-selling products (sort by highest sales)
  const bestSellingProducts = [...products]
    .filter((p) => p.sales && p.sales > 0) // Ensure product has sales data
    .sort((a, b) => b.sales - a.sales) // Sort in descending order

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold text-center mb-6">🔥 Best Selling Products</h1>

      {bestSellingProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {bestSellingProducts.map((product) => (
            <div key={product.id} className="border rounded-lg shadow p-4">
              <img src={product.image} alt={product.title} className="w-full h-48 object-cover rounded" />
              <h2 className="text-lg font-semibold mt-2">{product.title}</h2>
              <p className="text-gray-700">₹{product.salePrice || product.price}</p>
              <div className="mt-3 flex gap-2">
                <button
                  onClick={() => navigate(`/product/${product.id}`)}
                  className="bg-blue-500 text-white py-1 px-4 rounded"
                >
                  View Details
                </button>
                <button
                  onClick={() => navigate("/cart", { state: { product } })}
                  className="bg-green-500 text-white py-1 px-4 rounded"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No best-selling products available.</p>
      )}
    </div>
  );
}
