import React from "react";
import { useNavigate } from "react-router-dom";

// 🔁 Replace with your real images or local image paths
const bestSellers = [
  {
    id: "1",
    name: "Wireless Headphones",
    image: "https://m.media-amazon.com/images/I/71RJCexaxiL._SL1500_.jpg",
    price: 2499,
    salesCount: 240,
  },
  {
    id: "2",
    name: "Smart Fitness Watch",
    image: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcSG6WTcrt627nj-iXl7flTB7yhJO7QDdUyPm4edjnoGTrB--yqazsDIlrvQpTjvLHV4CLoYrigzJNTaShu9Bx2Gg814PE38ZFwnSm5HTG5u",
    price: 3499,
    salesCount: 180,
  },
  {
    id: "3",
    name: "Bluetooth Speaker",
    image: "https://m.media-amazon.com/images/I/41yQZFhJ-dL._SY300_SX300_QL70_FMwebp_.jpg",
    price: 1999,
    salesCount: 300,
  },
  {
    id: "4",
    name: "Laptop Stand",
    image: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcSDcaUBX4eSpvrNjqWhjPHTqhcPPelimQ3yRAGJpp3uimsdWpb9k74x3RwrCmyjjsLOE_sYoqojLQU1w-Inuiy1jXp9MoYJmTsA8vzz3xzHm6NTIoTGald6NQ",
    price: 899,
    salesCount: 120,
  },
];

const BestSellingProducts = () => {
  const navigate = useNavigate();

  const handleViewDetails = (productId) => {
    navigate(`/product/${productId}`);
  };

  return (
    <div className="min-h-screen bg-white px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
        🔥 Best Seller Products
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
        {bestSellers.map((product, index) => (
          <div
            key={product.id}
            className="relative bg-white border rounded-xl shadow-sm hover:shadow-md transition duration-300 p-4"
          >
            <span className="absolute -top-4 -left-4 bg-yellow-400 text-white text-xs font-bold px-3 py-1 rounded-full shadow">
              #{index + 1}
            </span>

            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-cover rounded-md"
            />

            <div className="mt-4">
              <h2 className="text-lg font-semibold text-gray-800 truncate">
                {product.name}
              </h2>
              <p className="text-gray-600 mt-1">₹{product.price}</p>
              <p className="text-sm text-gray-400">Sold: {product.salesCount}</p>
            </div>

            <button
              onClick={() => handleViewDetails(product.id)}
              className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md text-sm font-medium transition"
            >
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BestSellingProducts;
