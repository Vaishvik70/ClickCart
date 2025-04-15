import React from "react";
import { useSelector } from "react-redux";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SaleProductCard from "../components/SaleProductCard";
import Hero from "../components/Hero";

// Enhanced Slider settings
const sliderSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3000,
  arrows: true,
  responsive: [
    {
      breakpoint: 1280,
      settings: {
        slidesToShow: 3,
      },
    },
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 2,
      },
    },
    {
      breakpoint: 640,
      settings: {
        slidesToShow: 1,
        arrows: false,
      },
    },
  ],
};

const Home = () => {
  const saleProducts = useSelector((state) => state.saleProducts?.saleProducts || []);

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col overflow-x-hidden">
      {/* Hero Section - Moved to top for better visual hierarchy */}
      <Hero />
      
      {/* Main Content Container */}
      <div className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Sale Products Section */}
        <section className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
              Hot Sale Products
            </h2>
            <div className="w-20 h-1 bg-blue-500 mx-auto"></div>
          </div>
          
          <div className="relative">
            {saleProducts.length > 0 ? (
              <Slider {...sliderSettings}>
                {saleProducts.map((product) => (
                  <div key={product.id} className="px-2 focus:outline-none">
                    <SaleProductCard product={product} />
                  </div>
                ))}
              </Slider>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">
                  No products on sale right now. Check back later!
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Best Offers Section - You can add actual content here */}
        <section className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
              Best Offers
            </h2>
            <div className="w-20 h-1 bg-blue-500 mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Placeholder for offer cards - replace with actual components */}
            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Special Deal</h3>
              <p className="text-gray-600">Limited time offer on selected items</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">New Arrivals</h3>
              <p className="text-gray-600">Fresh products just for you</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Bundle Discount</h3>
              <p className="text-gray-600">Save more when you buy together</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;