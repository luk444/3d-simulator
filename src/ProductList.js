import React from "react";

const ProductList = ({ products, onSelectProduct }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-8">
      {products.map((product) => (
        <div
          key={product.id}
          className="bg-white shadow-md rounded-lg p-4 cursor-pointer"
          onClick={() => onSelectProduct(product)}
        >
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-48 object-cover rounded-md mb-4"
          />
          <h3 className="text-lg font-bold">{product.title}</h3>
          <p className="text-gray-600">${product.price}</p>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
