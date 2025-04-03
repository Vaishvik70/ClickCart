import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { databases } from "../appwrite/appwrite"; // Ensure Appwrite SDK is configured
import ProductCard from "../components/ProductCard";

const Products = () => {
  const reduxProducts = useSelector((state) => state.products.products);
  const [sellerProducts, setSellerProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Extract categories from both Redux and seller products
  const allProducts = [...reduxProducts, ...sellerProducts];
  const categories = ["All", ...new Set(allProducts.map((product) => product.category))];

  // State for category and search query
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch seller products from Appwrite
  useEffect(() => {
    const fetchSellerProducts = async () => {
      try {
        const response = await databases.listDocuments(
          "67cad7e600027ac7e8c0", // Replace with your Appwrite database ID
          "67ea560f00044ac3e66b" // Replace with your Appwrite collection ID
        );
        setSellerProducts(response.documents);
      } catch (error) {
        console.error("Error fetching seller products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSellerProducts();
  }, []);

  // Filter products based on search and category
  const filteredProducts = allProducts.filter((product) => {
    const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Products</h1>

      {/* Search and Category Filters */}
      <div className="mb-4 flex flex-wrap items-center gap-4">
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="px-3 py-2 border rounded-md text-black w-full sm:w-64"
        />
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-3 py-2 border rounded-md"
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      {/* Loading State */}
      {loading ? (
        <p className="text-gray-600">Loading products...</p>
      ) : filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id || product.$id} product={product} />
          ))}
        </div>
      ) : (
        <p className="text-gray-600">No products found.</p>
      )}
    </div>
  );
};

export default Products;
