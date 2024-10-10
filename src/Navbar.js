import React, { useState } from "react";

const Navbar = ({ cart, total }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <nav className="bg-blue-500 text-white p-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold">Tienda de Muebles</h1>
      <div className="relative">
        {/* Botón del carrito */}
        <button
          className="bg-blue-600 p-2 rounded-full relative"
          onClick={() => setIsCartOpen(!isCartOpen)}
        >
          🛒 {cart.length} {/* Mostrar la cantidad de productos en el carrito */}
        </button>

        {/* Carrito desplegable */}
        {isCartOpen && (
          <div className="absolute right-0 mt-2 w-64 bg-white text-black shadow-lg p-4 rounded-md z-10">
            <h2 className="font-bold mb-2">Carrito</h2>
            <ul>
              {cart.length === 0 ? (
                <li>El carrito está vacío</li>
              ) : (
                cart.map((product, index) => (
                  <li key={index} className="flex justify-between mb-2">
                    <span>{product.title}</span>
                    <span>${product.price}</span>
                  </li>
                ))
              )}
            </ul>
            <div className="mt-4 font-bold">Total: ${total}</div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
