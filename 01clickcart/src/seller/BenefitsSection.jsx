import React from "react";

const BenefitsSection = () => {
    return (
      <section className="py-10 bg-gray-100 text-center">
        <h2 className="text-3xl font-bold text-gray-900">Why Sell with Click Cart?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-6 px-4">
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-xl font-semibold">Massive Customer Base</h3>
            <p>Reach millions of potential buyers across the country.</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-xl font-semibold">Fast & Secure Payments</h3>
            <p>Receive payments within 7 days, ensuring financial security.</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-xl font-semibold">Low Selling Fees</h3>
            <p>Enjoy competitive commission rates and maximize your profits.</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-xl font-semibold">24/7 Seller Support</h3>
            <p>Get expert assistance whenever you need it.</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-xl font-semibold">Marketing & Promotions</h3>
            <p>Leverage our promotional campaigns to boost your sales.</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-xl font-semibold">Seamless Logistics</h3>
            <p>Easy shipping solutions with doorstep pickup and delivery.</p>
          </div>
        </div>
      </section>
    );
  };

export default BenefitsSection