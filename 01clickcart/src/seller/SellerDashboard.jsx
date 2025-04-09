import React, { useEffect, useState } from "react";
import { account, databases } from "../appwrite/appwriteConfig";
import { FiBox, FiShoppingCart, FiDollarSign, FiTrendingUp } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { Query } from "appwrite";

const DATABASE_ID = "67cad7e600027ac7e8c0";
const PRODUCTS_COLLECTION_ID = "67ea560f00044ac3e66b";
const ORDERS_COLLECTION_ID = "67ea56160033576d12e8";

const SellerDashboard = () => {
  const [seller, setSeller] = useState(null);
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalEarnings, setTotalEarnings] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSellerData = async () => {
      try {
        const userData = await account.get();
        setSeller(userData);

        const products = await databases.listDocuments(
          DATABASE_ID,
          PRODUCTS_COLLECTION_ID,
          [Query.equal("sellerId", userData.$id)]
        );
        setTotalProducts(products.total);

        const orders = await databases.listDocuments(
          DATABASE_ID,
          ORDERS_COLLECTION_ID,
          [Query.equal("sellerId", userData.$id)]
        );
        setTotalOrders(orders.total);

        const earnings = orders.documents.reduce((total, order) => {
          const orderDate = new Date(order.$createdAt);
          const weekAgo = new Date();
          weekAgo.setDate(weekAgo.getDate() - 7);
          return orderDate >= weekAgo ? total + order.totalPrice : total;
        }, 0);

        setTotalEarnings(earnings);
      } catch (error) {
        console.error("Error fetching seller data:", error);
        setSeller(null);
      }
    };

    fetchSellerData();
  }, [navigate]);

  return (
    <div className="min-h-screen bg-[#f5f5f5] flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="bg-gray-600 text-white w-full md:w-64 p-6">
        <h2 className="text-2xl font-bold mb-6">Seller Dashboard</h2>
        <ul className="space-y-4">
          <li className="hover:bg-gray-700 p-2 rounded-lg">
            <a href="/seller-dashboard" className="flex items-center gap-2">
              <FiTrendingUp /> Dashboard
            </a>
          </li>
          <li className="hover:bg-gray-700 p-2 rounded-lg">
            <a href="/add-product" className="flex items-center gap-2">
              <FiBox /> Add Product
            </a>
          </li>
          <li className="hover:bg-gray-700 p-2 rounded-lg">
            <a href="/my-products" className="flex items-center gap-2">
              <FiBox /> My Products
            </a>
          </li>
          <li className="hover:bg-gray-700 p-2 rounded-lg">
            <a href="/seller-orders" className="flex items-center gap-2">
              <FiShoppingCart /> Orders
            </a>
          </li>
          <li className="hover:bg-gray-700 p-2 rounded-lg">
            <a href="/seller-earnings" className="flex items-center gap-2">
              <FiDollarSign /> Earnings
            </a>
          </li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        <h2 className="text-3xl font-bold mb-6">Welcome, {seller?.name || "Seller"}!</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <div className="bg-blue-600 rounded-xl p-6 text-white shadow-md flex flex-col items-center justify-center">
            <FiBox size={36} className="mb-2" />
            <p className="text-lg">Total Products</p>
            <p className="text-3xl font-bold mt-1">{totalProducts}</p>
          </div>

          <div className="bg-green-600 rounded-xl p-6 text-white shadow-md flex flex-col items-center justify-center">
            <FiShoppingCart size={36} className="mb-2" />
            <p className="text-lg">Total Orders</p>
            <p className="text-3xl font-bold mt-1">{totalOrders}</p>
          </div>

          <div className="bg-yellow-600 rounded-xl p-6 text-white shadow-md flex flex-col items-center justify-center">
            <FiDollarSign size={36} className="mb-2" />
            <p className="text-lg">Earnings This Week</p>
            <p className="text-3xl font-bold mt-1">₹{totalEarnings}</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SellerDashboard;
