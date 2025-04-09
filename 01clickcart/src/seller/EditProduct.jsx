import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { databases, storage, ID } from "../appwrite/appwriteConfig";

const DATABASE_ID = "67cad7e600027ac7e8c0";
const COLLECTION_ID = "67ea560f00044ac3e66b";
const BUCKET_ID = "67cad81f00268d3093c5";

const EditProduct = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const product = state?.product;

  const [formData, setFormData] = useState({
    title: product?.title || "",
    description: product?.description || "",
    price: product?.price || "",
    category: product?.category || "",
    stock: product?.stock || "",
  });

  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!product) {
      alert("No product data found");
      return;
    }

    setLoading(true);
    try {
      let imageUrl = product.image;

      if (imageFile) {
        const uploadedImage = await storage.createFile(BUCKET_ID, ID.unique(), imageFile);
        imageUrl = storage.getFileView(BUCKET_ID, uploadedImage.$id);
      }

      await databases.updateDocument(DATABASE_ID, COLLECTION_ID, product.$id, {
        title: formData.title,
        description: formData.description,
        price: Number(formData.price),
        category: formData.category,
        stock: Number(formData.stock),
        image: imageUrl,
      });

      alert("Product updated successfully!");
      navigate("/seller-dashboard/my-products");
    } catch (error) {
      console.error("Failed to update product:", error);
      alert("Failed to update product. Check console for details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <button
        onClick={() => navigate("/seller-dashboard/my-products")}
        className="mb-4 bg-gray-700 text-white px-4 py-2 rounded"
      >
        ← Back to My Products
      </button>

      <h2 className="text-2xl font-bold mb-4">Edit Product</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Title"
          className="border p-2 w-full"
          required
        />
        <input
          type="text"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
          className="border p-2 w-full"
          required
        />
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          placeholder="Price"
          className="border p-2 w-full"
          required
        />
        <input
          type="number"
          name="stock"
          placeholder="Stock"
          onChange={handleChange}
          className="border p-2 w-full"
          required
        />
        <input
          type="text"
          name="category"
          value={formData.category}
          onChange={handleChange}
          placeholder="Category"
          className="border p-2 w-full"
          required
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="border p-2 w-full"
        />

        {product.image && (
          <img
            src={product.image}
            alt="Current product"
            className="w-32 h-32 object-cover rounded"
          />
        )}

        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded"
          disabled={loading}
        >
          {loading ? "Updating..." : "Update Product"}
        </button>
      </form>
    </div>
  );
};

export default EditProduct;
