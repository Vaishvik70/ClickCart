import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Client, Databases, ID, Query, Account } from "appwrite";

const client = new Client();
client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("67cad786002fe394c8a8");

const databases = new Databases(client);
const account = new Account(client);
const DATABASE_ID = "67cad7e600027ac7e8c0";
const REVIEW_COLLECTION_ID = "67d9690d003c8ffa0569";
const SELLER_PRODUCT_COLLECTION_ID = "67ea560f00044ac3e66b";
const CART_COLLECTION_ID = "67cad7ff0005fc97c570";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [sellerLoading, setSellerLoading] = useState(true);
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  const products = useSelector((state) => state.products?.products || []);
  const saleProducts = useSelector((state) => state.saleProducts?.saleProducts || []);
  const [sellerProducts, setSellerProducts] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [reviewData, setReviewData] = useState({ 
    name: "", 
    rating: "", 
    comment: "" 
  });
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    checkLoginStatus();
    fetchReviews();
    fetchSellerProducts();
  }, [id]);

  useEffect(() => {
    if (!loading && !sellerLoading) {
      const foundProduct =
        products.find((p) => p.id === id) ||
        saleProducts.find((p) => p.id === id) ||
        sellerProducts.find((p) => p.$id === id);

      if (foundProduct) {
        setProduct(foundProduct);
        findRelatedProducts(foundProduct);
      } else {
        setProduct(false);
      }
    }
  }, [id, loading, sellerLoading, products, saleProducts, sellerProducts]);

  const findRelatedProducts = (currentProduct) => {
    const related = [...products, ...sellerProducts]
      .filter((item) => 
        (item.id || item.$id) !== (currentProduct.id || currentProduct.$id) && 
        item.category === currentProduct.category
      )
      .slice(0, 3);
    setRelatedProducts(related);
  };

  const checkLoginStatus = async () => {
    try {
      const session = await account.get();
      setIsLoggedIn(!!session);
      localStorage.setItem("isLoggedIn", "true");
    } catch {
      setIsLoggedIn(false);
      localStorage.removeItem("isLoggedIn");
    } finally {
      setLoading(false);
    }
  };

  const fetchReviews = async () => {
    try {
      const response = await databases.listDocuments(
        DATABASE_ID, 
        REVIEW_COLLECTION_ID, 
        [Query.equal("productId", id)]
      );
      const sorted = response.documents.sort(
        (a, b) => new Date(b.$createdAt) - new Date(a.$createdAt)
      );
      setReviews(sorted);
    } catch (error) {
      console.error("Error fetching reviews:", error);
      setError("Failed to load reviews. Please try again.");
    }
  };

  const fetchSellerProducts = async () => {
    setSellerLoading(true);
    try {
      const response = await databases.listDocuments(
        DATABASE_ID, 
        SELLER_PRODUCT_COLLECTION_ID
      );
      setSellerProducts(response.documents);
    } catch (error) {
      console.error("Error fetching seller products:", error);
      setError("Failed to load seller products.");
    } finally {
      setSellerLoading(false);
    }
  };

  const addReview = async () => {
    if (!reviewData.name.trim()) {
      setError("Please enter your name.");
      return;
    }
    if (!reviewData.rating) {
      setError("Please select a rating.");
      return;
    }
    if (!reviewData.comment.trim()) {
      setError("Please write your review.");
      return;
    }

    try {
      await databases.createDocument(
        DATABASE_ID, 
        REVIEW_COLLECTION_ID, 
        ID.unique(), 
        {
          productId: id,
          name: reviewData.name,
          rating: reviewData.rating,
          comment: reviewData.comment,
        }
      );

      setSuccessMessage("Thank you for your review!");
      setError(null);
      setReviewData({ name: "", rating: "", comment: "" });
      fetchReviews();
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (error) {
      console.error("Error adding review:", error);
      setError("Failed to submit review. Please try again.");
    }
  };

const addToCart = async () => {
  if (!isLoggedIn) {
    setError("You must be logged in to add items to the cart.");
    return;
  }

  try {
    const user = await account.get();

    // Check if the product is already in the user's cart
    const existing = await databases.listDocuments(
      DATABASE_ID,
      CART_COLLECTION_ID,
      [
        Query.equal("userId", user.$id),
        Query.equal("productId", productId),
      ]
    );

    if (existing.total > 0) {
      setError("Product is already in your cart.");
      return;
    }

    await databases.createDocument(
      DATABASE_ID,
      CART_COLLECTION_ID,
      ID.unique(),
      {
        userId: user.$id,
        productId: productId,
        name: product.title,
        title: product.title,
        image: product.image,
        price: Math.round(displayPrice),
        quantity: 1
      }
    );

    setSuccessMessage("Product added to cart!");
    setError(null);
    setTimeout(() => setSuccessMessage(""), 3000);
  } catch (error) {
    console.error("Error adding to cart:", error);
    setError("Failed to add to cart. Please try again.");
  }
};


  if (loading || sellerLoading || product === null) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="text-center py-10">
        <h2 className="text-2xl font-bold text-red-500">Product not found</h2>
        <button
          onClick={() => navigate("/products")}
          className="mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded"
        >
          Browse Products
        </button>
      </div>
    );
  }

  const productId = product.id || product.$id;
  const displayPrice = product.salePrice || product.price;
  const discountPercentage = product.onSale === "true" ? product.discount : 0;
  const discountedPrice = displayPrice - (displayPrice * discountPercentage) / 100;

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded">
          <p>{error}</p>
        </div>
      )}

      {successMessage && (
        <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-6 rounded">
          <p>{successMessage}</p>
        </div>
      )}

      <div className="flex flex-col md:flex-row gap-8">
        {/* Product Image */}
        <div className="md:w-1/2 bg-white p-6 rounded-lg shadow-md">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-96 object-contain rounded-lg"
          />
        </div>

        {/* Product Info */}
        <div className="md:w-1/2">
          <h1 className="text-3xl font-bold text-gray-800">{product.title}</h1>
          <div className="mt-2 flex items-center">
            <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">
              {product.category}
            </span>
          </div>

          <div className="mt-4">
            <p className="text-sm text-gray-600">
              <span className="font-medium">Availability:</span>{" "}
              {product.stock > 0 ? (
                <span className="text-green-600">In Stock ({product.stock} available)</span>
              ) : (
                <span className="text-red-600">Out of Stock</span>
              )}
            </p>
          </div>

          {!isLoggedIn && (
            <div className="mt-4 bg-yellow-50 border-l-4 border-yellow-400 p-4">
              <p className="text-yellow-700">
                <span className="font-medium">⚠️ Notice:</span> You must be logged in to purchase!
              </p>
            </div>
          )}

          <div className="mt-6 flex flex-wrap gap-3">
            <button
              onClick={() => navigate("/products")}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-6 rounded"
            >
              Back to Products
            </button>

            <button
              onClick={addToCart}
              disabled={product.stock <= 0}
              className={`${
                product.stock > 0
                  ? "bg-blue-600 hover:bg-blue-700"
                  : "bg-gray-400 cursor-not-allowed"
              } text-white py-2 px-6 rounded`}
            >
              Add to Cart
            </button>

            <button
              onClick={() => navigate("/payment", { state: { product } })}
              disabled={!isLoggedIn || product.stock <= 0}
              className={`${
                isLoggedIn && product.stock > 0
                  ? "bg-green-600 hover:bg-green-700"
                  : "bg-gray-400 cursor-not-allowed"
              } text-white py-2 px-6 rounded`}
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <section className="mt-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Customer Reviews</h2>

        {reviews.length > 0 ? (
          <div>
            {reviews.map((review, index) => (
              <div key={index} className="mb-6 p-4 border border-gray-300 rounded-md">
                <div className="flex justify-between">
                  <div>
                    <h4 className="font-semibold">{review.name}</h4>
                    <div className="flex items-center text-yellow-500">
                      {Array.from({ length: review.rating }).map((_, idx) => (
                        <svg
                          key={idx}
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                          className="w-5 h-5"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M12 17.25l-6.16 3.24a1 1 0 0 1-1.49-1.06l1.19-7.09-5.14-5.02a1 1 0 0 1 .55-1.7l7.14-1.04L9.75.73a1 1 0 0 1 1.9 0l3.1 6.91 7.14 1.04a1 1 0 0 1 .55 1.7l-5.14 5.02 1.19 7.09a1 1 0 0 1-1.49 1.06L12 17.25z"
                          />
                        </svg>
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-gray-500">{new Date(review.$createdAt).toLocaleString()}</p>
                </div>
                <p className="mt-2 text-gray-700">{review.comment}</p>
              </div>
            ))}
          </div>
        ) : (
          <p>No reviews yet. Be the first to review!</p>
        )}

        {/* Review Form */}
        {isLoggedIn && (
          <div className="mt-8">
            <h3 className="text-lg font-semibold text-gray-800">Leave a Review</h3>
            <div className="mt-4">
              <input
                type="text"
                value={reviewData.name}
                onChange={(e) => setReviewData({ ...reviewData, name: e.target.value })}
                placeholder="Your Name"
                className="w-full p-3 border border-gray-300 rounded-md"
              />
            </div>

            <div className="mt-4">
              <select
                value={reviewData.rating}
                onChange={(e) => setReviewData({ ...reviewData, rating: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-md"
              >
                <option value="">Rating</option>
                {[1, 2, 3, 4, 5].map((rating) => (
                  <option key={rating} value={rating}>
                    {rating} Star{rating > 1 ? "s" : ""}
                  </option>
                ))}
              </select>
            </div>

            <div className="mt-4">
              <textarea
                value={reviewData.comment}
                onChange={(e) => setReviewData({ ...reviewData, comment: e.target.value })}
                placeholder="Write your review"
                className="w-full p-3 border border-gray-300 rounded-md"
              ></textarea>
            </div>

            <button
              onClick={addReview}
              className="mt-4 bg-blue-600 text-white py-2 px-6 rounded"
            >
              Submit Review
            </button>
          </div>
        )}
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Related Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {relatedProducts.map((related, index) => {
              const relatedPrice = parseFloat(related.salePrice || related.price) || 0;
              const relatedDiscount = related.onSale === "true" ? parseFloat(related.discount) : 0;
              const relatedDiscountedPrice = relatedPrice - (relatedPrice * relatedDiscount) / 100;

              return (
                <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                  <img
                    src={related.image}
                    alt={related.title}
                    className="w-full h-64 object-contain rounded-lg"
                  />
                  <h3 className="mt-4 text-xl font-semibold text-gray-800">{related.title}</h3>
                  <p className="mt-2 text-gray-600">{related.category}</p>
                  <div className="mt-4 flex items-center">
                    <span className="text-lg font-bold text-gray-900">
                      ₹{relatedDiscountedPrice.toFixed(2)}
                    </span>
                    {related.onSale === "true" && (
                      <span className="ml-4 text-sm line-through text-gray-500">
                        ₹{relatedPrice.toFixed(2)}
                      </span>
                    )}
                  </div>
                  <button
                    onClick={() => navigate(`/product/${related.id || related.$id}`)}
                    className="mt-4 bg-blue-600 text-white py-2 px-6 rounded"
                  >
                    View Product
                  </button>
                </div>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
}
