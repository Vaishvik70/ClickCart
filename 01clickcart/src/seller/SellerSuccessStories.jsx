import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const stories = [
  {
    name: "Dinesh Kumar Rajpurohit",
    business: "Kemei Electronics",
    story:
      "On Click Cart, your listings go live in less than 2 hours. I started with just 3 products, and now I own 3 brands and employ 25 people. The platform's seller tools helped me scale beyond my expectations.",
    image: "https://randomuser.me/api/portraits/men/1.jpg",
    location: "Jaipur, Rajasthan"
  },
  {
    name: "Priya Sharma",
    business: "Priya Fashions",
    story:
      "Selling on Click Cart helped me grow my boutique business nationwide with minimal investment. The marketing support and customer reach transformed my small local shop into a recognized brand across India.",
    image: "https://randomuser.me/api/portraits/women/2.jpg",
    location: "Mumbai, Maharashtra"
  },
  {
    name: "Ravi Verma",
    business: "Home Essentials",
    story:
      "Coming from a small town, I never imagined my products would reach customers across the country! Click Cart's logistics network made nationwide delivery simple and affordable for my business.",
    image: "https://randomuser.me/api/portraits/men/3.jpg",
    location: "Indore, Madhya Pradesh"
  },
  {
    name: "Anita Mehta",
    business: "Handmade Wonders",
    story:
      "As an artisan, I struggled to find markets for my handmade products. Click Cart provided the perfect platform to showcase my crafts globally, with 60% of my orders now coming from international buyers.",
    image: "https://randomuser.me/api/portraits/women/4.jpg",
    location: "Ahmedabad, Gujarat"
  }
];

const SellerSuccessStories = () => {
  const [current, setCurrent] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  useEffect(() => {
    if (!autoPlay) return;
    
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % stories.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [autoPlay]);

  const prevStory = () => {
    setAutoPlay(false);
    setCurrent((prev) => (prev === 0 ? stories.length - 1 : prev - 1));
  };

  const nextStory = () => {
    setAutoPlay(false);
    setCurrent((prev) => (prev + 1) % stories.length);
  };

  return (
    <section className="py-16 bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Success <span className="text-blue-600">Stories</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Hear from sellers who transformed their businesses with Click Cart
          </p>
        </div>

        <div className="max-w-4xl mx-auto relative">
          <div className="absolute left-0 top-1/2 -translate-y-1/2 -ml-4 z-10">
            <button 
              onClick={prevStory}
              className="bg-white p-3 rounded-full shadow-lg hover:bg-blue-50 transition-colors"
              aria-label="Previous story"
            >
              <FiChevronLeft className="w-5 h-5 text-blue-600" />
            </button>
          </div>

          <div className="absolute right-0 top-1/2 -translate-y-1/2 -mr-4 z-10">
            <button 
              onClick={nextStory}
              className="bg-white p-3 rounded-full shadow-lg hover:bg-blue-50 transition-colors"
              aria-label="Next story"
            >
              <FiChevronRight className="w-5 h-5 text-blue-600" />
            </button>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden"
            >
              <div className="md:flex">
                <div className="md:w-1/3 bg-blue-50 flex items-center justify-center p-8">
                  <div className="relative">
                    <img 
                      src={stories[current].image} 
                      alt={stories[current].name} 
                      className="w-40 h-40 rounded-full object-cover border-4 border-white shadow-md" 
                    />
                  </div>
                </div>
                
                <div className="md:w-2/3 p-8 md:p-10">
                  <div className="flex items-center mb-4">
                    <div className="bg-blue-100 rounded-full w-3 h-3 mr-2"></div>
                    <span className="text-sm text-blue-600">SELLER STORY</span>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-900 mb-1">
                    {stories[current].name}
                  </h3>
                  
                  <p className="text-gray-600 mb-2">
                    {stories[current].business} • {stories[current].location}
                  </p>
                  
                  <div className="text-gray-700 mb-6 leading-relaxed">
                    <p className="italic mb-4">"{stories[current].story}"</p>
                  </div>
                  
                  <div className="flex justify-center space-x-2">
                    {stories.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          setCurrent(index);
                          setAutoPlay(false);
                        }}
                        className={`w-3 h-3 rounded-full ${current === index ? 'bg-blue-600' : 'bg-gray-300'}`}
                        aria-label={`Go to story ${index + 1}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default SellerSuccessStories;