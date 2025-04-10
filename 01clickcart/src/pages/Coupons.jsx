import React, { useState } from "react";
import { FaCopy, FaCheckCircle } from "react-icons/fa";

const coupons = [
  {
    id: 1,
    code: "WELCOME10",
    discount: "10% Off",
    description: "Get 10% off on your first order.",
    expires: "2025-12-31",
  },
  {
    id: 2,
    code: "FREESHIP",
    discount: "Free Shipping",
    description: "Enjoy free shipping on orders above ₹500.",
    expires: "2025-06-30",
  },
  {
    id: 3,
    code: "BUY2GET1",
    discount: "Buy 2 Get 1 Free",
    description: "Add 3 items to your cart and get the cheapest one free.",
    expires: "2025-08-15",
  },
  {
    id: 4,
    code: "PAY20",
    discount: "₹20 Off",
    description: "Flat ₹20 off on Paypal payments.",
    expires: "2025-10-01",
  },
  {
    id: 5,
    code: "SUMMER25",
    discount: "25% Off",
    description: "Enjoy 25% off during the Summer Sale.",
    expires: "2025-05-31",
  },
  {
    id: 6,
    code: "CLICKFEST50",
    discount: "₹50 Off",
    description: "Flat ₹50 off on orders above ₹1000.",
    expires: "2025-09-10",
  },
  {
    id: 7,
    code: "NEWUSER100",
    discount: "₹100 Off",
    description: "₹100 off on your first purchase as a new user.",
    expires: "2025-12-31",
  },
  {
    id: 8,
    code: "EXTRA5",
    discount: "Extra 5% Off",
    description: "Extra 5% discount on prepaid orders.",
    expires: "2025-07-20",
  },
];

const Coupons = () => {
  const [copiedCode, setCopiedCode] = useState("");

  const handleCopy = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(""), 1500);
  };

  return (
    <div className="max-w-5xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Available Coupons 🎁</h1>
      <div className="grid gap-6 md:grid-cols-2">
        {couponsList.map((coupon) => (
          <div
            key={coupon.id}
            className="border rounded-xl p-5 shadow-md bg-white dark:bg-gray-800 dark:text-white"
          >
            <h2 className="text-xl font-semibold mb-2">{coupon.discount}</h2>
            <p className="mb-2">{coupon.description}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Expires: {coupon.expires}
            </p>

            <div className="flex items-center mt-4">
              <code className="bg-gray-100 text-gray-800 px-3 py-1 rounded dark:bg-gray-700 dark:text-white">
                {coupon.code}
              </code>
              <button
                onClick={() => handleCopy(coupon.code)}
                className="ml-3 text-blue-600 hover:text-blue-800"
              >
                {copiedCode === coupon.code ? (
                  <FaCheckCircle className="text-green-500" />
                ) : (
                  <FaCopy />
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Coupons;
