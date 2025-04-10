import React, { useEffect, useState } from "react";
import { Client, Databases } from "appwrite";

const client = new Client();
client.setEndpoint("https://cloud.appwrite.io/v1")
      .setProject("67cad786002fe394c8a8");
const databases = new Databases(client);
const DATABASE_ID = "67cad7e600027ac7e8c0";// Database ID
const COLLECTION_ID = "67d17f5a0025aee3e9f6"; // History Collection ID

export default function History() {
  const [orders, setOrders] = useState([]);
  const [bestSellers, setBestSellers] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await databases.listDocuments(DATABASE_ID, COLLECTION_ID);
      const formattedOrders = response.documents
        .map((order) => ({
          ...order,
          products: JSON.parse(order.products || "[]"),
          date: order.date ? new Date(order.date).toLocaleString() : "N/A",
        }))
        .sort((a, b) => new Date(b.date) - new Date(a.date));

      setOrders(formattedOrders);
      findBestSellers(formattedOrders);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const deleteOrder = async (orderId) => {
    try {
      await databases.deleteDocument(DATABASE_ID, COLLECTION_ID, orderId);
      setOrders((prevOrders) => prevOrders.filter((order) => order.$id !== orderId));
      alert("Order deleted successfully!");
    } catch (error) {
      console.error("Error deleting order:", error);
      alert("Failed to delete order.");
    }
  };

  const findBestSellers = (orders) => {
    const productCount = {};

    orders.forEach((order) => {
      order.products.forEach((product) => {
        if (productCount[product.name]) {
          productCount[product.name].count += product.quantity || 1;
        } else {
          productCount[product.name] = { ...product, count: product.quantity || 1 };
        }
      });
    });

    const sortedBestSellers = Object.values(productCount).sort((a, b) => b.count - a.count);
    setBestSellers(sortedBestSellers.slice(0, 5)); // Show top 5 best-selling products
  };

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Order History</h1>
      {orders.length > 0 ? (
        orders.map((order) => (
          <div key={order.$id} className="border p-4 rounded shadow mb-6">
            <h2 className="text-lg font-semibold">Order ID: {order.$id}</h2>
            <p><strong>Name:</strong> {order.name}</p>
            <p><strong>Address:</strong> {order.address}</p>
            <p><strong>Phone:</strong> {order.phone}</p>
            <p><strong>Date:</strong> {order.date}</p>
            <p><strong>Payment Method:</strong> {order.paymentMethod}</p>
            <p><strong>Total Price:</strong> ₹{order.totalPrice}</p>

            <h3 className="text-md font-semibold mt-3">Products:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
              {order.products.length > 0 ? (
                order.products.map((item, index) => (
                  <div key={index} className="border p-3 rounded flex items-center gap-4">
                    {item.image && (
                      <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
                    )}
                    <div>
                      <p><strong>{item.name}</strong></p>
                      <p>₹{item.price} x {item.quantity || 1}</p>
                      <p><strong>Status:</strong> {item.status || "Pending"}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p>No products found for this order.</p>
              )}
            </div>

            <button 
              onClick={() => deleteOrder(order.$id)}
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Delete History
            </button>
          </div>
        ))
      ) : (
        <p>No order history found.</p>
      )}

      {/* Best Selling Products Section */}
      {bestSellers.length > 0 && (
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4">Best Selling Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {bestSellers.map((product, index) => (
              <div key={index} className="border p-3 rounded flex items-center gap-4">
                {product.image && (
                  <img src={product.image} alt={product.name} className="w-16 h-16 object-cover rounded" />
                )}
                <div>
                  <p><strong>{product.name}</strong></p>
                  <p>₹{product.price}</p>
                  <p><strong>Sold:</strong> {product.count}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
