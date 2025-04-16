import React, { useEffect, useState } from "react";
import { Client, Databases, Account, Query } from "appwrite";

const client = new Client();
client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("67cad786002fe394c8a8");
const databases = new Databases(client);
const DATABASE_ID = "67cad7e600027ac7e8c0"; // Database ID
const COLLECTION_ID = "67d17f5a0025aee3e9f6"; // History Collection ID

const account = new Account(client);

export default function History() {
  const [orders, setOrders] = useState([]);
  const [bestSellers, setBestSellers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const user = await account.get();
        const userId = user.$id;
  
        const response = await databases.listDocuments(
          DATABASE_ID,
          COLLECTION_ID,
          [Query.equal("userId", userId)]
        );
  
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
        setError("Failed to load orders. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
  
    fetchOrders();
  }, []);

  const deleteOrder = async (orderId) => {
    if (!window.confirm("Are you sure you want to delete this order?")) return;
    
    try {
      await databases.deleteDocument(DATABASE_ID, COLLECTION_ID, orderId);
      setOrders((prevOrders) => prevOrders.filter((order) => order.$id !== orderId));
      // Recalculate best sellers after deletion
      findBestSellers(orders.filter((order) => order.$id !== orderId));
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
    setBestSellers(sortedBestSellers.slice(0, 5));
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative max-w-md mx-auto">
          <strong className="font-bold">Error!</strong>
          <span className="block sm:inline"> {error}</span>
          <button 
            onClick={fetchOrders}
            className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded text-sm"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Order History
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
            View and manage your customer orders
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Orders Section */}
          <div className="lg:col-span-2 space-y-6">
            {orders.length > 0 ? (
              orders.map((order) => (
                <div
                  key={order.$id}
                  className="bg-white shadow overflow-hidden rounded-lg transition-all hover:shadow-lg"
                >
                  <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                      <div>
                        <h3 className="text-lg leading-6 font-medium text-gray-900">
                          Order #{order.$id.slice(0, 8)}
                        </h3>
                        <p className="mt-1 text-sm text-gray-500">
                          Placed on {order.date}
                        </p>
                      </div>
                      <div className="mt-2 sm:mt-0">
                        <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          Completed
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="px-4 py-5 sm:p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <h4 className="text-sm font-medium text-gray-500">
                          Customer Information
                        </h4>
                        <div className="mt-1 text-sm text-gray-900 space-y-1">
                          <p>{order.name}</p>
                          <p>{order.address}</p>
                          <p>{order.phone}</p>
                        </div>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-500">
                          Payment Information
                        </h4>
                        <div className="mt-1 text-sm text-gray-900 space-y-1">
                          <p>
                            <span className="font-medium">Method:</span>{" "}
                            {order.paymentMethod}
                          </p>
                          <p>
                            <span className="font-medium">Total:</span> ₹
                            {order.totalPrice}
                          </p>
                        </div>
                      </div>
                    </div>

                    <h4 className="text-sm font-medium text-gray-500 mb-2">
                      Products ({order.products.length})
                    </h4>
                    <div className="space-y-3">
                      {order.products.length > 0 ? (
                        order.products.map((item, index) => (
                          <div
                            key={index}
                            className="flex items-start p-3 border border-gray-200 rounded-lg"
                          >
                            {item.image && (
                              <img
                                src={item.image}
                                alt={item.name}
                                className="flex-shrink-0 h-16 w-16 rounded-md object-cover"
                              />
                            )}
                            <div className="ml-4 flex-1">
                              <div className="flex items-center justify-between">
                                <h5 className="text-sm font-medium text-gray-900">
                                  {item.name || item.title || "Unnamed Item"}
                                </h5>
                                <p className="text-sm font-medium text-gray-900">
                                  ₹{item.price}
                                </p>
                              </div>
                              <div className="mt-1 flex items-center justify-between text-sm text-gray-500">
                                <p>Qty: {item.quantity || 1}</p>
                                <p
                                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                    item.status === "Delivered"
                                      ? "bg-green-100 text-green-800"
                                      : "bg-yellow-100 text-yellow-800"
                                  }`}
                                >
                                  {item.status || "Pending"}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <p className="text-sm text-gray-500">
                          No products found for this order.
                        </p>
                      )}
                    </div>

                    <div className="mt-6 flex justify-end">
                      <button
                        onClick={() => deleteOrder(order.$id)}
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                      >
                        Delete Order
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-white shadow overflow-hidden rounded-lg text-center py-12">
                <svg
                  className="mx-auto h-12 w-12 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
                <h3 className="mt-2 text-lg font-medium text-gray-900">
                  No orders
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  Get started by making your first sale.
                </p>
              </div>
            )}
          </div>

          {/* Best Sellers Sidebar */}
          <div className="space-y-6">
            <div className="bg-white shadow overflow-hidden rounded-lg">
              <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Best Selling Products
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  Top 5 products by quantity sold
                </p>
              </div>
              <div className="px-4 py-5 sm:p-6">
                {bestSellers.length > 0 ? (
                  <div className="space-y-4">
                    {bestSellers.map((product, index) => (
                      <div
                        key={index}
                        className="flex items-start border-b border-gray-200 pb-4 last:border-0 last:pb-0"
                      >
                        <span className="flex-shrink-0 bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-medium mt-1">
                          {index + 1}
                        </span>
                        <div className="ml-3 flex-1">
                          <div className="flex items-center justify-between">
                            <h4 className="text-sm font-medium text-gray-900">
                              {product.name}
                            </h4>
                            <span className="text-sm font-medium text-gray-900">
                              ₹{product.price}
                            </span>
                          </div>
                          <div className="mt-1 flex items-center justify-between">
                            <p className="text-xs text-gray-500">
                              Sold: {product.count}
                            </p>
                            <div className="flex-shrink-0">
                              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                                {Math.round(
                                  (product.count /
                                    bestSellers.reduce(
                                      (acc, curr) => acc + curr.count,
                                      0
                                    )) *
                                    100
                                )}
                                %
                              </span>
                            </div>
                          </div>
                          <div className="mt-1 w-full bg-gray-200 rounded-full h-1.5">
                            <div
                              className="bg-blue-600 h-1.5 rounded-full"
                              style={{
                                width: `${Math.round(
                                  (product.count /
                                    bestSellers.reduce(
                                      (acc, curr) => acc + curr.count,
                                      0
                                    )) *
                                    100
                                )}%`,
                              }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-500 text-center py-4">
                    No sales data available
                  </p>
                )}
              </div>
            </div>

            {/* Stats Card */}
            <div className="bg-white shadow overflow-hidden rounded-lg">
              <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Order Statistics
                </h3>
              </div>
              <div className="px-4 py-5 sm:p-6">
                <dl className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div className="px-4 py-5 bg-gray-50 rounded-lg overflow-hidden sm:p-6">
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Total Orders
                    </dt>
                    <dd className="mt-1 text-3xl font-semibold text-gray-900">
                      {orders.length}
                    </dd>
                  </div>
                  <div className="px-4 py-5 bg-gray-50 rounded-lg overflow-hidden sm:p-6">
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Total Products Sold
                    </dt>
                    <dd className="mt-1 text-3xl font-semibold text-gray-900">
                      {bestSellers.reduce((acc, curr) => acc + curr.count, 0)}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}