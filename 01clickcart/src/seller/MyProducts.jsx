import React, { useEffect, useState } from 'react';
import { databases } from '../appwrite/appwriteConfig';
import { Query } from 'appwrite';
import { useUser } from '../hooks/useUser';
import { useNavigate } from 'react-router-dom';

const DATABASE_ID = '67cad7e600027ac7e8c0';
const COLLECTION_ID = '67ea560f00044ac3e66b';

const MyProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSellerProducts = async () => {
      try {
        const response = await databases.listDocuments(
          DATABASE_ID,
          COLLECTION_ID,
          [Query.equal('sellerId', user?.$id)]
        );
        setProducts(response.documents);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchSellerProducts();
    }
  }, [user]);

  const handleDelete = async (productId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this product?");
    if (!confirmDelete) return;

    try {
      await databases.deleteDocument(DATABASE_ID, COLLECTION_ID, productId);
      setProducts((prev) => prev.filter((product) => product.$id !== productId));
      alert("Product deleted successfully.");
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("Failed to delete product.");
    }
  };

  const handleEdit = (product) => {
    navigate("/edit-product", { state: { product } });
  };

  if (loading) return <div>Loading products...</div>;

  return (
    <div className="p-4">
      <button
        onClick={() => navigate("/seller-dashboard")}
        className="mb-4 bg-slate-600 text-white px-4 py-2 mr-4 rounded hover:bg-slate-950"
      >
        ← Back to Dashboard
      </button>
      <button
        onClick={() => navigate("/add-product")}
        className="mb-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        ← Add Product
      </button>

      <h2 className="text-2xl font-bold mb-4">Your Products</h2>

      {products.length === 0 ? (
        <p>No products added yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {products.map((product) => (
            <div
              key={product.$id}
              className="border rounded-lg p-4 shadow-md bg-white dark:bg-gray-800"
            >
              {product.image && (
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-40 object-cover rounded mb-2"
                />
              )}
              <h3 className="text-xl font-semibold">{product.title}</h3>
              <p className="text-sm text-gray-500">{product.description}</p>
              <p className="text-sm text-gray-400">{product.category}</p>
              <p className="mt-2 font-bold text-green-600">₹{product.price}</p>

              <div className="mt-4 flex gap-2">
                <button
                  onClick={() => handleDelete(product.$id)}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  Delete
                </button>
                <button
                  onClick={() => handleEdit(product)}
                  className="bg-lime-500 text-white px-4 py-2 rounded hover:bg-lime-600"
                >
                  Edit
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyProducts;
