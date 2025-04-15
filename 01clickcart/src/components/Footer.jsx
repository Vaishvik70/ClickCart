import React from "react";
import Testimonials from "./Testimonials";
import { FaInstagram, FaFacebookF, FaTwitter, FaShoppingBag } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <Testimonials />
      
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <FaShoppingBag className="text-blue-400 text-2xl" />
              <span className="text-xl font-bold text-blue-400">Click Cart</span>
            </div>
            <p className="text-gray-400 text-sm">
              Your one-stop shop for all your needs. Quality products, fast delivery, and excellent customer service.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-blue-400 border-b border-gray-700 pb-2">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-400 hover:text-blue-400 transition-colors">Home</Link></li>
              <li><Link to="/products" className="text-gray-400 hover:text-blue-400 transition-colors">Products</Link></li>
              <li><Link to="/about" className="text-gray-400 hover:text-blue-400 transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-blue-400 transition-colors">Contact Us</Link></li>
              <li><Link to="/faq" className="text-gray-400 hover:text-blue-400 transition-colors">FAQ</Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-blue-400 border-b border-gray-700 pb-2">Customer Service</h3>
            <ul className="space-y-2">
              <li><Link to="/returns" className="text-gray-400 hover:text-blue-400 transition-colors">Returns Policy</Link></li>
              <li><Link to="/shipping" className="text-gray-400 hover:text-blue-400 transition-colors">Shipping Info</Link></li>
              <li><Link to="/privacy" className="text-gray-400 hover:text-blue-400 transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-gray-400 hover:text-blue-400 transition-colors">Terms of Service</Link></li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-blue-400 border-b border-gray-700 pb-2">Connect With Us</h3>
            <div className="flex space-x-4 mb-4">
              <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" 
                className="bg-gray-800 hover:bg-blue-600 text-white p-3 rounded-full transition-colors">
                <FaFacebookF className="text-lg" />
              </a>
              <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" 
                className="bg-gray-800 hover:bg-blue-400 text-white p-3 rounded-full transition-colors">
                <FaTwitter className="text-lg" />
              </a>
              <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" 
                className="bg-gray-800 hover:bg-pink-600 text-white p-3 rounded-full transition-colors">
                <FaInstagram className="text-lg" />
              </a>
            </div>
            <p className="text-gray-400 text-sm">
              Subscribe to our newsletter for the latest updates and offers.
            </p>
            <div className="mt-3 flex">
              <input 
                type="email" 
                placeholder="Your email" 
                className="bg-gray-700 text-white px-4 py-2 rounded-l focus:outline-none focus:ring-1 focus:ring-blue-400 w-full"
              />
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-r transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 pt-8 text-center">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Click Cart. All rights reserved. Designed and developed by{" "}
            <span className="text-blue-400 font-semibold">Vaishvik</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;