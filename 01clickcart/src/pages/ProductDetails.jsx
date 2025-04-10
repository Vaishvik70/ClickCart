import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Client, Databases, ID, Query, Account } from "appwrite";

const client = new Client();
client.setEndpoint("https://cloud.appwrite.io/v1")
      .setProject("67cad786002fe394c8a8");

const databases = new Databases(client);
const account = new Account(client);
const DATABASE_ID = "67cad7e600027ac7e8c0"; // Database ID
const REVIEW_COLLECTION_ID = "67d9690d003c8ffa0569"; // Review Collection ID
const SELLER_PRODUCT_COLLECTION_ID = "67ea560f00044ac3e66b"; // Seller Product Collection ID

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [sellerLoading, setSellerLoading] = useState(true);
  const [product, setProduct] = useState(null);

  const products = useSelector((state) => state.products?.products || []);
  const saleProducts = useSelector((state) => state.saleProducts?.saleProducts || []);
  const [sellerProducts, setSellerProducts] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [reviewData, setReviewData] = useState({ name: "", rating: "", comment: "" });

  useEffect(() => {
    checkLoginStatus();
    fetchReviews();
    fetchSellerProducts();
  }, []);

  useEffect(() => {
    if (!loading && !sellerLoading) {
      const foundProduct =
        products.find((p) => p.id === id) ||
        saleProducts.find((p) => p.id === id) ||
        sellerProducts.find((p) => p.$id === id);

      setProduct(foundProduct || false);
    }
  }, [id, loading, sellerLoading, products, saleProducts, sellerProducts]);

  const checkLoginStatus = async () => {
    try {
      const session = await account.get();
      if (session) {
        setIsLoggedIn(true);
        localStorage.setItem("isLoggedIn", "true");
      }
    } catch {
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
      const sorted = response.documents.sort((a, b) => new Date(b.$createdAt) - new Date(a.$createdAt));
      setReviews(sorted);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  const fetchSellerProducts = async () => {
    setSellerLoading(true);
    try {
      const response = await databases.listDocuments(DATABASE_ID, SELLER_PRODUCT_COLLECTION_ID);
      setSellerProducts(response.documents);
    } catch (error) {
      console.error("Error fetching seller products:", error);
    }
    setSellerLoading(false);
  };

  const addReview = async () => {
    if (!reviewData.name.trim() || !reviewData.rating || !reviewData.comment.trim()) {
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

      fetchReviews();
      setReviewData({ name: "", rating: "", comment: "" });
      alert("Review submitted!");
    } catch (error) {
      console.error("Error adding review:", error);
      alert("Failed to submit review!");
    }
  };

  if (loading || sellerLoading || product === null) {
    return <p className="text-center text-gray-500">Loading...</p>;
  }

  if (!product) {
    return <h2 className="text-red-500 text-center">Product not found</h2>;
  }

  const productId = product.id || product.$id;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">{product.title}</h1>
      <img src={product.image} alt={product.title} className="w-64 h-64 object-cover rounded mt-4" />
      <p className="mt-2 text-gray-700">{product.category}</p>
      <p className="mt-2 text-lg font-semibold">
        ₹{product.salePrice || product.price}
        {product.onSale === "true" && (
          <span className="text-red-500 ml-2">-{product.discount}% OFF</span>
        )}
      </p>
      <p className="text-sm text-gray-600 mt-1 text-bold">
        <span className="font-medium">Stock:</span> {product.stock ?? "N/A"}
      </p>

      {!isLoggedIn && (
        <p className="text-red-500 font-semibold mt-4">⚠️ You must be logged in to purchase!</p>
      )}

      <div className="mt-4">
        <button
          onClick={() => navigate("/products")}
          className="bg-blue-500 text-white py-2 px-4 rounded mr-2"
        >
          Back to Products
        </button>
        <button
          onClick={() => {
          const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
          const alreadyInCart = existingCart.some(
          (item) => (item.id || item.$id) === productId
          );
        if (!alreadyInCart) {
          localStorage.setItem("cart", JSON.stringify([...existingCart, product]));
          alert("Added to cart!");
        } else {
          alert("Product is already in your cart.");
        }
        }}
          className={`${
          product.stock > 0 ? "bg-green-500 hover:bg-green-600" : "bg-gray-400 cursor-not-allowed"
        } text-white px-4 py-2 rounded-md mr-2`}
        disabled={product.stock <= 0}
        >
          Add to Cart
        </button>

        <button
          onClick={() => navigate("/payment", { state: { product } })}
          className={`${
            product.stock > 0 && isLoggedIn
            ? "bg-red-500"
            : "bg-gray-400 cursor-not-allowed"
          } text-white py-2 px-4 rounded mt-2`}
          disabled={!isLoggedIn || product.stock <= 0}
        >
          Buy Now
        </button>

      </div>

      {/* Customer Reviews */}
      <div className="mt-6">
        <h2 className="text-xl font-bold">Customer Reviews</h2>

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

        <div className="mt-6">
          {reviews.length === 0 ? (
            <p className="text-gray-600">No reviews yet. Be the first!</p>
          ) : (
            reviews.map((rev) => (
              <div key={rev.$id} className="border rounded p-3 mb-2">
                <p className="font-semibold">{rev.name}</p>
                <p className="text-yellow-500">{rev.rating}</p>
                <p className="text-gray-700">{rev.comment}</p>
              </div>
            ))
          )}
        </div>

        {/* Related Products */}
        <div className="mt-10">
          <h2 className="text-2xl font-bold mb-4 text-gray-800"> ❤️ You May Also Like This ❤️ </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[...products, ...sellerProducts]
              .filter((item) => (item.id || item.$id) !== productId && item.category === product.category)
              .slice(0, 3)
              .map((related) => (
                <div key={related.id || related.$id} className="bg-white p-4 shadow rounded">
                  <img
                    src={related.image}
                    alt={related.title}
                    className="w-full h-48 object-contain rounded-lg bg-white p-2"
                  />
                  <h3 className="font-semibold mt-2">{related.title}</h3>
                  <p className="text-red-600 font-bold">
                    ₹
                    {(related.salePrice || related.price) -
                      ((related.salePrice || related.price) * (related.discount || 0)) / 100}
                  </p>
                  <button
                    className="mt-2 bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600"
                    onClick={() => navigate(`/product/${related.id || related.$id}`)}
                  >
                    View
                  </button>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
