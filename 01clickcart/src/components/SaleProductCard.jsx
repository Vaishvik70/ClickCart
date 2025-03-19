import React from "react";
import { useNavigate } from "react-router-dom";

const SaleProductCard = ({ product }) => {
  const navigate = useNavigate();

  const goToProductDetail = () => {
    navigate(`/sale-product/${product.id}`, { state: { product } });
  };

  return (
    <div className="bg-gray-700 p-4 rounded-lg shadow-lg">
      <img
        src={product.image}
        alt={product.title}
        className="w-full h-40 object-cover rounded cursor-pointer"
        onClick={goToProductDetail}
      />
      <h2
        className="text-white font-bold text-lg mt-2 cursor-pointer"
        onClick={goToProductDetail}
      >
        {product.title}
      </h2>
      <p className="text-red-400 font-bold">
        Sale Price: ₹{product.price - product.discount} {/* Correct Calculation */}
      </p>
      <p className="text-gray-300 line-through">Original: ₹{product.price}</p>
      <button
        className="bg-red-500 text-white px-4 py-2 rounded mt-2 w-full"
        onClick={() => navigate(`/payment`, { state: { product } })}
      >
        Buy Now
      </button>
    </div>
  );
};

export default SaleProductCard;
