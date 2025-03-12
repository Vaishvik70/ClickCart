import React, { useEffect, useState } from "react";
import { Client, Databases } from "appwrite";

const client = new Client();
client.setEndpoint("https://cloud.appwrite.io/v1").setProject("67cad786002fe394c8a8");
const databases = new Databases(client);
const DATABASE_ID = "67cad7e600027ac7e8c0";
const COLLECTION_ID = "67d17f5a0025aee3e9f6";

export default function History() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await databases.listDocuments(DATABASE_ID, COLLECTION_ID);
      setOrders(response.documents);
      console.log("Fetched Orders:", response.documents);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Order History</h1>
      {orders.length > 0 ? (
        orders.map((order) => (
          <div key={order.$id} className="border p-4 rounded shadow mb-4">
            <h2 className="text-lg font-semibold">Order ID: {order.$id}</h2>
            <p><strong>Name:</strong> {order.name}</p>
            <p><strong>Address:</strong> {order.address}</p>
            <p><strong>Phone:</strong> {order.phone}</p>
            <p><strong>Date:</strong> {new Date(order.date).toLocaleString()}</p>
            <p><strong>Payment Method:</strong> {order.paymentMethod}</p>
            <p><strong>Total Price:</strong> ₹{order.totalPrice}</p>
            <h3 className="text-md font-semibold mt-2">Products:</h3>
            {order.products.map((item, index) => (
              <div key={index} className="border p-2 rounded mt-2">
                <p><strong>{item.name}</strong> - ₹{item.price} x {item.quantity || 1}</p>
              </div>
            ))}
          </div>
        ))
      ) : (
        <p>No order history found.</p>
      )}
    </div>
  );
}
