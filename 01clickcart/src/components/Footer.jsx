import React from "react";
import Testimonials from "./Testimonials";
import { FaInstagram, FaFacebookF, FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom"; 

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white p-6 mt-10">
      <div className="max-w-7xl mx-auto text-center">
        {/* Navigation Links */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold">Quick Links</h3>
          <div className="flex justify-center space-x-6 mt-3">
            <Link to="/" className="hover:text-blue-400">Home</Link>
            <Link to="/about" className="hover:text-blue-400">About Us</Link>
            <Link to="/contact" className="hover:text-blue-400">Contact Us</Link>
            <Link to="/help" className="hover:text-blue-400">Help</Link>
          </div>
        </div>

        {/* Social Media Links */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold">Connect with Us</h3>
          <div className="flex justify-center space-x-6 mt-3">
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 text-blue-500 hover:text-blue-600">
              <FaFacebookF />
              <span>Facebook</span>
            </a>
            <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 text-blue-400 hover:text-blue-500">
              <FaTwitter />
              <span>Twitter</span>
            </a>
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 text-pink-500 hover:text-pink-600">
              <FaInstagram />
              <span>Instagram</span>
            </a>
          </div>
        </div>

        <p className="mt-6 text-gray-400 text-sm">
          © {new Date().getFullYear()} Click Cart. Created by{" "}
          <span className="text-blue-400 font-semibold">Vaishvik</span>
        </p>
      </div>
      <Testimonials />
    </footer>
  );
};

export default Footer;
