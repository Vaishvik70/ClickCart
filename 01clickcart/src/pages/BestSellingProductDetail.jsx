import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const BestSellingProductDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { productId } = location.state || {}; // Get productId from the state passed by the navigate

  // Check if productId is provided
  if (!productId) {
    return <div>Error: Product ID not provided.</div>;
  }

  const bestSellers = [
    {
      id: "1",
      name: "Wireless Headphones",
      image: "https://m.media-amazon.com/images/I/71RJCexaxiL._SL1500_.jpg",
      price: 2499,
      salesCount: 240,
      stock: 15,
    },
    {
      id: "2",
      name: "Smart Fitness Watch",
      image: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcSG6WTcrt627nj-iXl7flTB7yhJO7QDdUyPm4edjnoGTrB--yqazsDIlrvQpTjvLHV4CLoYrigzJNTaShu9Bx2Gg814PE38ZFwnSm5HTG5u",
      price: 3499,
      salesCount: 180,
      stock: 0,
    },
    {
      id: "3",
      name: "Bluetooth Speaker",
      image: "https://m.media-amazon.com/images/I/41yQZFhJ-dL._SY300_SX300_QL70_FMwebp_.jpg",
      price: 1999,
      salesCount: 300,
      stock: 5,
    },
    {
      id: "4",
      name: "Laptop Stand",
      image: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcSDcaUBX4eSpvrNjqWhjPHTqhcPPelimQ3yRAGJpp3uimsdWpb9k74x3RwrCmyjjsLOE_sYoqojLQU1w-Inuiy1jXp9MoYJmTsA8vzz3xzHm6NTIoTGald6NQ",
      price: 899,
      salesCount: 120,
      stock: 10,
    },
  ];

  const product = bestSellers.find((p) => p.id === productId);

  if (!product) {
    return <div>Product not found</div>;
  }

  const handleBuyNow = () => {
    navigate("/payment", { state: { product } });
  };
  
  return (
    <div className="min-h-screen bg-white px-4 py-8">
      <div className="max-w-4xl mx-auto bg-white p-6 border rounded-lg shadow-sm">
        <div className="flex justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">{product.name}</h1>
            <p className="text-gray-600 mt-2">₹{product.price.toLocaleString("en-IN")}</p>
            <p className="text-sm text-gray-400 mt-2">Sold: {product.salesCount}</p>
            <p className="text-sm text-gray-500 mt-1">{product.stock > 0 ? `In Stock: ${product.stock}` : "Out of Stock"}</p>
          </div>
          <img
            src={product.image}
            alt={product.name}
            className="w-64 h-64 object-cover rounded-lg"
          />
        </div>

          <button
            onClick={handleBuyNow}
            disabled={product.stock === 0}
            className={`w-full py-2 rounded-md text-sm font-medium transition ${
              product.stock > 0
                ? "bg-red-500 hover:bg-red-600 text-white"
                : "bg-gray-400 text-white cursor-not-allowed"
            }`}
          >
            Buy Now
          </button>

          <button
            onClick={() => navigate(-1)} // To go back to the previous page
            className="bg-gray-600 text-white py-2 px-4 rounded-md mt-4"
          >
            Back to Best Sellers
          </button>
        </div>
      </div>
  );
};

export default BestSellingProductDetail;
