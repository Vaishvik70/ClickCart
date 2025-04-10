import React from "react";
import { useNavigate } from "react-router-dom";

const Product = ({ product, addToCart, buyNow, isLoggedIn }) => {
  const navigate = useNavigate();

  const handleLoginRedirect = () => {
    navigate("/login"); 
  };

  return (
    <div className="border p-4 rounded-lg shadow-lg text-center">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-40 object-contain mb-4"
      />
      <h3 className="text-lg font-semibold">{product.name}</h3>
      <p className="text-gray-600">₹{product.price}</p>
      
      {product.sale > 0 && (
        <p className="text-red-500">Sale: {product.sale}% Off</p>
      )}

      {product.stock === 0 ? (
        <p className="text-red-500 font-bold mt-3">Out of Stock</p>
      ) : !isLoggedIn ? (
        <div>
          <p className="text-gray-500 font-semibold mt-3">Please log in to purchase</p>
          <button 
            className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-2"
            onClick={handleLoginRedirect}
          >
            Login
          </button>
        </div>
      ) : (
        <div className="flex justify-center gap-2 mt-3">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-lg disabled:bg-gray-400"
            onClick={() => addToCart(product)}
            disabled={product.stock === 0} // Disable if out of stock
          >
            Add to Cart
          </button>
          
          {buyNow && (
            <button
              className="bg-green-500 text-white px-4 py-2 rounded-lg disabled:bg-gray-400"
              onClick={() => buyNow(product)}
              disabled={product.stock === 0} // Disable if out of stock
            >
              Buy Now
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Product;
