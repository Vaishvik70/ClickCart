import React from "react";
import { Link } from "react-router-dom";

const SellerHelpPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-3xl">
        <h2 className="text-3xl font-bold text-center mb-6">Seller Help & Support</h2>
        
        <div className="space-y-4">
          <div>
            <h3 className="text-xl font-semibold">1. How to Register as a Seller?</h3>
            <p>Go to the <Link to="/seller-register" className="text-blue-600">Seller Registration</Link> page and fill in your details.</p>
          </div>

          <div>
            <h3 className="text-xl font-semibold">2. How to Add Products?</h3>
            <p>Once logged in, go to your <Link to="/seller-dashboard" className="text-blue-600">Add Product</Link> and use the "Add Product" button.</p>
          </div>

          <div>
            <h3 className="text-xl font-semibold">3. How to Manage Orders?</h3>
            <p>Orders can be managed from the <Link to="/seller-orders" className="text-blue-600">Order Management</Link> section in your dashboard.</p>
          </div>

          <div>
            <h3 className="text-xl font-semibold">4. Payment & Earnings</h3>
            <p>Earnings and withdrawals can be accessed from the <Link to="/seller-earnings" className="text-blue-600">Earnings</Link> page.</p>
          </div>

          <div>
            <h3 className="text-xl font-semibold">5. Need Further Assistance?</h3>
            <p>Contact our support team at <span className="font-semibold">support@clickcart.com</span> or visit our <Link to="/contact-us" className="text-blue-600">Contact Us</Link> page.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerHelpPage;
