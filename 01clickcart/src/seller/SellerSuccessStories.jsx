import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const stories = [
  {
    name: "Dinesh Kumar Rajpurohit, Kemei",
    story:
      "On Click Cart, your listings go live in less than 2 hours. I started with 3 products, now I own 3 brands and employ 25 people.",
    image: "https://randomuser.me/api/portraits/men/1.jpg"
  },
  {
    name: "Priya Sharma, Priya Fashions",
    story:
      "Selling on Click Cart helped me grow my business nationwide with minimal investment.",
    image: "https://randomuser.me/api/portraits/women/2.jpg"
  },
  {
    name: "Ravi Verma, Home Essentials",
    story:
      "I started from a small town, and today my products reach customers across the country!",
    image: "https://randomuser.me/api/portraits/men/3.jpg"
  },
  {
    name: "Anita Mehta, Handmade Wonders",
    story:
      "Click Cart provided me with the right tools to scale my handmade products globally.",
    image: "https://randomuser.me/api/portraits/women/4.jpg"
  }
];

const SellerSuccessStories = () => {
  const [current, setCurrent] = useState(0);

  const prevStory = () => {
    setCurrent((prev) => (prev === 0 ? stories.length - 1 : prev - 1));
  };

  const nextStory = () => {
    setCurrent((prev) => (prev + 1) % stories.length);
  };

  return (
    <section className="py-10 bg-gray-100 text-center">
      <h2 className="text-3xl font-bold text-blue-600 mb-6">Seller Success Stories</h2>
      <div className="relative max-w-xl mx-auto p-6 bg-white shadow-lg rounded-md overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center"
          >
            <img src={stories[current].image} alt={stories[current].name} className="w-24 h-24 rounded-full mb-4 shadow-md border-2 border-blue-500" />
            <p className="text-xl font-semibold text-gray-800">{stories[current].name}</p>
            <p className="text-gray-600 mt-2 italic">"{stories[current].story}"</p>
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="mt-6 flex justify-center gap-4">
        <button onClick={prevStory} className="bg-gray-500 hover:bg-gray-600 transition text-white px-4 py-2 rounded shadow">Prev</button>
        <button onClick={nextStory} className="bg-blue-500 hover:bg-blue-600 transition text-white px-4 py-2 rounded shadow">Next</button>
      </div>
    </section>
  );
};

export default SellerSuccessStories;
