import React from "react";
import { useParams, useNavigate } from "react-router-dom";

// Dummy data: Sale products linked to offers
const offersWithProducts = {
  1: [
    {
      id: 1,
      image: "https://cdn.shopify.com/s/files/1/0356/9850/7909/files/zeb-Gemini-banner8.jpg?v=1697106712",
      title: "Smartwatch",
      price: 2000,
      discount: 50, // 50% OFF
    },
    {
      id: 2,
      image: "https://oneclickshopping.pk/wp-content/uploads/2022/03/Untitled-1_1-379.jpg",
      title: "Fitness Band",
      price: 1500,
      discount: 40, // 40% OFF
    },
  ],
  2: [
    {
      id: 3,
      image: "https://m.media-amazon.com/images/I/41JACWT-wWL._AC_UF1000,1000_QL80_.jpg",
      title: "Wireless Headphones",
      price: 3000,
      discount: 50, // 50% OFF
    },
    {
      id: 4,
      image: "https://m.media-amazon.com/images/I/61Sst7zTNCL.jpg",
      title: "Gaming Headset",
      price: 4000,
      discount: 35, // 35% OFF
    },
  ],
  3: [
    {
      id: 5,
      image: "https://m.media-amazon.com/images/I/51LxT4iSWPL._AC_UY350_.jpg",
      title: "Kurti",
      price: 2000,
      discount: 45,
    },
    {
      id: 6,
      image: "https://m.media-amazon.com/images/I/81z2IicIjUL._AC_UY1100_.jpg",
      title: "Shirt",
      price: 3000,
      discount: 30,
    },
  ],
  4: [
    {
      id: 7,
      image: "https://images-eu.ssl-images-amazon.com/images/I/81+ceFx9BcL._AC_UL900_SR900,600_.jpg",
      title: "Crime Fiction",
      price: 300,
      discount: 45,
    },
    {
      id: 8,
      image: "https://m.media-amazon.com/images/I/71K58ScrmbL._AC_UL480_QL65_.jpg",
      title: "Economics Fiction",
      price: 700,
      discount: 50,
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
