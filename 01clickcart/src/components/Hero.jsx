import React from "react";
import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";

const offers = [
  { 
    id: 1, 
    image: "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/smart-watch-banner-design-template-4e762c49ed10b6ff4dcbddb915f6d6a9_screen.jpg?ts=1655974438",
    title: "50% OFF on Smartwatches", 
    description: "Limited-time offer on premium smartwatches!",
    category: "Electronics",
    endDate: "2023-12-31"
  },
  { 
    id: 2, 
    image: "https://storage.googleapis.com/shy-pub/208075/SKU-6406_0-1712212689566.jpg",
    title: "Buy 1 Get 1 Free on Headphones", 
    description: "Double your music experience!",
    category: "Audio",
    endDate: "2023-11-30"
  },
  { 
    id: 3, 
    image: "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/new-collection-fashion-sale-banner-design-template-b43c28c068dc8d5fe310269d516c548e_screen.jpg?ts=1597768054",
    title: "50% OFF on Women's Clothing", 
    description: "Trendy fashion at half the price!",
    category: "Fashion",
    endDate: "2023-12-15"
  },
  {
    id: 4,
    image: "https://www.shutterstock.com/shutterstock/photos/2169212715/display_1500/stock-vector-flash-sale-sticker-get-extra-percent-off-discount-offer-limited-time-sale-promotion-extra-2169212715.jpg",
    title: "25% OFF on Whole Series Books",
    description: "Now read whole story without any break",
    category: "Books",
    endDate: "2024-01-10"
  },
];

const Hero = () => {
  return (
    <div className="bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            <span className="block">Exclusive Offers</span>
            <span className="block text-blue-600">Don't Miss Out!</span>
          </h2>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
            Limited-time deals on your favorite products
          </p>
        </div>

        {/* Offers Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {offers.map((offer) => (
            <div 
              key={offer.id} 
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              {/* Offer Image */}
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={offer.image} 
                  alt={offer.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
                {/* Category Tag */}
                <span className="absolute top-2 right-2 bg-blue-600 text-white text-xs font-semibold px-2 py-1 rounded-full">
                  {offer.category}
                </span>
              </div>

              {/* Offer Content */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-bold text-gray-900">{offer.title}</h3>
                  {/* Countdown Badge - You could implement an actual countdown here */}
                  <span className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded">
                    Ends Soon
                  </span>
                </div>
                
                <p className="text-gray-600 mb-4">{offer.description}</p>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">
                    Offer ends: {new Date(offer.endDate).toLocaleDateString()}
                  </span>
                  <Link
                    to={`/offer/${offer.id}`}
                    className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors"
                  >
                    View Deal <FiArrowRight className="ml-1" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hero;