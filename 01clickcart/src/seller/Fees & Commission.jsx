import React from "react";
import { useNavigate } from "react-router-dom";
import { FiArrowLeft, FiPercent, FiTruck, FiCreditCard, FiDollarSign } from "react-icons/fi";

const FeesAndCommission = () => {
  const navigate = useNavigate();

  const feeSections = [
    {
      icon: <FiPercent className="w-5 h-5" />,
      title: "Commission Structure",
      description: "We charge a commission based on product category and sales volume.",
      items: [
        { label: "Electronics", value: "5% - 8%" },
        { label: "Fashion & Apparel", value: "10% - 15%" },
        { label: "Home & Kitchen", value: "8% - 12%" },
        { label: "Books & Media", value: "5% - 7%" },
      ]
    },
    {
      icon: <FiTruck className="w-5 h-5" />,
      title: "Shipping Fees",
      description: "Shipping charges depend on the package weight and destination.",
      items: [
        { label: "Lightweight (<0.5kg)", value: "₹30 - ₹50" },
        { label: "Standard (0.5-2kg)", value: "₹50 - ₹100" },
        { label: "Heavy (2-5kg)", value: "₹100 - ₹250" },
        { label: "Oversized (>5kg)", value: "Custom Quote" },
      ]
    },
    {
      icon: <FiCreditCard className="w-5 h-5" />,
      title: "Payment Processing Fees",
      description: "A small fee is deducted for online payments processing.",
      items: [
        { label: "UPI & Wallets", value: "1.5%" },
        { label: "Credit/Debit Cards", value: "2%" },
        { label: "Net Banking", value: "1.8%" },
        { label: "EMI Payments", value: "2.5%" },
      ]
    },
    {
      icon: <FiDollarSign className="w-5 h-5" />,
      title: "Additional Services",
      description: "Optional premium services to boost your sales.",
      items: [
        { label: "Featured Listing", value: "₹500/week" },
        { label: "Homepage Promotion", value: "₹2000/week" },
        { label: "Email Campaign", value: "₹1000/campaign" },
      ]
    }
  ];

  return (
    <section className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <button
            onClick={() => navigate("/seller-page")}
            className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
          >
            <FiArrowLeft className="mr-2" />
            Back to Seller Dashboard
          </button>
        </div>

        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
            Transparent <span className="text-blue-600">Pricing</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Clear and competitive fees designed to help your business grow
          </p>
        </div>

        <div className="space-y-8">
          {feeSections.map((section, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="bg-blue-100 p-2 rounded-lg mr-4">
                    {section.icon}
                  </div>
                  <h2 className="text-xl font-semibold text-gray-800">{section.title}</h2>
                </div>
                <p className="text-gray-600 mb-4">{section.description}</p>
                
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Category
                        </th>
                        <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Fee
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {section.items.map((item, itemIndex) => (
                        <tr key={itemIndex} className={itemIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                          <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                            {item.label}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 text-right">
                            {item.value}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-blue-50 rounded-xl p-6 text-center">
          <h3 className="text-xl font-semibold text-gray-800 mb-3">Have questions about our fees?</h3>
          <p className="text-gray-600 mb-4">Our seller support team is available 24/7 to help you</p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-md transition-colors shadow-sm">
            Contact Support
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeesAndCommission;