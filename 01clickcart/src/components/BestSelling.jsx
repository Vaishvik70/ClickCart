import React from "react";
import { useNavigate } from "react-router-dom";
import { FaFire, FaStar, FaShoppingCart } from "react-icons/fa";

const bestSellers = [
  {
    id: "1",
    name: "Premium Wireless Headphones",
    image: "https://m.media-amazon.com/images/I/71RJCexaxiL._SL1500_.jpg",
    price: 2499,
    originalPrice: 3499,
    salesCount: 240,
    stock: 15,
    rating: 4.8,
    reviews: 125,
    features: ["Noise Cancelling", "30hr Battery", "Bluetooth 5.0"]
  },
  {
    id: "2",
    name: "Smart Fitness Watch Pro",
    image: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcSG6WTcrt627nj-iXl7flTB7yhJO7QDdUyPm4edjnoGTrB--yqazsDIlrvQpTjvLHV4CLoYrigzJNTaShu9Bx2Gg814PE38ZFwnSm5HTG5u",
    price: 3499,
    originalPrice: 4499,
    salesCount: 180,
    stock: 0,
    rating: 4.6,
    reviews: 89,
    features: ["Heart Rate Monitor", "Waterproof", "1.4\" AMOLED"]
  },
  {
    id: "3",
    name: "Portable Bluetooth Speaker",
    image: "https://m.media-amazon.com/images/I/41yQZFhJ-dL._SY300_SX300_QL70_FMwebp_.jpg",
    price: 1999,
    originalPrice: 2599,
    salesCount: 300,
    stock: 5,
    rating: 4.7,
    reviews: 210,
    features: ["20W Output", "IPX7 Waterproof", "24hr Playtime"]
  },
  {
    id: "4",
    name: "Adjustable Laptop Stand",
    image: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcSDcaUBX4eSpvrNjqWhjPHTqhcPPelimQ3yRAGJpp3uimsdWpb9k74x3RwrCmyjjsLOE_sYoqojLQU1w-Inuiy1jXp9MoYJmTsA8vzz3xzHm6NTIoTGald6NQ",
    price: 899,
    originalPrice: 1299,
    salesCount: 120,
    stock: 10,
    rating: 4.5,
    reviews: 56,
    features: ["Ergonomic Design", "Aluminum Alloy", "360° Rotation"]
  },
];

const BestSellingProducts = () => {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("user");

  const handleViewDetails = (productId) => {
    navigate("/product-detail", { state: { productId } });
  };

  const handleBuyNow = (product) => {
    if (!isLoggedIn) return;
    navigate("/payment", { state: { product } });
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-12">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-2 rounded-full mb-4">
            <FaFire className="mr-2" />
            <span className="font-bold">BEST SELLERS</span>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Our Most Popular Products</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover what everyone is loving. These top-rated products are flying off our shelves!
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {bestSellers.map((product, index) => (
            <div
              key={product.id}
              className="relative bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group"
            >
              {/* Badges */}
              <div className="absolute top-4 left-4 z-10 flex space-x-2">
                <span className="bg-yellow-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                  #{index + 1} Best Seller
                </span>
                {product.stock === 0 && (
                  <span className="bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                    Sold Out
                  </span>
                )}
              </div>

              {/* Product Image */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
                />
                {product.originalPrice && (
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                    <span className="text-white text-sm line-through mr-2">
                      ₹{product.originalPrice.toLocaleString("en-IN")}
                    </span>
                    <span className="text-yellow-400 font-bold">
                      {Math.round(100 - (product.price / product.originalPrice * 100))}% OFF
                    </span>
                  </div>
                )}
              </div>

              {/* Product Details */}
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h2 className="text-lg font-bold text-gray-900 truncate">
                    {product.name}
                  </h2>
                  <div className="flex items-center bg-blue-50 px-2 py-1 rounded">
                    <FaStar className="text-yellow-400 mr-1" />
                    <span className="text-sm font-semibold">{product.rating}</span>
                  </div>
                </div>

                <div className="mb-3">
                  <span className="text-2xl font-bold text-gray-900">
                    ₹{product.price.toLocaleString("en-IN")}
                  </span>
                  <span className="text-xs text-gray-500 ml-2">
                    {product.salesCount.toLocaleString()} sold
                  </span>
                </div>

                {/* Features List */}
                <ul className="text-xs text-gray-600 mb-4 space-y-1">
                  {product.features.slice(0, 3).map((feature, i) => (
                    <li key={i} className="flex items-center">
                      <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></span>
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* Stock Status */}
                {product.stock > 0 ? (
                  <div className="mb-4">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-green-500 h-2 rounded-full" 
                        style={{ width: `${Math.min(100, (product.stock / 20) * 100)}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      Only {product.stock} left in stock - order soon
                    </p>
                  </div>
                ) : (
                  <p className="text-red-500 text-sm mb-4">Currently unavailable</p>
                )}

                {/* Action Buttons */}
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleViewDetails(product.id)}
                    className="flex-1 bg-white border border-blue-600 text-blue-600 hover:bg-blue-50 py-2 rounded-md text-sm font-medium transition flex items-center justify-center"
                  >
                    Details
                  </button>
                  <button
                    onClick={() => handleBuyNow(product)}
                    disabled={!isLoggedIn || product.stock === 0}
                    className={`flex-1 py-2 rounded-md text-sm font-medium transition flex items-center justify-center ${
                      isLoggedIn && product.stock > 0
                        ? "bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white"
                        : "bg-gray-300 text-gray-500 cursor-not-allowed"
                    }`}
                  >
                    <FaShoppingCart className="mr-2" />
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BestSellingProducts;