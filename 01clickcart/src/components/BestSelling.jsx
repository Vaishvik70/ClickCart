import React from "react";
import { useNavigate } from "react-router-dom";

const bestSellers = [
  {
    id: "1",
    name: "Wireless Headphones",
    image: "https://m.media-amazon.com/images/I/71RJCexaxiL._SL1500_.jpg",
    price: 2499,
    salesCount: 240,
    stock: 15,
  },
  {
    id: "2",
    name: "Smart Fitness Watch",
    image: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcSG6WTcrt627nj-iXl7flTB7yhJO7QDdUyPm4edjnoGTrB--yqazsDIlrvQpTjvLHV4CLoYrigzJNTaShu9Bx2Gg814PE38ZFwnSm5HTG5u",
    price: 3499,
    salesCount: 180,
    stock: 0,
  },
  {
    id: "3",
    name: "Bluetooth Speaker",
    image: "https://m.media-amazon.com/images/I/41yQZFhJ-dL._SY300_SX300_QL70_FMwebp_.jpg",
    price: 1999,
    salesCount: 300,
    stock: 5,
  },
  {
    id: "4",
    name: "Laptop Stand",
    image: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcSDcaUBX4eSpvrNjqWhjPHTqhcPPelimQ3yRAGJpp3uimsdWpb9k74x3RwrCmyjjsLOE_sYoqojLQU1w-Inuiy1jXp9MoYJmTsA8vzz3xzHm6NTIoTGald6NQ",
    price: 899,
    salesCount: 120,
    stock: 10,
  },
];

const BestSellingProducts = () => {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("user"); // Adjust based on your auth system

  const handleViewDetails = (productId) => {
    navigate(`/product/${productId}`);
  };

  const addToCart = (product) => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existing = cart.find((item) => item.id === product.id);

    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${product.name} added to cart!`);
  };

  const handleBuyNow = (product) => {
    if (!isLoggedIn) return;

    navigate("/payment", { state: { product } });
  };

  return (
    <div className="min-h-screen bg-white px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
        🔥 Best Seller Products 🔥
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
              <p className="text-gray-600 mt-1">₹{product.price.toLocaleString("en-IN")}</p>
              <p className="text-sm text-gray-400">Sold: {product.salesCount}</p>
              <p className="text-xs text-gray-500 mt-1">
                {product.stock > 0 ? `In Stock: ${product.stock}` : "Out of Stock"}
              </p>
            </div>

            <button
              onClick={() => handleViewDetails(product.id)}
              className="mt-3 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md text-sm font-medium transition"
            >
              View Details
            </button>

            <button
              onClick={() => addToCart(product)}
              disabled={product.stock === 0}
              className={`mt-2 w-full py-2 rounded-md text-sm font-medium transition ${
                product.stock === 0
                  ? "bg-gray-400 text-white cursor-not-allowed"
                  : "bg-green-600 hover:bg-green-700 text-white"
              }`}
            >
              Add to Cart
            </button>

            <button
              onClick={() => handleBuyNow(product)}
              disabled={!isLoggedIn}
              className={`mt-2 w-full py-2 rounded-md text-sm font-medium transition ${
                isLoggedIn
                  ? "bg-red-500 hover:bg-red-600 text-white"
                  : "bg-gray-400 text-white cursor-not-allowed"
              }`}
            >
              Buy Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BestSellingProducts;
