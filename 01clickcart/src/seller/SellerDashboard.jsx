import React, { useEffect, useState } from "react";
import { account, databases } from "../appwrite/appwriteConfig";
import { FiBox, FiShoppingCart, FiDollarSign, FiTrendingUp } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { Query } from "appwrite";

const DATABASE_ID = "67cad7e600027ac7e8c0"; 
const SELLER_COLLECTION_ID = "67ea22e3000a9c49cd04"; 
const PRODUCTS_COLLECTION_ID = "67ea560f00044ac3e66b";
const ORDERS_COLLECTION_ID = "67ea56160033576d12e8";

const SellerDashboard = () => {
  const [seller, setSeller] = useState(null);
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalEarnings, setTotalEarnings] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isSellerRegistered, setIsSellerRegistered] = useState(true); // Track if the seller is registered
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSellerData = async () => {
      try {
        // checks if the seller is logged in
        const userData = await account.get();
        setSeller(userData);

        // Check if the seller exists in the "seller" collection
        const sellerData = await databases.listDocuments(
          DATABASE_ID,
          SELLER_COLLECTION_ID,
          [Query.equal("userId", userData.$id)] 
        );

        if (sellerData.total === 0) {
          // Seller is not found in the seller collection
          setIsSellerRegistered(false);
          return;
        }

        // Fetch seller's products
        const products = await databases.listDocuments(
          DATABASE_ID,
          PRODUCTS_COLLECTION_ID,
          [Query.equal("sellerId", userData.$id)]
        );
        setTotalProducts(products.total);

        // Fetch seller's orders
        const orders = await databases.listDocuments(
          DATABASE_ID,
          ORDERS_COLLECTION_ID,
          [Query.equal("sellerId", userData.$id)]
        );
        setTotalOrders(orders.total);

        // Calculate earnings 
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
        setIsSellerRegistered(false);
      } finally {
        setLoading(false);
      }
    };

    fetchSellerData();
  }, [navigate]);

  const handleGoBackToSellerPage = () => {
    navigate("/seller-page");
  };

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

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
            <a href="/add-product" className={`flex items-center gap-2 ${!isSellerRegistered ? "text-gray-500 cursor-not-allowed" : ""}`} disabled={!isSellerRegistered}>
              <FiBox /> Add Product
            </a>
          </li>
          <li className="hover:bg-gray-700 p-2 rounded-lg">
            <a href="/my-products" className={`flex items-center gap-2 ${!isSellerRegistered ? "text-gray-500 cursor-not-allowed" : ""}`} disabled={!isSellerRegistered}>
              <FiBox /> My Products
            </a>
          </li>
          <li className="hover:bg-gray-700 p-2 rounded-lg">
            <a href="/seller-orders" className={`flex items-center gap-2 ${!isSellerRegistered ? "text-gray-500 cursor-not-allowed" : ""}`} disabled={!isSellerRegistered}>
              <FiShoppingCart /> Orders
            </a>
          </li>
          <li className="hover:bg-gray-700 p-2 rounded-lg">
            <a href="/seller-earnings" className={`flex items-center gap-2 ${!isSellerRegistered ? "text-gray-500 cursor-not-allowed" : ""}`} disabled={!isSellerRegistered}>
              <FiDollarSign /> Earnings
            </a>
          </li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        <h2 className="text-3xl font-bold mb-6">Welcome, {seller?.name || "Seller"}!</h2>

        {isSellerRegistered ? (
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
        ) : (
          <div className="text-center mt-8">
            <p className="text-xl text-red-600">You are not registered as a seller.</p>
            <button
              onClick={handleGoBackToSellerPage}
              className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
            >
              Go Back to Home Page
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default SellerDashboard;
