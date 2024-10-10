import React from "react";
import "@google/model-viewer";

const ProductDetail = ({ product, onAddToCart, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20">
      <div className="bg-white p-8 rounded-lg max-w-md w-full">
        <h3 className="text-2xl font-bold mb-2">{product.title}</h3>
        <p className="text-gray-600 mb-4">{product.description}</p>
        <p className="text-xl font-bold mb-4">${product.price}</p>

        {/* Ver en AR */}
        <model-viewer
          src={product.model}
          alt={product.title}
          ar
          auto-rotate
          camera-controls
          shadow-intensity="1"
          style={{ width: "100%", height: "300px" }}
        ></model-viewer>

        <button
          onClick={() => onAddToCart(product)}
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition mt-4"
        >
          Añadir al carrito
        </button>
        <button
          onClick={onClose}
          className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition mt-4 ml-2"
        >
          Cerrar
        </button>
      </div>
    </div>
  );
};

export default ProductDetail;
