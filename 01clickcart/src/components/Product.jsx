import React from "react";

const Product = ({ product, addToCart, buyNow }) => {
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
      <div className="flex justify-center gap-2 mt-3">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-lg"
          onClick={() => addToCart(product)}
        >
          Add to Cart
        </button>
        {buyNow && (
          <button
            className="bg-green-500 text-white px-4 py-2 rounded-lg"
            onClick={() => buyNow(product)}
          >
            Buy Now
          </button>
        )}
      </div>
    </div>
  );
};

export default Product;