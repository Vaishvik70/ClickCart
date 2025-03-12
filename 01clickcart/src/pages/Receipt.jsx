import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function Receipt() {
  const location = useLocation();
  const navigate = useNavigate();
  const { formData, product, cart, totalPrice } = location.state || {};

  return (
    <div className="p-6 max-w-lg mx-auto border rounded-lg shadow-lg bg-white">
      <h1 className="text-2xl font-bold text-center mb-4">Payment Receipt</h1>
      
      <div className="mb-4">
        <h2 className="text-lg font-semibold">Customer Details</h2>
        <p><strong>Name:</strong> {formData?.name}</p>
        <p><strong>Address:</strong> {formData?.address}</p>
        <p><strong>Phone:</strong> {formData?.phone}</p>
        <p><strong>Payment Method:</strong> {formData?.paymentMethod}</p>
      </div>

      <div className="mb-4">
        <h2 className="text-lg font-semibold">Products Purchased</h2>
        {product ? (
          <div className="border p-2 rounded mb-2">
            <p><strong>{product.name}</strong> - ₹{product.price}</p>
          </div>
        ) : cart ? (
          cart.map((item) => (
            <div key={item.id || item.$id} className="border p-2 rounded mb-2">
              <p><strong>{item.name}</strong> - ₹{item.price} x {item.quantity}</p>
            </div>
          ))
        ) : (
          <p>No products available.</p>
        )}
      </div>
      
      <h2 className="text-xl font-bold">Total Price: ₹{totalPrice}</h2>
      
      <button
        onClick={() => navigate("/dashboard")}
        className="bg-blue-500 text-white py-2 px-4 rounded w-full mt-4"
      >
        Go to Dashboard
      </button>
    </div>
  );
}
