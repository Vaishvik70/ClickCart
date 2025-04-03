import React, { useState } from "react";
import { databases, storage, ID } from "../appwrite/appwriteConfig";

const AddProduct = () => {
  const [productData, setProductData] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setProductData({ ...productData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let imageUrl = "";
      
      // ✅ Upload image to Appwrite Storage if file is selected
      if (imageFile) {
        const imageUpload = await storage.createFile(
          "67cad81f00268d3093c5",  // ✅ Replace with your Appwrite Storage bucket ID
          ID.unique(),
          imageFile
        );

        // ✅ Get public URL of uploaded image
        imageUrl = storage.getFileView("67cad81f00268d3093c5", imageUpload.$id);
      }

      // ✅ Create product document in Appwrite
      await databases.createDocument(
        "67cad7e600027ac7e8c0",  // Database ID
        "67ea560f00044ac3e66b",  // Product Collection ID
        ID.unique(),
        {
          title: productData.title,
          description: productData.description,
          price: Number(productData.price),
          category: productData.category,
          image: imageUrl, // ✅ Store image URL
          sellerId: "seller-123", // Replace with actual seller ID
        }
      );

      alert("Product added successfully!");
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Failed to add product. Check console for details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Add Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input 
        type="text" 
        name="title" 
        placeholder="Title" 
        onChange={handleChange} 
        className="border p-2 w-full" required 
        />
        <input 
        type="text" 
        name="description" 
        placeholder="Description" 
        onChange={handleChange} 
        className="border p-2 w-full" required 
        />
        <input 
        type="number" 
        name="price" 
        placeholder="Price" 
        onChange={handleChange} 
        className="border p-2 w-full" required 
        />
        <input 
        type="text" 
        name="category" 
        placeholder="Category" 
        onChange={handleChange} 
        className="border p-2 w-full" required 
        />
        
        {/* ✅ Image Upload Field */}
        <input 
        type="file" 
        accept="image/*" 
        onChange={handleImageChange} 
        className="border p-2 w-full" required 
        />

        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded" disabled={loading}>
          {loading ? "Adding..." : "Add Product"}
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
