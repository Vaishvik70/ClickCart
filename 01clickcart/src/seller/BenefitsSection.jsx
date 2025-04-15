import React from "react";
import {
  FaUsers,
  FaMoneyBillWave,
  FaPercentage,
  FaHeadset,
  FaBullhorn,
  FaTruck
} from "react-icons/fa";

const BenefitsSection = () => {
  const benefits = [
    {
      icon: <FaUsers className="w-8 h-8 text-indigo-600" />,
      title: "Massive Customer Base",
      description: "Reach millions of active buyers across the country with our growing marketplace."
    },
    {
      icon: <FaMoneyBillWave className="w-8 h-8 text-indigo-600" />,
      title: "Fast & Secure Payments",
      description: "Receive payments within 3-7 business days with multiple withdrawal options."
    },
    {
      icon: <FaPercentage className="w-8 h-8 text-indigo-600" />,
      title: "Low Selling Fees",
      description: "Industry-low commission rates starting from just 5% to maximize your profits."
    },
    {
      icon: <FaHeadset className="w-8 h-8 text-indigo-600" />,
      title: "24/7 Seller Support",
      description: "Dedicated account managers and 24-hour support for all your queries."
    },
    {
      icon: <FaBullhorn className="w-8 h-8 text-indigo-600" />,
      title: "Marketing & Promotions",
      description: "Featured placements, email campaigns, and social media promotions."
    },
    {
      icon: <FaTruck className="w-8 h-8 text-indigo-600" />,
      title: "Seamless Logistics",
      description: "Integrated shipping solutions with discounted rates and real-time tracking."
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Why Sell With <span className="text-indigo-600">Click Cart</span>?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Join thousands of sellers growing their business with our powerful e-commerce platform
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div 
              key={index}
              className="bg-gray-50 p-8 rounded-xl transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border border-gray-100"
            >
              <div className="flex flex-col items-center text-center">
                <div className="bg-indigo-50 p-4 rounded-full mb-4">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-lg font-semibold text-lg transition duration-200 shadow-md">
            Start Selling Today
          </button>
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;