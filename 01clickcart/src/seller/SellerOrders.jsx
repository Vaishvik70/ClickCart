import React from "react";
import { useNavigate } from "react-router-dom";

const SellerOrders = () => {
  const navigate = useNavigate();

  const mockOrders = [
    {
      id: "ORD123456",
      customer: "John Doe",
      date: "2025-04-06",
      status: "Delivered",
      total: 1299,
      products: [
        { name: "Wireless Mouse", quantity: 2 },
        { name: "Keyboard", quantity: 1 },
      ],
    },
    {
      id: "ORD123457",
      customer: "Jane Smith",
      date: "2025-04-05",
      status: "Processing",
      total: 899,
      products: [
        { name: "Laptop Stand", quantity: 1 },
      ],
    },
    {
      id: "ORD123458",
      customer: "Mike Johnson",
      date: "2025-04-03",
      status: "Shipped",
      total: 1599,
      products: [
        { name: "Gaming Headset", quantity: 1 },
        { name: "Mousepad", quantity: 3 },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-5xl mx-auto bg-white p-6 rounded shadow">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Seller Orders</h2>
          <button
            onClick={() => navigate("/seller-dashboard")}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Back to Dashboard
          </button>
        </div>

        <table className="min-w-full text-left border">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-2">Order ID</th>
              <th className="px-4 py-2">Customer</th>
              <th className="px-4 py-2">Date</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Total</th>
            </tr>
          </thead>
          <tbody>
            {mockOrders.map((order) => (
              <React.Fragment key={order.id}>
                <tr className="border-t hover:bg-gray-50">
                  <td className="px-4 py-2">{order.id}</td>
                  <td className="px-4 py-2">{order.customer}</td>
                  <td className="px-4 py-2">{order.date}</td>
                  <td className="px-4 py-2">
                    <span
                      className={`px-2 py-1 text-sm font-medium rounded ${
                        order.status === "Delivered"
                          ? "bg-green-200 text-green-800"
                          : order.status === "Processing"
                          ? "bg-yellow-200 text-yellow-800"
                          : "bg-blue-200 text-blue-800"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="px-4 py-2 font-semibold">₹{order.total}</td>
                </tr>

                <tr className="bg-gray-50 border-b">
                  <td colSpan="5" className="px-4 py-2 text-sm text-gray-700">
                    <strong>Products Ordered:</strong>
                    <ul className="list-disc list-inside mt-1">
                      {order.products.map((product, index) => (
                        <li key={index}>
                          {product.name} × {product.quantity}
                        </li>
                      ))}
                    </ul>
                  </td>
                </tr>
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SellerOrders;
