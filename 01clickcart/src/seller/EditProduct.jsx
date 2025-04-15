import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { databases, storage, ID } from "../appwrite/appwriteConfig";
import { FiArrowLeft, FiUpload, FiSave, FiLoader, FiTrash2 } from "react-icons/fi";

const DATABASE_ID = "67cad7e600027ac7e8c0";
const COLLECTION_ID = "67ea560f00044ac3e66b";
const BUCKET_ID = "67cad81f00268d3093c5";

const EditProduct = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const product = state?.product;

  const categories = [
    "Electronics",
    "Fashion",
    "Home & Kitchen",
    "Beauty",
    "Books",
    "Toys",
    "Sports",
    "Automotive"
  ];

  const [formData, setFormData] = useState({
    title: product?.title || "",
    description: product?.description || "",
    price: product?.price || "",
    category: product?.category || "",
    stock: product?.stock || "",
    discount: product?.discount || "0"
  });

  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(product?.image || "");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.description.trim()) newErrors.description = "Description is required";
    if (!formData.price || isNaN(formData.price) || formData.price <= 0) 
      newErrors.price = "Valid price is required";
    if (!formData.stock || isNaN(formData.stock) || formData.stock < 0) 
      newErrors.stock = "Valid stock quantity is required";
    if (!formData.category) newErrors.category = "Category is required";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!product) {
      alert("No product data found");
      return;
    }

    if (!validateForm()) return;

    setLoading(true);

    try {
      let imageUrl = product.image;

      // Upload new image if selected
      if (imageFile) {
        const uploadedImage = await storage.createFile(BUCKET_ID, ID.unique(), imageFile);
        imageUrl = storage.getFileView(BUCKET_ID, uploadedImage.$id);
      }

      // Update product document
      await databases.updateDocument(
        DATABASE_ID, 
        COLLECTION_ID, 
        product.$id, 
        {
          ...formData,
          price: Number(formData.price),
          stock: Number(formData.stock),
          discount: Number(formData.discount),
          image: imageUrl,
          updatedAt: new Date().toISOString()
        }
      );

      alert("Product updated successfully!");
      navigate("/seller-dashboard/my-products");
    } catch (error) {
      console.error("Failed to update product:", error);
      alert(`Failed to update product: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Product Not Found</h2>
          <p className="text-gray-600 mb-4">The product you're trying to edit doesn't exist or couldn't be loaded.</p>
          <button
            onClick={() => navigate("/seller-dashboard/my-products")}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Back to My Products
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <button
            onClick={() => navigate("/seller-dashboard/my-products")}
            className="flex items-center text-blue-600 hover:text-blue-800"
          >
            <FiArrowLeft className="mr-2" />
            Back to My Products
          </button>
        </div>

        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900">Edit Product</h2>
            <p className="text-gray-600">Update your product details</p>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Product Image */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Product Image
              </label>
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <img
                    src={previewUrl || product.image}
                    alt="Product preview"
                    className="h-32 w-32 rounded-md object-cover border"
                  />
                </div>
                <div>
                  <label className="group relative cursor-pointer rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm hover:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2">
                    <div className="flex items-center">
                      <FiUpload className="mr-2 text-gray-400 group-hover:text-blue-500" />
                      <span className="text-sm">Change Image</span>
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="sr-only"
                    />
                  </label>
                </div>
              </div>
            </div>

            {/* Product Title */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                Product Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${errors.title ? 'border-red-500' : 'border'}`}
                placeholder="Enter product title"
              />
              {errors.title && (
                <p className="mt-1 text-sm text-red-600">{errors.title}</p>
              )}
            </div>

            {/* Product Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                rows={3}
                value={formData.description}
                onChange={handleChange}
                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${errors.description ? 'border-red-500' : 'border'}`}
                placeholder="Detailed product description"
              />
              {errors.description && (
                <p className="mt-1 text-sm text-red-600">{errors.description}</p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Price */}
              <div>
                <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                  Price (₹)
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 sm:text-sm">₹</span>
                  </div>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    className={`block w-full pl-7 pr-12 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${errors.price ? 'border-red-500' : 'border'}`}
                    placeholder="0.00"
                    min="0"
                    step="0.01"
                  />
                </div>
                {errors.price && (
                  <p className="mt-1 text-sm text-red-600">{errors.price}</p>
                )}
              </div>

              {/* Discount */}
              <div>
                <label htmlFor="discount" className="block text-sm font-medium text-gray-700">
                  Discount (%)
                </label>
                <input
                  type="number"
                  id="discount"
                  name="discount"
                  value={formData.discount}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  placeholder="0"
                  min="0"
                  max="100"
                />
              </div>

              {/* Stock */}
              <div>
                <label htmlFor="stock" className="block text-sm font-medium text-gray-700">
                  Stock Quantity
                </label>
                <input
                  type="number"
                  id="stock"
                  name="stock"
                  value={formData.stock}
                  onChange={handleChange}
                  className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${errors.stock ? 'border-red-500' : 'border'}`}
                  placeholder="Available quantity"
                  min="0"
                />
                {errors.stock && (
                  <p className="mt-1 text-sm text-red-600">{errors.stock}</p>
                )}
              </div>

              {/* Category */}
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                  Category
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${errors.category ? 'border-red-500' : 'border'}`}
                >
                  <option value="">Select a category</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
                {errors.category && (
                  <p className="mt-1 text-sm text-red-600">{errors.category}</p>
                )}
              </div>
            </div>

            <div className="pt-4 flex justify-between">
              <button
                type="button"
                onClick={() => navigate("/seller-dashboard/my-products")}
                className="inline-flex justify-center rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                {loading ? (
                  <>
                    <FiLoader className="animate-spin mr-2" />
                    Updating...
                  </>
                ) : (
                  <>
                    <FiSave className="mr-2" />
                    Update Product
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProduct;