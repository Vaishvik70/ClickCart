import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// ✅ Testimonials Data
const testimonials = [
  {
    id: 1,
    name: "John Doe",
    review: "Amazing products and great prices! Highly recommend Click Cart.",
    image: "https://randomuser.me/api/portraits/men/1.jpg",
  },
  {
    id: 2,
    name: "Sarah Lee",
    review: "Fast delivery and excellent quality. Will shop again!",
    image: "https://randomuser.me/api/portraits/women/2.jpg",
  },
  {
    id: 3,
    name: "Mike Johnson",
    review: "Loved the discounts! The best shopping experience online.",
    image: "https://randomuser.me/api/portraits/men/3.jpg",
  },
  {
    id: 4,
    name: "Emily Brown",
    review: "The customer support was very helpful. I'm satisfied with my purchase!",
    image: "https://randomuser.me/api/portraits/women/4.jpg",
  },
  {
    id: 5,
    name: "David Wilson",
    review: "High-quality products at unbeatable prices. I’m a loyal customer now!",
    image: "https://randomuser.me/api/portraits/men/5.jpg",
  },
  {
    id: 6,
    name: "Olivia Martinez",
    review: "The website is user-friendly, and checkout was smooth. Great experience!",
    image: "https://randomuser.me/api/portraits/women/6.jpg",
  },
];

// ✅ Slider settings for testimonials
const testimonialSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 2,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 4000,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 1,
      },
    },
  ],
};

const Testimonials = () => {
  return (
    <div className="max-w-5xl mx-auto text-center mt-10">
      <h2 className="text-xl font-bold mb-4">⭐ Customer Testimonials ⭐</h2>
      <Slider {...testimonialSettings} className="overflow-hidden">
        {testimonials.map((testimonial) => (
          <div key={testimonial.id} className="bg-gray-700 p-6 rounded-lg shadow-lg mx-2">
            <img 
              src={testimonial.image} 
              alt={testimonial.name} 
              className="w-16 h-16 rounded-full mx-auto mb-3"
            />
            <p className="text-gray-300 italic">"{testimonial.review}"</p>
            <h3 className="text-white font-semibold mt-2">{testimonial.name}</h3>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Testimonials;
