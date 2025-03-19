import React from "react";
import { useParams, useNavigate } from "react-router-dom";

// Dummy data: Sale products linked to offers
const offersWithProducts = {
  1: [
    {
      id: 1,
      image: "https://images.pexels.com/photos/2779018/pexels-photo-2779018.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      title: "Smartwatch",
      price: 2000,
      discount: 50, // 50% OFF
    },
    {
      id: 2,
      image: "https://images.pexels.com/photos/240677/pexels-photo-240677.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      title: "Fitness Band",
      price: 1500,
      discount: 40, // 40% OFF
    },
  ],
  2: [
    {
      id: 3,
      image: "https://images.pexels.com/photos/205926/pexels-photo-205926.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      title: "Wireless Headphones",
      price: 3000,
      discount: 50, // 50% OFF
    },
    {
      id: 4,
      image: "https://images.pexels.com/photos/1068255/pexels-photo-1068255.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      title: "Gaming Headset",
      price: 4000,
      discount: 35, // 35% OFF
    },
  ],
};

// Helper function to calculate discount price
const getDiscountedPrice = (price, discount) => {
  return (price - (price * discount) / 100).toFixed(2);
};

const OfferDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Get products related to the offer
  const products = offersWithProducts[id] || [];

  if (products.length === 0) {
    return <h2 className="text-red-500 text-center mt-10 text-2xl">⚠ No Products Found for this Offer!</h2>;
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">🔥 Offer Details 🔥</h1>

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.id} className="bg-gray-100 p-4 rounded-lg shadow-lg">
            <img src={product.image} alt={product.title} className="w-full h-48 object-cover rounded-md" />
            <h2 className="text-xl font-semibold mt-2">{product.title}</h2>
            
            {/* Pricing Section */}
            <p className="text-red-500 font-bold text-lg">
              ₹{getDiscountedPrice(product.price, product.discount)} <span className="text-sm">after discount</span>
            </p>
            <p className="text-gray-500 line-through">₹{product.price}</p>
            <p className="text-green-600 font-bold">{product.discount}% OFF</p>

            {/* Buttons */}
            <div className="mt-4 flex flex-col gap-2">
              <button 
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
                onClick={() => console.log("Added to Cart:", product)}
              >
                🛒 Add to Cart
              </button>
              <button 
                className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition"
                onClick={() => navigate("/payment", { state: { product } })}
              >
                💳 Buy Now
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Back to Home Button */}
      <div className="mt-8 text-center">
        <button 
          onClick={() => navigate("/")} 
          className="bg-gray-800 text-white py-2 px-4 rounded hover:bg-gray-700 transition"
        >
          ⬅ Back to Home
        </button>
      </div>
    </div>
  );
};

export default OfferDetail;
