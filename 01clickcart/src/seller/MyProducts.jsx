import React, { useEffect, useState } from 'react';
import { databases } from '../appwrite/appwriteConfig';
import { Query } from 'appwrite';
import { useUser } from '../hooks/useUser';
import { useNavigate } from 'react-router-dom';
import { 
  FiArrowLeft, 
  FiPlus, 
  FiEdit2, 
  FiTrash2, 
  FiEye,
  FiSearch,
  FiFilter,
  FiLoader
} from 'react-icons/fi';

const DATABASE_ID = '67cad7e600027ac7e8c0';
const COLLECTION_ID = '67ea560f00044ac3e66b';

const MyProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const { user } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSellerProducts = async () => {
      try {
        const queries = [Query.equal('sellerId', user?.$id)];
        
        if (searchTerm) {
          queries.push(Query.search('title', searchTerm));
        }
        
        if (categoryFilter !== 'all') {
          queries.push(Query.equal('category', categoryFilter));
        }

        const response = await databases.listDocuments(
          DATABASE_ID,
          COLLECTION_ID,
          queries
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
  }, [user, searchTerm, categoryFilter]);

  const handleDelete = async (productId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this product?");
    if (!confirmDelete) return;

    try {
      await databases.deleteDocument(DATABASE_ID, COLLECTION_ID, productId);
      setProducts(prev => prev.filter(product => product.$id !== productId));
      alert("Product deleted successfully.");
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("Failed to delete product.");
    }
  };

  const handleEdit = (product) => {
    navigate("/edit-product", { state: { product } });
  };

  const handleView = (productId) => {
    navigate(`/product/${productId}`);
  };

  // Extract unique categories for filter dropdown
  const categories = ['all', ...new Set(products.map(p => p.category))];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <FiLoader className="animate-spin text-4xl text-blue-600" />
      </div>
    );
  }

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
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">My Products</h1>
          </div>
          
          <button
            onClick={() => navigate("/add-product")}
            className="flex items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md shadow-sm"
          >
            <FiPlus className="mr-2" />
            Add New Product
          </button>
        </div>

        {/* Filters */}
        <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search products..."
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
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category === 'all' ? 'All Categories' : category}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        {products.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <p className="text-gray-500 text-lg">
              {searchTerm || categoryFilter !== 'all' 
                ? 'No products match your search criteria'
                : 'You haven\'t added any products yet'}
            </p>
            <button
              onClick={() => navigate("/add-product")}
              className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
            >
              Add Your First Product
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <div
                key={product.$id}
                className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="relative">
                  {product.image && (
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-48 object-cover"
                    />
                  )}
                  <div className="absolute top-2 right-2 bg-blue-600 text-white text-xs px-2 py-1 rounded">
                    {product.category}
                  </div>
                </div>
                
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">{product.title}</h3>
                  <p className="text-sm text-gray-500 line-clamp-2 mb-2">{product.description}</p>
                  
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-lg font-bold text-blue-600">
                      ₹{product.price}
                    </span>
                    {product.stock && (
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        product.stock > 10 ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {product.stock > 10 ? 'In Stock' : 'Low Stock'}
                      </span>
                    )}
                  </div>
                  
                  <div className="flex justify-between space-x-2">
                    <button
                      onClick={() => handleView(product.$id)}
                      className="flex-1 flex items-center justify-center bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 rounded-md text-sm"
                    >
                      <FiEye className="mr-1" /> View
                    </button>
                    <button
                      onClick={() => handleEdit(product)}
                      className="flex-1 flex items-center justify-center bg-blue-100 hover:bg-blue-200 text-blue-800 py-2 rounded-md text-sm"
                    >
                      <FiEdit2 className="mr-1" /> Edit
                    </button>
                    <button
                      onClick={() => handleDelete(product.$id)}
                      className="flex-1 flex items-center justify-center bg-red-100 hover:bg-red-200 text-red-800 py-2 rounded-md text-sm"
                    >
                      <FiTrash2 className="mr-1" /> Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyProducts;