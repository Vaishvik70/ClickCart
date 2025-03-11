import React from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  if (!product) {
    return null; // Prevents rendering if product is undefined
  }

  return (
    <div className="bg-white shadow-md p-4 rounded-lg">
      <Link to={`/product/${product.id}`} className="block">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-40 object-cover rounded-md"
        />
        <h3 className="text-lg font-semibold mt-2">{product.title}</h3>
      </Link>
      <p className="text-gray-600">${product.price}</p>
      {product.onSale && (
        <p className="text-red-500 font-bold">Sale: {product.discount}% Off</p>
      )}
      <button className="mt-2 bg-blue-500 text-white px-4 py-2 rounded">
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
