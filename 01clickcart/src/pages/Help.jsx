import React from "react";

const Help = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">Help & Support</h1>
      <p className="text-lg text-gray-700 mb-6">Find answers to common questions and troubleshooting tips.</p>

      {/* FAQ Section */}
      <div className="max-w-3xl w-full bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Frequently Asked Questions</h2>

        <div className="mb-4">
          <h3 className="font-semibold text-gray-900">1. How do I place an order?</h3>
          <p className="text-gray-700">Simply add items to your cart and proceed to checkout.</p>
        </div>

        <div className="mb-4">
          <h3 className="font-semibold text-gray-900">2. What payment methods do you accept?</h3>
          <p className="text-gray-700">We accept credit/debit cards, UPI, and other secure payment options.</p>
        </div>

        <div className="mb-4">
          <h3 className="font-semibold text-gray-900">3. How can I track my order?</h3>
          <p className="text-gray-700">After purchase, you’ll receive an email with a tracking link.</p>
        </div>

        <div className="mb-4">
          <h3 className="font-semibold text-gray-900">4. Can I return or exchange a product?</h3>
          <p className="text-gray-700">Yes, we have a 7-day return policy. Please check our return policy page for details.</p>
        </div>
      </div>

      {/* Contact Support */}
      <div className="mt-6 max-w-3xl w-full bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Still need help?</h2>
        <p className="text-gray-700">If your issue is not listed, contact our support team.</p>
        <p className="text-gray-700 mt-2">
          📧 Email: <a href="mailto:support@clickcart.com" className="text-blue-500 hover:underline">support@clickcart.com</a>
        </p>
        <p className="text-gray-700">
          📞 Phone: <span className="font-semibold">+91 123-456-7890</span>
        </p>
      </div>
    </div>
  );
};

export default Help;
