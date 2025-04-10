import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Client, Databases, ID } from "appwrite";


const client = new Client();
client.setEndpoint("https://cloud.appwrite.io/v1").setProject("67cad786002fe394c8a8");
const databases = new Databases(client);
const DATABASE_ID = "67cad7e600027ac7e8c0"; // Database ID
const COLLECTION_ID = "67cad7ff0005fc97c570"; // Cart collection ID
const HISTORY_COLLECTION_ID = "67d17f5a0025aee3e9f6"; // History collection ID

// Coupons with types and descriptions
const COUPONS = {
  WELCOME10: { type: "percentage", value: 10, description: "10% off on first order" },
  FREESHIP: { type: "flat", value: 5, description: "Free shipping (₹5 off)" },
  BUY2GET1: { type: "special", value: 0, description: "Buy 2 Get 1 Free (not implemented yet)" },
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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const applyCoupon = () => {
    const code = couponCode.toUpperCase();
    const coupon = COUPONS[code];

    if (!coupon) {
      setAppliedCoupon(null);
      setCouponMessage("❌ Invalid coupon code");
    } else {
      setAppliedCoupon(coupon);
      setCouponMessage(`✅ Coupon applied: ${coupon.description}`);
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
        name: formData?.name,
        paymentMethod: formData?.paymentMethod,
        totalPrice: Math.round(totalPriceAfterDiscount),
        date: new Date().toISOString().slice(0, 12),
        products: JSON.stringify(
          cart?.map((item) => ({
            name: item.name,
            price: calculateFinalPrice(item),
            image: item.image || "",
          })) || []
        ),
      };
      await databases.createDocument(DATABASE_ID, HISTORY_COLLECTION_ID, ID.unique(), orderData);
      console.log("Order saved to history");
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
      console.log("Cart cleared");
    } catch (error) {
      console.error("Error clearing cart:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    alert("Payment Successful!");

    await saveOrderToHistory();

    if (cart) await clearCart();

    navigate("/receipt", {
      state: { formData, product, cart, totalPriceAfterDiscount },
    });
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Payment</h1>

      {product ? (
        <div className="border p-4 rounded shadow mb-4">
          <h2 className="text-lg font-semibold">{product.name}</h2>
          <p>Price: ₹{product.price}</p>
          <p className="text-green-500 font-bold">
            Discounted Price: ₹{calculateFinalPrice(product)}
          </p>
          <img
            src={product.image}
            alt={product.name}
            className="w-32 h-32 object-cover rounded mt-2"
          />
        </div>
      ) : cart ? (
        cart.map((item) => (
          <div key={item.id || item.$id} className="border p-4 rounded shadow mb-2">
            <h2 className="text-lg font-semibold">{item.name}</h2>
            <p>
              Price: ₹{item.price} x {item.quantity}
            </p>
            <p className="text-green-500 font-bold">
              Discounted Price: ₹{calculateFinalPrice(item)} x {item.quantity}
            </p>
            <img
              src={item.image}
              alt={item.name}
              className="w-32 h-32 object-cover rounded mt-2"
            />
          </div>
        ))
      ) : (
        <p>No products selected for payment.</p>
      )}

      <h2 className="text-xl font-bold mt-4">Apply Coupon</h2>
      <div className="flex space-x-2 mb-2">
        <input
          type="text"
          placeholder="Enter coupon code"
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <button
          type="button"
          onClick={applyCoupon}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Apply
        </button>
      </div>
      {couponMessage && <p className="text-sm">{couponMessage}</p>}

      <h2 className="text-xl font-bold mt-4">Final Bill</h2>
      <p className="text-gray-400">Total Before Discount: ₹{totalPriceBeforeDiscount}</p>
      {appliedCoupon && (
        <p className="text-blue-500">Coupon Discount: {appliedCoupon.value}{appliedCoupon.type === "percentage" ? "%" : "₹"}</p>
      )}
      <p className="text-green-500 font-bold">
        Total After Discount: ₹{Math.round(totalPriceAfterDiscount)}
      </p>

      <form onSubmit={handleSubmit} className="space-y-4 mt-4">
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <select
          name="paymentMethod"
          value={formData.paymentMethod}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        >
          <option value="credit_card">Credit Card</option>
          <option value="debit_card">Debit Card</option>
          <option value="paypal">PayPal</option>
          <option value="google_pay">Google Pay</option>
          <option value="paytm">Paytm</option>
        </select>

        {(formData.paymentMethod === "credit_card" ||
          formData.paymentMethod === "debit_card") && (
          <>
            <input
              type="text"
              name="cardNumber"
              placeholder="Card Number"
              value={formData.cardNumber}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
            <input
              type="text"
              name="expiryDate"
              placeholder="Expiry Date (MM/YY)"
              value={formData.expiryDate}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
            <input
              type="text"
              name="cvv"
              placeholder="CVV"
              value={formData.cvv}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </>
        )}

        {(formData.paymentMethod === "google_pay" ||
          formData.paymentMethod === "paytm" ||
          formData.paymentMethod === "paypal") && (
          <input
            type="text"
            name="upiId"
            placeholder="UPI ID"
            value={formData.upiId}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        )}

        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded w-full"
        >
          Proceed to Pay
        </button>
      </form>
    </div>
  );
}
