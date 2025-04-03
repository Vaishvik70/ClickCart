import React from "react";

const FeesAndCommission = () => {
  return (
    <section className="py-10 px-6 bg-gray-100 min-h-screen">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-3xl font-bold text-blue-600 mb-4">Fees & Commission</h2>
        <p className="text-gray-700 mb-6">
          Understand our transparent pricing model and how commissions are applied.
        </p>

        <div className="mb-6">
          <h3 className="text-xl font-semibold text-gray-800">Commission Structure</h3>
          <p className="text-gray-600">We charge a commission based on product category and sales volume.</p>
          <ul className="list-disc pl-5 text-gray-600 mt-2">
            <li>Electronics: 5% - 8%</li>
            <li>Fashion & Apparel: 10% - 15%</li>
            <li>Home & Kitchen: 8% - 12%</li>
          </ul>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-semibold text-gray-800">Shipping Fees</h3>
          <p className="text-gray-600">Shipping charges depend on the package weight and destination.</p>
          <ul className="list-disc pl-5 text-gray-600 mt-2">
            <li>Lightweight: ₹30 - ₹50</li>
            <li>Standard: ₹50 - ₹100</li>
            <li>Heavy: ₹100 - ₹250</li>
          </ul>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-semibold text-gray-800">Payment Processing Fees</h3>
          <p className="text-gray-600">A small fee is deducted for online payments processing.</p>
          <ul className="list-disc pl-5 text-gray-600 mt-2">
            <li>UPI & Wallets: 1.5%</li>
            <li>Credit/Debit Cards: 2%</li>
            <li>Net Banking: 1.8%</li>
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-gray-800">Additional Charges</h3>
          <p className="text-gray-600">No hidden charges! Only applicable for premium services.</p>
        </div>
      </div>
    </section>
  );
};

export default FeesAndCommission;
