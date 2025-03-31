import React, { useState, useEffect } from "react";
import { account, databases, ID } from "../appwrite/appwrite";

const SellerDashboard = () => {
  const [seller, setSeller] = useState(null);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [earnings, setEarnings] = useState(0);

  useEffect(() => {
    fetchSellerData();
    fetchProducts();
    fetchOrders();
  }, []);

  const fetchSellerData = async () => {
    try {
      const user = await account.get();
      setSeller(user);
    } catch (error) {
      console.error("Error fetching seller data:", error);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await databases.listDocuments("DATABASE_ID", "PRODUCT_COLLECTION_ID");
      setProducts(response.documents);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const fetchOrders = async () => {
    try {
      const response = await databases.listDocuments("DATABASE_ID", "ORDER_COLLECTION_ID");
      setOrders(response.documents);
      calculateEarnings(response.documents);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const calculateEarnings = (orders) => {
    const totalEarnings = orders.reduce((sum, order) => sum + order.totalPrice, 0);
    setEarnings(totalEarnings);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-5">
      <h1 className="text-2xl font-bold mb-4">Welcome, {seller?.name || "Seller"}!</h1>
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-bold">Your Products</h2>
          <p>{products.length} Listed Products</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-bold">Your Orders</h2>
          <p>{orders.length} Orders Received</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-bold">Total Earnings</h2>
          <p>${earnings.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
};

export default SellerDashboard;
