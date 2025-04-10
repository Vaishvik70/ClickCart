import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Client, Databases } from "appwrite";

const client = new Client();
client.setEndpoint("https://cloud.appwrite.io/v1")
      .setProject("67cad786002fe394c8a8");

const databases = new Databases(client);
const DATABASE_ID = "67cad7e600027ac7e8c0"; // Database ID
const COLLECTION_ID = "67cad7ff0005fc97c570"; // Cart Collection ID

export default function Cart() { 
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const response = await databases.listDocuments(DATABASE_ID, COLLECTION_ID);
      console.log("Cart items:", response.documents);
      setCart(response.documents);
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  };

  const updateCart = async (id, newQuantity) => {
    try {
      await databases.updateDocument(DATABASE_ID, COLLECTION_ID, id, { quantity: newQuantity });
      setCart((prevCart) =>
        prevCart.map((item) =>
          item.$id === id ? { ...item, quantity: newQuantity } : item
        )
      );
    } catch (error) {
      console.error("Error updating cart:", error);
    }
  };

  const removeFromCart = async (id) => {
    try {
      await databases.deleteDocument(DATABASE_ID, COLLECTION_ID, id);
      setCart((prevCart) => prevCart.filter((item) => item.$id !== id));
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  const totalAmount = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Cart</h1>

      {cart.length === 0 ? (
        <p className="text-gray-500">No products in cart</p>
      ) : (
        <div className="space-y-4">
          {cart.map((item) => (
            <div key={item.$id} className="border p-4 rounded-lg flex items-center gap-4 shadow-lg">
              <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded" />
              <div className="flex-1">
                <h2 className="text-lg font-semibold">{item.name}</h2>
                <p className="text-gray-600">₹{item.price}</p>
                <div className="flex items-center space-x-2 mt-2">
                  <button 
                    onClick={() => updateCart(item.$id, Math.max(1, item.quantity - 1))} 
                    className="bg-gray-300 px-3 py-1 rounded"
                    disabled={item.quantity === 1}
                  >
                    -
                  </button>
                  <span className="text-lg">{item.quantity}</span>
                  <button 
                    onClick={() => updateCart(item.$id, item.quantity + 1)} 
                    className="bg-gray-300 px-3 py-1 rounded"
                  >
                    +
                  </button>
                </div>
              </div>
              <button 
                onClick={() => removeFromCart(item.$id)} 
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Remove
              </button>
            </div>
          ))}
          <h2 className="text-xl font-bold mt-4">Total: ₹{totalAmount}</h2>
        </div>
      )}
      <div className="mt-4 flex justify-between">
        <button 
          onClick={() => navigate("/products")} 
          className="bg-blue-500 text-white py-2 px-4 rounded"
        >
          Back to Products
        </button>
      
        <button  
          onClick={() => navigate("/payment", { state: { cart } })} 
          className={`py-2 px-4 rounded ${cart.length === 0 ? "bg-gray-400 cursor-not-allowed" : "bg-red-500 text-white"}`}
          disabled={cart.length === 0}
        >
          Buy Now
        </button>

      </div>
    </div>
  );
}
