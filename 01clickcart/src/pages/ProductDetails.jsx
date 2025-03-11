import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const ProductDetails = () => {
  const { id } = useParams();
  const products = useSelector((state) => state.products.products);
  const product = products.find((p) => p.id === parseInt(id));

  if (!product) {
    return <h2 className="text-center text-red-500">Product not found</h2>;
  }

  return (
    <div className="container mx-auto p-6">
      <div className="max-w-2xl mx-auto bg-white p-6 shadow-lg rounded-lg">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-64 object-cover rounded-lg"
        />
        <h2 className="text-2xl font-bold mt-4">{product.title}</h2>
        <p className="text-gray-600 mt-2">${product.price}</p>
        {product.onSale && (
          <p className="text-red-500 font-bold">Sale: {product.discount}% Off</p>
        )}
        <button className="mt-4 bg-blue-500 text-white px-6 py-2 rounded">
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductDetails;
