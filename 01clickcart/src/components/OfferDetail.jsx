import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { account } from "../appwrite/appwriteConfig";
import { AiOutlineLoading3Quarters, AiOutlineArrowLeft } from "react-icons/ai";
import { FiShoppingCart, FiAlertCircle } from "react-icons/fi";

const offersWithProducts = {
  1: {
    name: "Electronics Special",
    banner: "https://example.com/electronics-banner.jpg",
    products: [
      {
        id: 1,
        image: "https://cdn.shopify.com/s/files/1/0356/9850/7909/files/zeb-Gemini-banner8.jpg?v=1697106712",
        title: "Smartwatch Pro",
        price: 2000,
        discount: 50,
        description: "Advanced smartwatch with health monitoring and 7-day battery life",
        rating: 4.5,
        reviews: 128
      },
      {
        id: 2,
        image: "https://oneclickshopping.pk/wp-content/uploads/2022/03/Untitled-1_1-379.jpg",
        title: "Fitness Band X",
        price: 1500,
        discount: 40,
        description: "Lightweight fitness tracker with heart rate monitoring",
        rating: 4.2,
        reviews: 86
      }
    ]
  },
  2: {
    name: "Audio Deals",
    banner: "https://example.com/audio-banner.jpg",
    products: [
      {
        id: 3,
        image: "https://m.media-amazon.com/images/I/41JACWT-wWL._AC_UF1000,1000_QL80_.jpg",
        title: "Wireless Headphones",
        price: 3000,
        discount: 50,
        description: "Premium noise-cancelling headphones with 30hr battery life",
        rating: 4.7,
        reviews: 215
      },
      {
        id: 4,
        image: "https://m.media-amazon.com/images/I/61Sst7zTNCL.jpg",
        title: "Gaming Headset",
        price: 4000,
        discount: 35,
        description: "Surround sound gaming headset with mic",
        rating: 4.3,
        reviews: 152
      }
    ]
  },
  3: {
    name: "Fashion Collection",
    banner: "https://example.com/fashion-banner.jpg",
    products: [
      {
        id: 5,
        image: "https://m.media-amazon.com/images/I/51LxT4iSWPL._AC_UY350_.jpg",
        title: "Designer Kurti",
        price: 2000,
        discount: 45,
        description: "Handcrafted cotton kurti with embroidery",
        rating: 4.1,
        reviews: 64
      },
      {
        id: 6,
        image: "https://m.media-amazon.com/images/I/81z2IicIjUL._AC_UY1100_.jpg",
        title: "Premium Shirt",
        price: 3000,
        discount: 30,
        description: "Formal shirt with wrinkle-free fabric",
        rating: 4.4,
        reviews: 93
      }
    ]
  },
  4: {
    name: "Book Bonanza",
    banner: "https://example.com/books-banner.jpg",
    products: [
      {
        id: 7,
        image: "https://images-eu.ssl-images-amazon.com/images/I/81+ceFx9BcL._AC_UL900_SR900,600_.jpg",
        title: "Crime Fiction",
        price: 300,
        discount: 45,
        description: "Bestselling crime thriller novel",
        rating: 4.8,
        reviews: 342
      },
      {
        id: 8,
        image: "https://m.media-amazon.com/images/I/71K58ScrmbL._AC_UL480_QL65_.jpg",
        title: "Economics Fiction",
        price: 700,
        discount: 50,
        description: "Award-winning economic theory novel",
        rating: 4.6,
        reviews: 178
      }
    ]
  }
};

const OfferDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const checkLogin = async () => {
      try {
        await account.get();
        setIsLoggedIn(true);
        // Load cart from localStorage
        const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
        setCart(savedCart);
      } catch (error) {
        setIsLoggedIn(false);
      } finally {
        setLoading(false);
      }
    };
    checkLogin();
  }, []);

  const currentOffer = offersWithProducts[id];
  const products = currentOffer?.products || [];

  const addToCart = (product) => {
    const existingItem = cart.find(item => item.id === product.id);
    let updatedCart;
    
    if (existingItem) {
      updatedCart = cart.map(item => 
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
    } else {
      updatedCart = [...cart, { ...product, quantity: 1 }];
    }
    
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    alert(`${product.title} added to cart!`);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <AiOutlineLoading3Quarters className="animate-spin text-4xl text-blue-600" />
      </div>
    );
  }

  if (!currentOffer) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div className="max-w-md text-center p-6 bg-white rounded-lg shadow">
          <FiAlertCircle className="mx-auto text-5xl text-red-500 mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Offer Not Found</h2>
          <p className="text-gray-600 mb-6">
            The offer you're looking for doesn't exist or has expired.
          </p>
          <button
            onClick={() => navigate("/")}
            className="flex items-center justify-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            <AiOutlineArrowLeft /> Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-800"
          >
            <AiOutlineArrowLeft /> Back to Offers
          </button>
        </div>

        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            {currentOffer.name}
          </h1>
          <p className="text-lg text-gray-600">
            Limited time offer - Save big on these products!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => {
            const discountedPrice = product.price - (product.price * product.discount) / 100;
            
            return (
              <div 
                key={product.id} 
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition"
              >
                <div className="h-64 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-contain p-4"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{product.title}</h3>
                  <p className="text-gray-600 mb-4">{product.description}</p>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <span className="text-2xl font-bold text-red-600">
                        ₹{discountedPrice.toFixed(2)}
                      </span>
                      <span className="ml-2 text-gray-500 line-through">
                        ₹{product.price.toFixed(2)}
                      </span>
                    </div>
                    <span className="bg-green-100 text-green-800 text-sm font-medium px-2.5 py-0.5 rounded">
                      {product.discount}% OFF
                    </span>
                  </div>

                  {isLoggedIn ? (
                    <div className="flex gap-3">
                      <button
                        onClick={() => navigate("/payment", { state: { product } })}
                        className="flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
                      >
                        Buy Now
                      </button>
                    </div>
                  ) : (
                    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
                      <p className="text-yellow-700 flex items-center gap-2">
                        <FiAlertCircle /> Please login to purchase
                      </p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default OfferDetail;