import React from "react";

const About = () => {
  return (
    <div className="bg-gray-900 text-white min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            About Click Cart
          </h1>
          <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Welcome to <span className="text-blue-400 font-semibold">Click Cart</span> – 
            your premier destination for curated online shopping. We're dedicated to delivering 
            exceptional products at competitive prices with an effortless customer experience.
          </p>
        </div>

        {/* Mission & Vision Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="bg-gray-800 p-8 rounded-xl shadow-xl hover:shadow-2xl transition-shadow duration-300 border-l-4 border-blue-400">
            <div className="flex items-center mb-4">
              <div className="bg-blue-500 p-3 rounded-full mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold">Our Mission</h2>
            </div>
            <p className="text-gray-300 text-lg leading-relaxed">
              To revolutionize online shopping by combining quality, affordability, and reliability. 
              We meticulously select products, offer exclusive discounts, and ensure secure transactions 
              for complete peace of mind.
            </p>
          </div>

          <div className="bg-gray-800 p-8 rounded-xl shadow-xl hover:shadow-2xl transition-shadow duration-300 border-l-4 border-purple-400">
            <div className="flex items-center mb-4">
              <div className="bg-purple-500 p-3 rounded-full mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold">Our Vision</h2>
            </div>
            <p className="text-gray-300 text-lg leading-relaxed">
              To become the most trusted eCommerce platform globally, known for 
              innovative shopping solutions, exceptional customer service, and 
              a community-driven approach to retail.
            </p>
          </div>
        </div>

        {/* Why Choose Us Section */}
        <div className="bg-gray-800 rounded-xl p-8 max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Why Choose Click Cart?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                icon: "M5 13l4 4L19 7",
                title: "Quality Assurance",
                desc: "Rigorous quality checks on all products"
              },
              {
                icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
                title: "Best Prices",
                desc: "Price match guarantee on thousands of items"
              },
              {
                icon: "M12 15l8-8m0 0h-8m8 0v8m-6-10a2 2 0 11-4 0 2 2 0 014 0z",
                title: "Fast Delivery",
                desc: "Express shipping options available"
              },
              {
                icon: "M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z",
                title: "24/7 Support",
                desc: "Dedicated customer service team"
              }
            ].map((item, index) => (
              <div key={index} className="flex items-start space-x-4 p-4 hover:bg-gray-700 rounded-lg transition-colors">
                <div className="bg-blue-500/20 p-2 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-1">{item.title}</h3>
                  <p className="text-gray-300">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-16 text-center">
          <p className="text-gray-400 text-lg max-w-3xl mx-auto">
            Join over <span className="text-blue-400 font-bold">1 million</span> satisfied customers who trust Click Cart for their online shopping needs.
          </p>
          <button className="mt-8 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-3 rounded-full font-semibold hover:opacity-90 transition-opacity shadow-lg">
            Start Shopping Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default About;