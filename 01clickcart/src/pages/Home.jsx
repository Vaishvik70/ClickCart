import React from "react";
import { useSelector } from "react-redux";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SaleProductCard from "../components/SaleProductCard";
import Hero from "../components/Hero";

const sliderSettings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
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
      className="bg-gray-900 text-white min-h-screen flex flex-col bg-no-repeat bg-center bg-contain"
      style={{
        backgroundImage: "url('https://files.oaiusercontent.com/file-USgtpoWpy3ScPH776sJb2D?se=2025-03-13T09%3A14%3A09Z&sp=r&sv=2024-08-04&sr=b&rscc=max-age%3D604800%2C%20immutable%2C%20private&rscd=attachment%3B%20filename%3D7b20bd50-53ab-4f5e-bbdc-af1671a7e3b4.webp&sig=GSYu9dz1xkUZUeUaZTEhG3NLudhNHjfSo8Ibffyr848%3D')",
      }}
    >
      {/* Sale Products Section (Moved Above Hero) */}
      <div className="max-w-7xl mx-auto text-center py-10">
        <h2 className="text-xl font-bold mb-4">🔥 Sale Products 🔥</h2>
        <Slider {...sliderSettings} className="overflow-hidden">
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

      {/* Hero Section (Now Below Sale Products) */}
      <div className="max-w-7xl mx-auto text-center py-10">
        <h2 className="text-xl font-bold mb-4">🔥 Best Offers 🔥</h2>
      </div>
        <Hero />
    </div>
  );
};

export default Home;
