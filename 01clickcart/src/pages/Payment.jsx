import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Client, Databases, ID } from "appwrite";

const client = new Client();
client.setEndpoint("https://cloud.appwrite.io/v1").setProject("67cad786002fe394c8a8");
const databases = new Databases(client);
const DATABASE_ID = "67cad7e600027ac7e8c0";
const COLLECTION_ID = "67cad7ff0005fc97c570"; // Cart collection ID
const HISTORY_COLLECTION_ID = "67d17f5a0025aee3e9f6";

const COUPONS = {
  WELCOME10: { type: "percentage", value: 10, description: "10% off on first order" },
  FREESHIP: { type: "flat", value: 5, description: "Free shipping (₹5 off)" },
  BUY2GET1: { type: "special", value: 0, description: "Buy 2 Get 1 Free" },
  PAY20: { type: "flat", value: 20, description: "₹20 off with Paypal" },
  SUMMER25: { type: "percentage", value: 25, description: "25% Summer Sale" },
  CLICKFEST50: { type: "flat", value: 50, description: "Flat ₹50 off above ₹1000" },
  NEWUSER100: { type: "flat", value: 100, description: "₹100 off for new users" },
  EXTRA5: { type: "percentage", value: 5, description: "Extra 5% off for prepaid" },
};

export default function Payment() {
  const navigate = useNavigate();
  const location = useLocation();
  const { product, cart } = location.state || {};

  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phone: "",
    paymentMethod: "credit_card",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    upiId: "",
  });

  const [couponCode, setCouponCode] = useState("");
  const [couponMessage, setCouponMessage] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const applyCoupon = () => {
    const code = couponCode.toUpperCase().trim();
    if (!code) {
      setCouponMessage("Please enter a coupon code");
      return;
    }

    const coupon = COUPONS[code];
    if (!coupon) {
      setAppliedCoupon(null);
      setCouponMessage("Invalid coupon code");
    } else {
      setAppliedCoupon(coupon);
      setCouponMessage(`Applied: ${coupon.description}`);
    }
  };

  const calculateFinalPrice = (item) => {
    const base = item.price - (item.price * (item.discount || 0)) / 100;
    if (!appliedCoupon) return base;

    if (appliedCoupon.type === "percentage") {
      return base - (base * appliedCoupon.value) / 100;
    } else if (appliedCoupon.type === "flat") {
      return Math.max(0, base - appliedCoupon.value);
    }
    return base;
  };

  const totalPriceBeforeDiscount = product
    ? product.price
    : cart?.reduce((total, item) => total + item.price * item.quantity, 0) || 0;

  const totalPriceAfterDiscount = product
    ? calculateFinalPrice(product)
    : cart?.reduce((total, item) => total + calculateFinalPrice(item) * item.quantity, 0) || 0;

  const saveOrderToHistory = async () => {
    try {
      const orderData = {
        name: formData.name,
        paymentMethod: formData.paymentMethod,
        totalPrice: Math.round(totalPriceAfterDiscount),
        date: new Date().toISOString(),
        products: JSON.stringify(
          cart?.map((item) => ({
            name: item.name,
            price: calculateFinalPrice(item),
            quantity: item.quantity,
            image: item.image || "",
          })) || [product]
        ),
      };
      await databases.createDocument(DATABASE_ID, HISTORY_COLLECTION_ID, ID.unique(), orderData);
    } catch (error) {
      console.error("Error saving order:", error);
    }
  };

  const clearCart = async () => {
    try {
      const response = await databases.listDocuments(DATABASE_ID, COLLECTION_ID);
      const deletePromises = response.documents.map((doc) =>
        databases.deleteDocument(DATABASE_ID, COLLECTION_ID, doc.$id)
      );
      await Promise.all(deletePromises);
    } catch (error) {
      console.error("Error clearing cart:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);
    
    try {
      await saveOrderToHistory();
      if (cart) await clearCart();
      
      navigate("/receipt", {
        state: { 
          formData, 
          product, 
          cart, 
          totalPriceAfterDiscount,
          coupon: appliedCoupon 
        },
      });
    } catch (error) {
      console.error("Payment error:", error);
      alert("Payment failed. Please try again.");
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          {/* Header */}
          <div className="bg-blue-600 px-6 py-4">
            <h1 className="text-2xl font-bold text-white">Checkout</h1>
          </div>

          {/* Order Summary */}
          <div className="p-6 border-b">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            
            {product ? (
              <div className="flex flex-col sm:flex-row gap-4 p-4 bg-gray-50 rounded-lg mb-4">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-24 h-24 object-contain rounded-md"
                />
                <div className="flex-1">
                  <h3 className="font-medium">{product.name}</h3>
                  <div className="flex justify-between mt-2">
                    <span className="text-gray-500">Price:</span>
                    <span>₹{product.price.toFixed(2)}</span>
                  </div>
                  {product.discount > 0 && (
                    <div className="flex justify-between">
                      <span className="text-gray-500">Discount:</span>
                      <span className="text-green-600">{product.discount}% off</span>
                    </div>
                  )}
                  <div className="flex justify-between font-medium mt-1">
                    <span className="text-gray-700">Final Price:</span>
                    <span className="text-blue-600">₹{calculateFinalPrice(product).toFixed(2)}</span>
                  </div>
                </div>
              </div>
            ) : cart ? (
              <div className="space-y-4">
                {cart.map((item) => (
                  <div key={item.id || item.$id} className="flex flex-col sm:flex-row gap-4 p-4 bg-gray-50 rounded-lg">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-24 h-24 object-contain rounded-md"
                    />
                    <div className="flex-1">
                      <h3 className="font-medium">{item.name}</h3>
                      <div className="grid grid-cols-2 gap-2 mt-2">
                        <div>
                          <span className="text-gray-500">Price:</span>
                          <span> ₹{item.price.toFixed(2)}</span>
                        </div>
                        <div>
                          <span className="text-gray-500">Qty:</span>
                          <span> {item.quantity}</span>
                        </div>
                        {item.discount > 0 && (
                          <div>
                            <span className="text-gray-500">Discount:</span>
                            <span className="text-green-600"> {item.discount}%</span>
                          </div>
                        )}
                        <div className="font-medium">
                          <span className="text-gray-700">Total:</span>
                          <span className="text-blue-600"> ₹{(calculateFinalPrice(item) * item.quantity).toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No items in your order</p>
            )}
          </div>

          {/* Coupon Section */}
          <div className="p-6 border-b">
            <h2 className="text-xl font-semibold mb-4">Apply Coupon</h2>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                placeholder="Enter coupon code"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />
              <button
                type="button"
                onClick={applyCoupon}
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Apply
              </button>
            </div>
            {couponMessage && (
              <p className={`mt-2 text-sm ${couponMessage.includes("Invalid") ? "text-red-500" : "text-green-600"}`}>
                {couponMessage}
              </p>
            )}
          </div>

          {/* Payment Summary */}
          <div className="p-6 border-b">
            <h2 className="text-xl font-semibold mb-4">Payment Summary</h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal:</span>
                <span>₹{totalPriceBeforeDiscount.toFixed(2)}</span>
              </div>
              {appliedCoupon && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Coupon Discount:</span>
                  <span className="text-green-600">
                    -₹{appliedCoupon.type === "percentage" 
                      ? ((totalPriceBeforeDiscount * appliedCoupon.value) / 100).toFixed(2)
                      : appliedCoupon.value.toFixed(2)}
                  </span>
                </div>
              )}
              <div className="flex justify-between font-medium text-lg mt-2 pt-2 border-t">
                <span>Total Amount:</span>
                <span className="text-blue-600">₹{Math.round(totalPriceAfterDiscount).toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Payment Form */}
          <form onSubmit={handleSubmit} className="p-6">
            <h2 className="text-xl font-semibold mb-4">Payment Details</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 mb-1">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  required
                />
              </div>
              
              <div>
                <label className="block text-gray-700 mb-1">Address</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  required
                />
              </div>
              
              <div>
                <label className="block text-gray-700 mb-1">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  required
                />
              </div>
              
              <div>
                <label className="block text-gray-700 mb-1">Payment Method</label>
                <select
                  name="paymentMethod"
                  value={formData.paymentMethod}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                >
                  <option value="credit_card">Credit Card</option>
                  <option value="debit_card">Debit Card</option>
                  <option value="paypal">PayPal</option>
                  <option value="google_pay">Google Pay</option>
                  <option value="paytm">Paytm</option>
                </select>
              </div>

              {/* Card Details */}
              {(formData.paymentMethod === "credit_card" || formData.paymentMethod === "debit_card") && (
                <div className="space-y-4 bg-gray-50 p-4 rounded-lg">
                  <div>
                    <label className="block text-gray-700 mb-1">Card Number</label>
                    <input
                      type="text"
                      name="cardNumber"
                      placeholder="1234 5678 9012 3456"
                      value={formData.cardNumber}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-700 mb-1">Expiry Date</label>
                      <input
                        type="text"
                        name="expiryDate"
                        placeholder="MM/YY"
                        value={formData.expiryDate}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-1">CVV</label>
                      <input
                        type="text"
                        name="cvv"
                        placeholder="123"
                        value={formData.cvv}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                        required
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* UPI Details */}
              {(formData.paymentMethod === "google_pay" || 
                formData.paymentMethod === "paytm" || 
                formData.paymentMethod === "paypal") && (
                <div className="bg-gray-50 p-4 rounded-lg">
                  <label className="block text-gray-700 mb-1">UPI ID</label>
                  <input
                    type="text"
                    name="upiId"
                    placeholder="username@upi"
                    value={formData.upiId}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    required
                  />
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={isProcessing}
              className={`w-full mt-6 py-3 px-4 rounded-lg font-medium text-white ${isProcessing ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'} transition-colors`}
            >
              {isProcessing ? 'Processing...' : `Pay ₹${Math.round(totalPriceAfterDiscount).toFixed(2)}`}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}