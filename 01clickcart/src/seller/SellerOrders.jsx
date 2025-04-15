import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  FiArrowLeft, 
  FiSearch, 
  FiFilter, 
  FiPrinter, 
  FiDownload,
  FiChevronDown,
  FiChevronUp,
  FiCheckCircle,
  FiTruck,
  FiClock,
  FiAlertCircle
} from 'react-icons/fi';

const SellerOrders = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedOrder, setExpandedOrder] = useState(null);
  const [statusFilter, setStatusFilter] = useState("all");

  const mockOrders = [
    {
      id: "ORD123456",
      customer: "John Doe",
      date: "2025-04-06",
      status: "Delivered",
      total: 1299,
      products: [
        { name: "Wireless Mouse", quantity: 2, price: 399 },
        { name: "Mechanical Keyboard", quantity: 1, price: 899 },
      ],
      shippingAddress: "123 Main St, Bangalore, Karnataka 560001",
      paymentMethod: "Credit Card",
      trackingNumber: "TRK789456123"
    },
    {
      id: "ORD123457",
      customer: "Jane Smith",
      date: "2025-04-05",
      status: "Processing",
      total: 899,
      products: [
        { name: "Laptop Stand", quantity: 1, price: 899 },
      ],
      shippingAddress: "456 Oak Ave, Mumbai, Maharashtra 400001",
      paymentMethod: "UPI",
      trackingNumber: null
    },
    {
      id: "ORD123458",
      customer: "Mike Johnson",
      date: "2025-04-03",
      status: "Shipped",
      total: 1599,
      products: [
        { name: "Gaming Headset", quantity: 1, price: 1299 },
        { name: "RGB Mousepad", quantity: 3, price: 100 },
      ],
      shippingAddress: "789 Pine Rd, Delhi, Delhi 110001",
      paymentMethod: "Debit Card",
      trackingNumber: "TRK321654987"
    },
    {
      id: "ORD123459",
      customer: "Sarah Williams",
      date: "2025-04-02",
      status: "Cancelled",
      total: 599,
      products: [
        { name: "Wireless Earbuds", quantity: 1, price: 599 },
      ],
      shippingAddress: "321 Elm St, Hyderabad, Telangana 500001",
      paymentMethod: "Net Banking",
      trackingNumber: null
    },
  ];

  const filteredOrders = mockOrders.filter(order => {
    const matchesSearch = 
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const toggleOrderExpand = (orderId) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case "Delivered":
        return <FiCheckCircle className="text-green-500 mr-1" />;
      case "Shipped":
        return <FiTruck className="text-blue-500 mr-1" />;
      case "Processing":
        return <FiClock className="text-yellow-500 mr-1" />;
      case "Cancelled":
        return <FiAlertCircle className="text-red-500 mr-1" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case "Delivered":
        return "bg-green-100 text-green-800";
      case "Shipped":
        return "bg-blue-100 text-blue-800";
      case "Processing":
        return "bg-yellow-100 text-yellow-800";
      case "Cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <button
              onClick={() => navigate("/seller-dashboard")}
              className="flex items-center text-blue-600 hover:text-blue-800 mb-2"
            >
              <FiArrowLeft className="mr-2" />
              Back to Dashboard
            </button>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Order Management</h1>
          </div>
          
          <div className="flex space-x-2">
            <button className="flex items-center bg-white border border-gray-300 px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-50">
              <FiPrinter className="mr-2" />
              Print
            </button>
            <button className="flex items-center bg-white border border-gray-300 px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-50">
              <FiDownload className="mr-2" />
              Export
            </button>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg overflow-hidden">
          {/* Filters */}
          <div className="p-4 border-b border-gray-200 flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search orders by ID or customer..."
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiFilter className="text-gray-400" />
              </div>
              <select
                className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md leading-5 bg-white focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All Statuses</option>
                <option value="Processing">Processing</option>
                <option value="Shipped">Shipped</option>
                <option value="Delivered">Delivered</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>
          </div>

          {/* Orders List */}
          <div className="divide-y divide-gray-200">
            {filteredOrders.length > 0 ? (
              filteredOrders.map((order) => (
                <div key={order.id} className="hover:bg-gray-50">
                  <div 
                    className="p-4 flex flex-col sm:flex-row sm:items-center justify-between cursor-pointer"
                    onClick={() => toggleOrderExpand(order.id)}
                  >
                    <div className="flex items-center mb-2 sm:mb-0">
                      <span className="font-medium text-gray-900 mr-4">{order.id}</span>
                      <span className="text-gray-600 mr-4">{order.customer}</span>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(order.status)}`}>
                        {getStatusIcon(order.status)}
                        {order.status}
                      </span>
                    </div>
                    
                    <div className="flex items-center">
                      <div className="mr-6 text-right">
                        <div className="text-sm text-gray-500">Order Date</div>
                        <div className="font-medium">{order.date}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-gray-500">Total</div>
                        <div className="font-bold">₹{order.total}</div>
                      </div>
                      <div className="ml-4">
                        {expandedOrder === order.id ? (
                          <FiChevronUp className="text-gray-500" />
                        ) : (
                          <FiChevronDown className="text-gray-500" />
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Expanded Order Details */}
                  {expandedOrder === order.id && (
                    <div className="p-4 bg-gray-50 border-t border-gray-200">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Products Ordered */}
                        <div>
                          <h3 className="text-lg font-medium text-gray-900 mb-3">Products Ordered</h3>
                          <div className="bg-white rounded-md shadow-sm overflow-hidden">
                            <table className="min-w-full divide-y divide-gray-200">
                              <thead className="bg-gray-50">
                                <tr>
                                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Qty</th>
                                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                                </tr>
                              </thead>
                              <tbody className="bg-white divide-y divide-gray-200">
                                {order.products.map((product, index) => (
                                  <tr key={index}>
                                    <td className="px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-900">{product.name}</td>
                                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">{product.quantity}</td>
                                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">₹{product.price}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>

                        {/* Order Information */}
                        <div>
                          <h3 className="text-lg font-medium text-gray-900 mb-3">Order Information</h3>
                          <div className="space-y-4">
                            <div>
                              <h4 className="text-sm font-medium text-gray-500">Shipping Address</h4>
                              <p className="mt-1 text-sm text-gray-900">{order.shippingAddress}</p>
                            </div>
                            <div>
                              <h4 className="text-sm font-medium text-gray-500">Payment Method</h4>
                              <p className="mt-1 text-sm text-gray-900">{order.paymentMethod}</p>
                            </div>
                            {order.trackingNumber && (
                              <div>
                                <h4 className="text-sm font-medium text-gray-500">Tracking Number</h4>
                                <p className="mt-1 text-sm text-blue-600">{order.trackingNumber}</p>
                              </div>
                            )}
                            <div className="pt-4">
                              <button className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                                {order.status === "Processing" ? "Mark as Shipped" : 
                                 order.status === "Shipped" ? "Mark as Delivered" : 
                                 "View Order Details"}
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="p-8 text-center">
                <p className="text-gray-500">No orders found matching your criteria</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerOrders;