import React from "react";
import { useParams, useNavigate } from "react-router-dom";

const offersWithProducts = {
  1: [
    {
      id: 1,
      image: "https://cdn.shopify.com/s/files/1/0356/9850/7909/files/zeb-Gemini-banner8.jpg?v=1697106712",
      title: "Smartwatch",
      price: 2000,
      discount: 50,
    },
    {
      id: 2,
      image: "https://oneclickshopping.pk/wp-content/uploads/2022/03/Untitled-1_1-379.jpg",
      title: "Fitness Band",
      price: 1500,
      discount: 40,
    },
  ],
  2: [
    {
      id: 3,
      image: "https://m.media-amazon.com/images/I/41JACWT-wWL._AC_UF1000,1000_QL80_.jpg",
      title: "Wireless Headphones",
      price: 3000,
      discount: 50,
    },
    {
      id: 4,
      image: "https://m.media-amazon.com/images/I/61Sst7zTNCL.jpg",
      title: "Gaming Headset",
      price: 4000,
      discount: 35,
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

const getDiscountedPrice = (price, discount) => {
  return (price - (price * discount) / 100).toFixed(2);
};

const OfferDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const isLoggedIn = !!localStorage.getItem("user");
  const products = offersWithProducts[parseInt(id)] || [];

  if (products.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
        <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md text-center">
          <h2 className="text-red-500 text-2xl font-bold mb-4">No Products Found</h2>
          <p className="text-gray-600 mb-6">We couldn't find any products for this offer.</p>
          <button
            onClick={() => navigate("/")}
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition duration-300"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Special Offers
          </h1>
          <p className="mt-3 text-xl text-gray-500">
            Don't miss these limited-time deals
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {products.map((product) => (
            <div key={product.id} className="group">
              <div className="w-full aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-60 object-contain object-center group-hover:opacity-75 bg-white p-4"
                />
              </div>
              <div className="mt-4 bg-white p-4 rounded-b-lg shadow-sm">
                <h3 className="text-lg font-medium text-gray-900">{product.title}</h3>
                
                {/* Pricing */}
                <div className="mt-2">
                  <div className="flex items-center">
                    <p className="text-lg font-semibold text-gray-900">
                      ₹{getDiscountedPrice(product.price, product.discount)}
                    </p>
                    <p className="ml-2 text-sm text-gray-500 line-through">
                      ₹{product.price}
                    </p>
                    <span className="ml-auto bg-red-100 text-red-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                      {product.discount}% OFF
                    </span>
                  </div>
                </div>

                {/* Buttons */}
                <div className="mt-4 space-y-2">
                  {isLoggedIn ? (
                    <>
                      <button
                        onClick={() => navigate("/payment", { state: { product } })}
                        className="w-full flex items-center justify-center bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-600" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                        </svg>
                        Buy Now
                      </button>
                    </>
                  ) : (
                    <div className="text-center py-3">
                      <p className="text-sm text-red-600">
                        Please login to purchase
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Back Button */}
        <div className="mt-12 text-center">
          <button
            onClick={() => navigate("/")}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default OfferDetail;