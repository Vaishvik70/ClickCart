import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SaleProductCard from "./SaleProductCard";

const saleProducts = [
  {
    id: 1,
    image: "https://images.pexels.com/photos/205926/pexels-photo-205926.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    title: "Wireless Headphones",
    price: 100,
    discount: 20,
  },
  {
    id: 2,
    image: "https://images.pexels.com/photos/2779018/pexels-photo-2779018.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    title: "Smartwatch",
    price: 200,
    discount: 30,
  },
  {
    id: 3,
    image: "https://images.pexels.com/photos/8000624/pexels-photo-8000624.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=252&fit=crop&h=408",
    title: "Bluetooth Speaker",
    price: 150,
    discount: 25,
  },
  {
    id: 4,
    image: "https://images.pexels.com/photos/1649771/pexels-photo-1649771.jpeg?auto=compress&cs=tinysrgb&w=600",
    title: "Gaming Mouse",
    price: 80,
    discount: 15,
  },
];

const sliderSettings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 3, // Show 3 slides on desktop
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3000,
  responsive: [
    {
      breakpoint: 1024, // For tablets
      settings: {
        slidesToShow: 2,
      },
    },
    {
      breakpoint: 768, // For mobile
      settings: {
        slidesToShow: 1,
      },
    },
  ],
};

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white p-6 mt-10">
      <div className="max-w-7xl mx-auto text-center"> {/* Adjust width */}
        <h2 className="text-xl font-bold mb-4">🔥 Sale Products 🔥</h2>
        <Slider {...sliderSettings} className="overflow-hidden">
          {saleProducts.map((product) => (
            <div key={product.id} className="px-2">
              <SaleProductCard product={product} />
            </div>
          ))}
        </Slider>
      </div>
    </footer>
  );
};

export default Footer;
