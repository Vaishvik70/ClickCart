import React from "react";
import { useSelector } from "react-redux";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SaleProductCard from "./SaleProductCard";
import Hero from "./Hero";
import Testimonials from "./Testimonials";

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

const Footer = () => {
  const saleProducts = useSelector((state) => state.saleProducts?.saleProducts || []); // ✅ Corrected

  return (
    <footer className="bg-gray-800 text-white p-6 mt-10">
      <Hero />
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-xl font-bold mb-4">🔥 Sale Products 🔥</h2>
        <Slider {...sliderSettings} className="overflow-hidden">
          {saleProducts.map((product) => (
            <div key={product.id} className="px-2">
              <SaleProductCard product={product} />
            </div>
          ))}
        </Slider>
        <div>
          <p className="mt-6 text-gray-400 text-sm">
            © {new Date().getFullYear()} Click Cart. Created by{" "}
            <span className="text-blue-400 font-semibold">Vaishvik</span>
          </p>
        </div>
      </div>
      <Testimonials />
    </footer>
  );
};

export default Footer;
