import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FiArrowLeft, FiCheck, FiAlertCircle } from "react-icons/fi";

const BestSellingProductDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { productId } = location.state || {};

  // Check if productId is provided
  if (!productId) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md text-center">
          <FiAlertCircle className="mx-auto h-12 w-12 text-red-500" />
          <h2 className="mt-4 text-xl font-bold text-gray-800">Product ID not provided</h2>
          <p className="mt-2 text-gray-600">Please go back and select a product</p>
          <button
            onClick={() => navigate(-1)}
            className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const bestSellers = [
    {
      id: "1",
      name: "Premium Wireless Headphones",
      image: "https://m.media-amazon.com/images/I/71RJCexaxiL._SL1500_.jpg",
      price: 2499,
      salesCount: 240,
      stock: 15,
      description: "Experience crystal-clear sound with our noise-cancelling wireless headphones. 40mm drivers deliver powerful audio with deep bass.",
      features: ["Active Noise Cancellation", "30-hour battery life", "Bluetooth 5.0", "Built-in microphone"],
      rating: 4.8,
      reviews: 125
    },
    {
      id: "2",
      name: "Smart Fitness Watch",
      image: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcSG6WTcrt627nj-iXl7flTB7yhJO7QDdUyPm4edjnoGTrB--yqazsDIlrvQpTjvLHV4CLoYrigzJNTaShu9Bx2Gg814PE38ZFwnSm5HTG5u",
      price: 3499,
      salesCount: 180,
      stock: 0,
      description: "Track your fitness goals with this advanced smartwatch featuring heart rate monitoring, sleep tracking, and 20+ sports modes.",
      features: ["1.4\" AMOLED Display", "Water resistant (5ATM)", "7-day battery", "GPS Tracking"],
      rating: 4.6,
      reviews: 89
    },
    {
      id: "3",
      name: "Portable Bluetooth Speaker",
      image: "https://m.media-amazon.com/images/I/41yQZFhJ-dL._SY300_SX300_QL70_FMwebp_.jpg",
      price: 1999,
      salesCount: 300,
      stock: 5,
      description: "Powerful 20W stereo sound with deep bass in a compact, waterproof design. Perfect for outdoor adventures.",
      features: ["IPX7 Waterproof", "24-hour playtime", "Party Pairing", "Built-in mic"],
      rating: 4.7,
      reviews: 210
    },
    {
      id: "4",
      name: "Adjustable Laptop Stand",
      image: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcSDcaUBX4eSpvrNjqWhjPHTqhcPPelimQ3yRAGJpp3uimsdWpb9k74x3RwrCmyjjsLOE_sYoqojLQU1w-Inuiy1jXp9MoYJmTsA8vzz3xzHm6NTIoTGald6NQ",
      price: 899,
      salesCount: 120,
      stock: 10,
      description: "Ergonomic stand that elevates your laptop to eye level, improving posture and reducing neck strain.",
      features: ["Aluminum alloy construction", "6 height adjustments", "Ventilation design", "Fits 10-17\" laptops"],
      rating: 4.5,
      reviews: 76
    },
  ];

  const product = bestSellers.find((p) => p.id === productId);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md text-center">
          <FiAlertCircle className="mx-auto h-12 w-12 text-red-500" />
          <h2 className="mt-4 text-xl font-bold text-gray-800">Product Not Found</h2>
          <p className="mt-2 text-gray-600">The requested product could not be found</p>
          <button
            onClick={() => navigate(-1)}
            className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const handleBuyNow = () => {
    navigate("/payment", { state: { product } });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-blue-600 hover:text-blue-800 mb-6 transition"
        >
          <FiArrowLeft className="mr-2" /> Back to Best Sellers
        </button>

        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="md:flex">
            {/* Product Image */}
            <div className="md:w-1/2 p-6 flex items-center justify-center bg-gray-100">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-96 object-contain rounded-lg"
              />
            </div>

            {/* Product Details */}
            <div className="md:w-1/2 p-8">
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">{product.name}</h1>
                  <div className="flex items-center mt-2">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={`h-5 w-5 ${i < Math.floor(product.rating) ? 'fill-current' : 'fill-current text-gray-300'}`}
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="ml-2 text-gray-600">{product.rating} ({product.reviews} reviews)</span>
                  </div>
                </div>
                <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                  #1 Best Seller
                </div>
              </div>

              <div className="mt-6">
                <span className="text-3xl font-bold text-gray-900">₹{product.price.toLocaleString("en-IN")}</span>
                {product.price > 2000 && (
                  <span className="ml-2 text-sm text-gray-500 line-through">₹{(product.price * 1.2).toLocaleString("en-IN")}</span>
                )}
                <div className="mt-2 flex items-center">
                  {product.stock > 0 ? (
                    <>
                      <FiCheck className="h-5 w-5 text-green-500" />
                      <span className="ml-2 text-green-600">{product.stock} in stock</span>
                    </>
                  ) : (
                    <>
                      <FiAlertCircle className="h-5 w-5 text-red-500" />
                      <span className="ml-2 text-red-600">Out of stock</span>
                    </>
                  )}
                </div>
                <p className="text-gray-500 mt-2">Sold: {product.salesCount}+</p>
              </div>

              <div className="mt-8">
                <h3 className="text-lg font-medium text-gray-900">Description</h3>
                <p className="mt-2 text-gray-600">{product.description}</p>
              </div>

              <div className="mt-6">
                <h3 className="text-lg font-medium text-gray-900">Features</h3>
                <ul className="mt-2 space-y-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <FiCheck className="h-5 w-5 text-green-500" />
                      <span className="ml-2 text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleBuyNow}
                  disabled={product.stock === 0}
                  className={`flex-1 px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white ${
                    product.stock > 0
                      ? "bg-red-600 hover:bg-red-700"
                      : "bg-gray-400 cursor-not-allowed"
                  }`}
                >
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BestSellingProductDetail;