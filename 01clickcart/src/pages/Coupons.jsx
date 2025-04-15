import React, { useState } from "react";
import { FaCopy, FaCheckCircle } from "react-icons/fa";

const couponsList = [
  {
    id: 1,
    code: "WELCOME10",
    discount: "10% Off",
    description: "Get 10% off on your first order.",
    expires: "2025-12-31",
    minOrder: "No minimum order",
    category: "First Order",
  },
  {
    id: 2,
    code: "FREESHIP",
    discount: "Free Shipping",
    description: "Enjoy free shipping on orders above ₹500.",
    expires: "2025-06-30",
    minOrder: "₹500 minimum order",
    category: "Shipping",
  },
  {
    id: 3,
    code: "BUY2GET1",
    discount: "Buy 2 Get 1 Free",
    description: "Add 3 items to your cart and get the cheapest one free.",
    expires: "2025-08-15",
    minOrder: "3 items required",
    category: "Bundles",
  },
  {
    id: 4,
    code: "PAY20",
    discount: "₹20 Off",
    description: "Flat ₹20 off on Paypal payments.",
    expires: "2025-10-01",
    minOrder: "No minimum order",
    category: "Payment",
  },
  {
    id: 5,
    code: "SUMMER25",
    discount: "25% Off",
    description: "Enjoy 25% off during the Summer Sale.",
    expires: "2025-05-31",
    minOrder: "No minimum order",
    category: "Seasonal",
  },
  {
    id: 6,
    code: "CLICKFEST50",
    discount: "₹50 Off",
    description: "Flat ₹50 off on orders above ₹1000.",
    expires: "2025-09-10",
    minOrder: "₹1000 minimum order",
    category: "Special Offer",
  },
  {
    id: 7,
    code: "NEWUSER100",
    discount: "₹100 Off",
    description: "₹100 off on your first purchase as a new user.",
    expires: "2025-12-31",
    minOrder: "No minimum order",
    category: "New User",
  },
  {
    id: 8,
    code: "EXTRA5",
    discount: "Extra 5% Off",
    description: "Extra 5% discount on prepaid orders.",
    expires: "2025-07-20",
    minOrder: "No minimum order",
    category: "Payment",
  },
];

const Coupons = () => {
  const [copiedCode, setCopiedCode] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = ["All", ...new Set(couponsList.map(coupon => coupon.category))];

  const filteredCoupons = activeCategory === "All" 
    ? couponsList 
    : couponsList.filter(coupon => coupon.category === activeCategory);

  const handleCopy = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(""), 1500);
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Exclusive Coupons & Offers
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Save more with these limited-time offers. Copy the code and apply at checkout.
        </p>
      </div>

      {/* Category Filters */}
      <div className="flex flex-wrap justify-center gap-3 mb-8">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              activeCategory === category
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredCoupons.map((coupon) => (
          <div
            key={coupon.id}
            className="border rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow bg-white dark:bg-gray-800 dark:border-gray-700"
          >
            <div className="flex justify-between items-start mb-3">
              <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                {coupon.category}
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                Expires: {formatDate(coupon.expires)}
              </span>
            </div>

            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
              {coupon.discount}
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">{coupon.description}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
              {coupon.minOrder}
            </p>

            <div className="flex items-center justify-between mt-4 p-3 bg-gray-50 rounded-lg dark:bg-gray-700">
              <code className="font-mono font-bold text-gray-800 dark:text-white">
                {coupon.code}
              </code>
              <button
                onClick={() => handleCopy(coupon.code)}
                className="flex items-center justify-center w-8 h-8 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                aria-label="Copy coupon code"
              >
                {copiedCode === coupon.code ? (
                  <FaCheckCircle className="text-green-500 text-lg" />
                ) : (
                  <FaCopy className="text-gray-500 dark:text-gray-400 text-lg" />
                )}
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredCoupons.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400">
            No coupons available in this category. Please check other categories.
          </p>
        </div>
      )}
    </div>
  );
};

export default Coupons;