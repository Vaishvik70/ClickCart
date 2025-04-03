import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Client, Databases, ID, Query, Account } from "appwrite";

const client = new Client();
client.setEndpoint("https://cloud.appwrite.io/v1").setProject("67cad786002fe394c8a8");

const databases = new Databases(client);
const account = new Account(client);
const DATABASE_ID = "67cad7e600027ac7e8c0";
const REVIEW_COLLECTION_ID = "67d9690d003c8ffa0569"; // Reviews Collection

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  // State for user login
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  const products = useSelector((state) => state.products?.products || []);
  const saleProducts = useSelector((state) => state.saleProducts?.saleProducts || []);

  let product = products.find((p) => p.id === id) || saleProducts.find((p) => p.id === id);

  const [reviews, setReviews] = useState([]);
  const [reviewData, setReviewData] = useState({ name: "", rating: "", comment: "" });

  // State for Color & Size Selection
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");

  useEffect(() => {
    checkLoginStatus();
    fetchReviews();
  }, []);

  // ✅ Check user login state from Appwrite
  const checkLoginStatus = async () => {
    try {
      const session = await account.get();
      if (session) {
        setIsLoggedIn(true);
        localStorage.setItem("isLoggedIn", "true");
      }
    } catch (error) {
      setIsLoggedIn(false);
      localStorage.removeItem("isLoggedIn");
    } finally {
      setLoading(false);
    }
  };

  const fetchReviews = async () => {
    try {
      const response = await databases.listDocuments(DATABASE_ID, REVIEW_COLLECTION_ID, [
        Query.equal("productId", id),
      ]);
      setReviews(response.documents);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  const addReview = async () => {
    if (!reviewData.name || !reviewData.rating || !reviewData.comment) {
      alert("Please fill all fields.");
      return;
    }

    try {
      await databases.createDocument(DATABASE_ID, REVIEW_COLLECTION_ID, ID.unique(), {
        productId: id,
        name: reviewData.name,
        rating: reviewData.rating,
        comment: reviewData.comment,
      });

      setReviews([...reviews, reviewData]);
      setReviewData({ name: "", rating: "", comment: "" });
      alert("Review submitted!");
    } catch (error) {
      console.error("Error adding review:", error);
      alert("Failed to submit review!");
    }
  };

  if (!product) {
    return <h2 className="text-red-500 text-center">Product not found</h2>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">{product.title}</h1>
      <img src={product.image} alt={product.title} className="w-64 h-64 object-cover rounded mt-4" />
      <p className="mt-2 text-gray-700">{product.category}</p>
      <p className="mt-2 text-lg font-semibold">
        ₹{product.salePrice || product.price} 
        {product.onSale === "true" && <span className="text-red-500 ml-2">-{product.discount}% OFF</span>}
      </p>

      {/* Color Selection */}
      {product.availableColors && product.availableColors.length > 0 && (
        <div className="mt-3">
          <label className="font-semibold">Select Color:</label>
          <select
            value={selectedColor}
            onChange={(e) => setSelectedColor(e.target.value)}
            className="border p-2 rounded ml-2"
          >
            <option value="">Choose Color</option>
            {product.availableColors.map((color, index) => (
              <option key={index} value={color}>{color}</option>
            ))}
          </select>
        </div>
      )}

      {/* Size Selection (Only for Clothing) */}
      {product.category.toLowerCase().includes("clothing") && product.availableSizes && (
        <div className="mt-3">
          <label className="font-semibold">Select Size:</label>
          <select
            value={selectedSize}
            onChange={(e) => setSelectedSize(e.target.value)}
            className="border p-2 rounded ml-2"
          >
            <option value="">Choose Size</option>
            {product.availableSizes.map((size, index) => (
              <option key={index} value={size}>{size}</option>
            ))}
          </select>
        </div>
      )}

      {/* Show login warning if user is not logged in */}
      {loading ? (
        <p className="text-gray-500 mt-4">Checking login status...</p>
      ) : !isLoggedIn ? (
        <p className="text-red-500 font-semibold mt-4">⚠️ You must be logged in to purchase!</p>
      ) : null}

      <div className="mt-4">
        <button onClick={() => navigate("/products")} className="bg-blue-500 text-white py-2 px-4 rounded mr-2">
          Back to Products
        </button>
        <button 
          onClick={() => navigate("/cart", { state: { product, selectedColor, selectedSize } })} 
          className="bg-green-500 text-white py-2 px-4 rounded mr-2"
          disabled={!isLoggedIn} // Disabled if not logged in
        >
          Add to Cart
        </button>
        <button 
          onClick={() => navigate("/payment", { state: { product, selectedColor, selectedSize } })} 
          className="bg-red-500 text-white py-2 px-4 rounded mt-2"
          disabled={!isLoggedIn} // Disabled if not logged in
        >
          Buy Now
        </button>
      </div>

      {/* Customer Reviews Section */}
      <div className="mt-6">
        <h2 className="text-xl font-bold">Customer Reviews</h2>

        {/* Review Form */}
        <div className="mt-4 border p-4 rounded">
          <input
            type="text"
            placeholder="Your Name"
            value={reviewData.name}
            onChange={(e) => setReviewData({ ...reviewData, name: e.target.value })}
            className="w-full p-2 border rounded mb-2"
          />
          <select
            value={reviewData.rating}
            onChange={(e) => setReviewData({ ...reviewData, rating: e.target.value })}
            className="w-full p-2 border rounded mb-2"
          >
            <option value="">Select Rating</option>
            <option value="⭐">⭐</option>
            <option value="⭐⭐">⭐⭐</option>
            <option value="⭐⭐⭐">⭐⭐⭐</option>
            <option value="⭐⭐⭐⭐">⭐⭐⭐⭐</option>
            <option value="⭐⭐⭐⭐⭐">⭐⭐⭐⭐⭐</option>
          </select>
          <textarea
            placeholder="Write a review..."
            value={reviewData.comment}
            onChange={(e) => setReviewData({ ...reviewData, comment: e.target.value })}
            className="w-full p-2 border rounded mb-2"
          />
          <button onClick={addReview} className="bg-blue-500 text-white py-2 px-4 rounded w-full">
            Submit Review
          </button>
        </div>
      </div>
    </div>
  );
}
