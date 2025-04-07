import React, { useState } from "react";
import { FaCopy, FaCheckCircle } from "react-icons/fa";

const couponsList = [
  {
    id: 1,
    code: "CLICK10",
    discount: "10% Off",
    description: "Get 10% off on all products.",
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
    code: "SELLER50",
    discount: "50% Off (Seller Special)",
    description: "Special offer for sellers - 50% discount on fees.",
    expires: "2025-08-15",
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
