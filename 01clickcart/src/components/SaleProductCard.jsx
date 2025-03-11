import React from "react";

const SaleProductCard = ({ product }) => {
  // Ensure product object has all required properties
  if (!product) {
    return <div className="text-white">No product available</div>;
  }

  return (
    <div className="bg-gray-700 p-4 rounded-lg text-center w-60 shadow-md">
      <img
        src={product.image}
        alt={product.title}
        className="w-full h-32 object-cover rounded-md mb-2"
      />
      <h3 className="text-lg font-semibold text-white">{product.title}</h3>
      <p className="text-red-400 font-bold">
        Sale Price: ${product.price - (product.price * product.discount) / 100}
      </p>
      <p className="text-gray-400 line-through">Original: ${product.price}</p>
    </div>
  );
};

export default SaleProductCard;
