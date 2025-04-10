import React, { useState, useEffect } from "react";
import { databases, storage, account, ID } from "../appwrite/appwriteConfig";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const [productData, setProductData] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    stock: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState(null); 
  const navigate = useNavigate();

  useEffect(() => {
    const getCurrentUser = async () => {
      try {
        const user = await account.get();
        setUserId(user.$id);
      } catch (error) {
        console.error("Failed to fetch user", error);
      }
    };

    getCurrentUser();
  }, []);

  const handleChange = (e) => {
    setProductData({ ...productData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userId) {
      alert("User not authenticated");
      return;
    }

    setLoading(true);

    try {
      let imageUrl = "";

      if (imageFile) {
        const imageUpload = await storage.createFile(
          "67cad81f00268d3093c5", // Bucket ID
          ID.unique(),
          imageFile
        );

        imageUrl = storage.getFileView("67cad81f00268d3093c5", imageUpload.$id);
      }

      await databases.createDocument(
        "67cad7e600027ac7e8c0", // Database ID
        "67ea560f00044ac3e66b", // Product Collection ID
        ID.unique(),
        {
          title: productData.title,
          description: productData.description,
          price: Number(productData.price),
          category: productData.category,
          stock: Number(productData.stock),
          image: imageUrl,
          sellerId: userId,
        }
      );

      alert("Product added successfully!");
      navigate("/seller-dashboard/my-products"); 
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Failed to add product. Check console for details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">

      <button
        onClick={() => navigate("/seller-dashboard")}
        className="mb-4 bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-950"
      >
        ← Back to Dashboard
      </button>

      <h2 className="text-2xl font-bold mb-4">Add Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Title"
          onChange={handleChange}
          className="border p-2 w-full"
          required
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          onChange={handleChange}
          className="border p-2 w-full"
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          onChange={handleChange}
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
          placeholder="Category"
          onChange={handleChange}
          className="border p-2 w-full"
          required
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="border p-2 w-full"
          required
        />

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
          disabled={loading}
        >
          {loading ? "Adding..." : "Add Product"}
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
