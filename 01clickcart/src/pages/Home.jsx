import React from "react";
import { useSelector } from "react-redux";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SaleProductCard from "../components/SaleProductCard";
import Hero from "../components/Hero";



// Slider settings
const sliderSettings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3000,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 2,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 1,
      },
    },
  ],
};

const Home = () => {
  const saleProducts = useSelector((state) => state.saleProducts?.saleProducts || []);

  return (
    <div
      className="bg-white text-blue-500 min-h-screen flex flex-col bg-no-repeat bg-center bg-contain overflow-x-hidden"
    >
      {/* Sale Products Section */}
      <div className="max-w-7xl mx-auto text-center py-10 overflow-hidden relative">
        <h2 className="text-xl font-bold mb-4 text-blue-700">🔥 Sale Products 🔥</h2>
        <div className="w-full relative">
          <Slider {...sliderSettings}>
            {saleProducts.length > 0 ? (
              saleProducts.map((product) => (
                <div key={product.id} className="px-2">
                  <SaleProductCard product={product} />
                </div>
              ))
            ) : (
              <p className="text-gray-400">No products on sale right now.</p>
            )}
          </Slider>
        </div>
      </div>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto text-center py-10">
        <h2 className="text-xl font-bold mb-4">🔥 Best Offers 🔥</h2>
      </div>
      <Hero />
    </div>
  );
};

export default Home;
