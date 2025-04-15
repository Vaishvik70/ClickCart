import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  FiArrowLeft, 
  FiUserPlus, 
  FiPackage, 
  FiShoppingBag, 
  FiDollarSign,
  FiMail,
  FiHelpCircle,
  FiPhone,
  FiMessageSquare,
  FiClock
} from 'react-icons/fi';

const SellerHelpPage = () => {
  const navigate = useNavigate();

  const helpTopics = [
    {
      icon: <FiUserPlus className="w-5 h-5" />,
      title: "Getting Started as a Seller",
      description: "Learn how to register and set up your seller account",
      link: "/seller-register",
      linkText: "Registration Guide"
    },
    {
      icon: <FiPackage className="w-5 h-5" />,
      title: "Product Management",
      description: "How to add, edit, and manage your product listings",
      link: "/seller-dashboard",
      linkText: "Product Dashboard"
    },
    {
      icon: <FiShoppingBag className="w-5 h-5" />,
      title: "Order Processing",
      description: "Complete guide to managing and fulfilling orders",
      link: "/seller-orders",
      linkText: "Order Management"
    },
    {
      icon: <FiDollarSign className="w-5 h-5" />,
      title: "Payments & Earnings",
      description: "Understand payment schedules, fees, and withdrawals",
      link: "/seller-earnings",
      linkText: "Earnings Portal"
    },
    {
      icon: <FiMessageSquare className="w-5 h-5" />,
      title: "Seller Policies",
      description: "Review our terms, conditions, and best practices",
      link: "/seller-policies",
      linkText: "View Policies"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <button
            onClick={() => navigate("/seller-dashboard")}
            className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
          >
            <FiArrowLeft className="mr-2" />
            Back to Dashboard
          </button>
        </div>

        <div className="text-center mb-12">
          <div className="bg-blue-100 p-3 rounded-full inline-block mb-4">
            <FiHelpCircle className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
            Seller <span className="text-blue-600">Support Center</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Find answers to common questions and get help with your seller account
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {helpTopics.map((topic, index) => (
            <div 
              key={index}
              className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start">
                <div className="bg-blue-50 p-2 rounded-lg mr-4">
                  {topic.icon}
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{topic.title}</h3>
                  <p className="text-gray-600 mb-3">{topic.description}</p>
                  <Link 
                    to={topic.link} 
                    className="text-blue-600 hover:text-blue-800 font-medium flex items-center"
                  >
                    {topic.linkText}
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 md:p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Support</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <div className="flex items-center mb-4">
                  <div className="bg-blue-50 p-2 rounded-full mr-3">
                    <FiMail className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Email Support</h3>
                    <p className="text-gray-600">For detailed inquiries</p>
                  </div>
                </div>
                <a 
                  href="mailto:support@clickcart.com" 
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  support@clickcart.com
                </a>
              </div>

              <div>
                <div className="flex items-center mb-4">
                  <div className="bg-blue-50 p-2 rounded-full mr-3">
                    <FiPhone className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Phone Support</h3>
                    <p className="text-gray-600">For urgent matters</p>
                  </div>
                </div>
                <p className="text-gray-900 font-medium">+91 98765 43210</p>
              </div>

              <div className="md:col-span-2">
                <div className="flex items-center mb-4">
                  <div className="bg-blue-50 p-2 rounded-full mr-3">
                    <FiClock className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Support Hours</h3>
                    <p className="text-gray-600">We're here to help</p>
                  </div>
                </div>
                <p className="text-gray-700">
                  Monday - Friday: 9:00 AM to 8:00 PM<br />
                  Saturday: 10:00 AM to 6:00 PM<br />
                  Sunday: Closed
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 bg-blue-50 rounded-lg p-6 text-center">
          <h3 className="text-xl font-semibold text-gray-900 mb-3">Still need help?</h3>
          <p className="text-gray-600 mb-4">Visit our comprehensive <Link to="/seller-faq" className="text-blue-600 font-medium">FAQ section</Link> for more answers</p>
          <button 
            onClick={() => navigate("/contact-support")}
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-md font-medium transition-colors"
          >
            Contact Support Team
          </button>
        </div>
      </div>
    </div>
  );
};

export default SellerHelpPage;