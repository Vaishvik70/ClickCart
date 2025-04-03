import React, { useEffect, useState } from "react";
import { account, databases } from "../appwrite/appwriteConfig";
import { FiBox, FiShoppingCart, FiDollarSign, FiTrendingUp } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

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

        if (userData.prefs.role !== "seller") {
          alert("Unauthorized: Access restricted to sellers.");
          //navigate("/seller-login");
          return;
        }

        const products = await databases.listDocuments("your_database_id", "products_collection_id", [
          { field: "sellerId", operator: "equal", value: userData.$id }
        ]);
        setTotalProducts(products.total);

        const orders = await databases.listDocuments("your_database_id", "orders_collection_id", [
          { field: "sellerId", operator: "equal", value: userData.$id }
        ]);
        setTotalOrders(orders.total);

        const earnings = orders.documents.reduce((total, order) => {
          const orderDate = new Date(order.createdAt);
          const weekAgo = new Date();
          weekAgo.setDate(weekAgo.getDate() - 7);
          return orderDate >= weekAgo ? total + order.totalPrice : total;
        }, 0);

        setTotalEarnings(earnings);
      } catch (error) {
        console.error("Error fetching seller data:", error);
      }
    };

    fetchSellerData();
  }, [navigate]);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="bg-gray-900 text-white w-64 p-6">
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
      <main className="flex-1 p-8">
        <h2 className="text-3xl font-bold mb-6">Welcome, {seller?.name}!</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-blue-600 p-6 rounded-lg text-white flex items-center gap-4 shadow-lg">
            <FiBox size={40} />
            <div>
              <h3 className="text-lg">Total Products</h3>
              <p className="text-2xl font-bold">{totalProducts}</p>
            </div>
          </div>

          <div className="bg-green-600 p-6 rounded-lg text-white flex items-center gap-4 shadow-lg">
            <FiShoppingCart size={40} />
            <div>
              <h3 className="text-lg">Total Orders</h3>
              <p className="text-2xl font-bold">{totalOrders}</p>
            </div>
          </div>

          <div className="bg-yellow-600 p-6 rounded-lg text-white flex items-center gap-4 shadow-lg">
            <FiDollarSign size={40} />
            <div>
              <h3 className="text-lg">Earnings This Week</h3>
              <p className="text-2xl font-bold">₹{totalEarnings}</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SellerDashboard;
