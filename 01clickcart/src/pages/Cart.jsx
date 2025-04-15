import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Client, Databases } from "appwrite";

const client = new Client();
client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("67cad786002fe394c8a8");

const databases = new Databases(client);
const DATABASE_ID = "67cad7e600027ac7e8c0";
const COLLECTION_ID = "67cad7ff0005fc97c570"; // Cart collection ID

export default function Cart() {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await databases.listDocuments(DATABASE_ID, COLLECTION_ID);
      setCart(response.documents);
    } catch (error) {
      console.error("Error fetching cart:", error);
      setError("Failed to load cart. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const updateCart = async (id, newQuantity) => {
    if (newQuantity < 1) return;
    
    try {
      await databases.updateDocument(DATABASE_ID, COLLECTION_ID, id, { 
        quantity: newQuantity 
      });
      setCart((prevCart) =>
        prevCart.map((item) =>
          item.$id === id ? { ...item, quantity: newQuantity } : item
        )
      );
    } catch (error) {
      console.error("Error updating cart:", error);
      setError("Failed to update item. Please try again.");
    }
  };

  const removeFromCart = async (id) => {
    try {
      await databases.deleteDocument(DATABASE_ID, COLLECTION_ID, id);
      setCart((prevCart) => prevCart.filter((item) => item.$id !== id));
    } catch (error) {
      console.error("Error removing item:", error);
      setError("Failed to remove item. Please try again.");
    }
  };

  const totalAmount = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  if (loading) {
    return (
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Cart</h1>
        <p>Loading your cart...</p>
      </div>
    );
  }

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Your Shopping Cart</h1>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {cart.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500 text-lg mb-4">Your cart is empty</p>
          <button
            onClick={() => navigate("/products")}
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded"
          >
            Browse Products
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {cart.map((item) => (
            <div 
              key={item.$id} 
              className="border p-4 rounded-lg flex flex-col sm:flex-row items-center gap-4 shadow-md"
            >
              <img 
                src={item.image} 
                alt={item.name} 
                className="w-24 h-24 object-cover rounded" 
              />
              <div className="flex-1 w-full">
                <h2 className="text-lg font-semibold">{item.name}</h2>
                <p className="text-gray-600">₹{item.price.toFixed(2)}</p>
                <div className="flex items-center space-x-2 mt-2">
                  <button
                    onClick={() => updateCart(item.$id, item.quantity - 1)}
                    className={`px-3 py-1 rounded ${
                      item.quantity === 1 
                        ? "bg-gray-200 cursor-not-allowed" 
                        : "bg-gray-300 hover:bg-gray-400"
                    }`}
                    disabled={item.quantity === 1}
                  >
                    -
                  </button>
                  <span className="text-lg w-8 text-center">{item.quantity}</span>
                  <button
                    onClick={() => updateCart(item.$id, item.quantity + 1)}
                    className="bg-gray-300 hover:bg-gray-400 px-3 py-1 rounded"
                  >
                    +
                  </button>
                </div>
              </div>
              <button
                onClick={() => removeFromCart(item.$id)}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded self-end sm:self-center"
              >
                Remove
              </button>
            </div>
          ))}
          
          <div className="border-t pt-4 mt-4">
            <h2 className="text-xl font-bold text-right">
              Total: ₹{totalAmount.toFixed(2)}
            </h2>
          </div>
          
          <div className="flex flex-col sm:flex-row justify-between gap-4 mt-6">
            <button
              onClick={() => navigate("/products")}
              className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded"
            >
              Continue Shopping
            </button>
            
            <button
              onClick={() => navigate("/payment", { state: { cart } })}
              className={`py-2 px-6 rounded ${
                cart.length === 0
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-red-500 hover:bg-red-600 text-white"
              }`}
              disabled={cart.length === 0}
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}