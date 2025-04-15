import React, { useState, useEffect } from "react";
import { databases, storage, account, ID } from "../appwrite/appwriteConfig";
import { useNavigate } from "react-router-dom";
import { FiArrowLeft, FiUpload, FiPlus, FiLoader } from "react-icons/fi";

const AddProduct = () => {
  const [productData, setProductData] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    stock: "",
    discount: "0"
  });
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState(null);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

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

  useEffect(() => {
    const getCurrentUser = async () => {
      try {
        const user = await account.get();
        setUserId(user.$id);
      } catch (error) {
        console.error("Failed to fetch user", error);
        navigate("/login");
      }
    };

    getCurrentUser();
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData(prev => ({
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
    
    if (!productData.title.trim()) newErrors.title = "Title is required";
    if (!productData.description.trim()) newErrors.description = "Description is required";
    if (!productData.price || isNaN(productData.price) || productData.price <= 0) 
      newErrors.price = "Valid price is required";
    if (!productData.stock || isNaN(productData.stock) || productData.stock < 0) 
      newErrors.stock = "Valid stock quantity is required";
    if (!productData.category) newErrors.category = "Category is required";
    if (!imageFile) newErrors.image = "Product image is required";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    if (!userId) return;

    setLoading(true);

    try {
      let imageUrl = "";

      // Upload image if exists
      if (imageFile) {
        const imageUpload = await storage.createFile(
          "67cad81f00268d3093c5", // Bucket ID
          ID.unique(),
          imageFile
        );

        imageUrl = storage.getFileView("67cad81f00268d3093c5", imageUpload.$id);
      }

      // Create product document
      await databases.createDocument(
        "67cad7e600027ac7e8c0", // Database ID
        "67ea560f00044ac3e66b", // Collection ID
        ID.unique(),
        {
          ...productData,
          price: Number(productData.price),
          stock: Number(productData.stock),
          discount: Number(productData.discount),
          image: imageUrl,
          sellerId: userId,
          createdAt: new Date().toISOString()
        }
      );

      alert("Product added successfully!");
      navigate("/seller-dashboard/my-products");
    } catch (error) {
      console.error("Error adding product:", error);
      alert(`Failed to add product: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <button
            onClick={() => navigate("/seller-dashboard")}
            className="flex items-center text-blue-600 hover:text-blue-800"
          >
            <FiArrowLeft className="mr-2" />
            Back to Dashboard
          </button>
        </div>

        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900">Add New Product</h2>
            <p className="text-gray-600">Fill in the details of your product</p>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Product Image Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Product Image
              </label>
              <div className="mt-1 flex items-center">
                <label className="group relative cursor-pointer rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm hover:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2">
                  <div className="flex items-center">
                    <FiUpload className="mr-2 text-gray-400 group-hover:text-blue-500" />
                    <span className="text-sm">Upload Image</span>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="sr-only"
                  />
                </label>
                {previewUrl && (
                  <div className="ml-4">
                    <img 
                      src={previewUrl} 
                      alt="Preview" 
                      className="h-16 w-16 rounded-md object-cover"
                    />
                  </div>
                )}
              </div>
              {errors.image && (
                <p className="mt-1 text-sm text-red-600">{errors.image}</p>
              )}
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
                value={productData.title}
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
                value={productData.description}
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
                    value={productData.price}
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
                  value={productData.discount}
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
                  value={productData.stock}
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
                  value={productData.category}
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

            <div className="pt-4">
              <button
                type="submit"
                disabled={loading}
                className="flex w-full justify-center items-center rounded-md border border-transparent bg-blue-600 py-3 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                {loading ? (
                  <>
                    <FiLoader className="animate-spin mr-2" />
                    Adding Product...
                  </>
                ) : (
                  <>
                    <FiPlus className="mr-2" />
                    Add Product
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

export default AddProduct;