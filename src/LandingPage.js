import React, { useState } from "react";
import "@google/model-viewer";

const LandingPage = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cartCount, setCartCount] = useState(0);
  const [products, setProducts] = useState([
    {
      id: 1,
      title: "Sofá Moderno",
      description:
        "Este sofá moderno está diseñado para brindar comodidad y estilo en cualquier espacio.",
      price: "$499.99",
      image: "https://img-new.cgtrader.com/items/2397542/6124b2c7da/black-leather-chair-3d-model-low-poly-obj-fbx-blend-gltf.jpg",
      modelUrl: "https://raw.githubusercontent.com/luk444/models-3d-repo/main/models-3d/sillon.gltf",
    },
    {
      id: 2,
      title: "Sillon Polk",
      description:
        "Una silla elegante, perfecta para darle un toque moderno a tu sala de estar.",
      price: "$199.99",
      image: "https://img-new.cgtrader.com/items/3902233/5443218b80/large/wooden-armchair-3d-model-low-poly-max-obj-fbx-blend-gltf.jpg",
      modelUrl: "https://raw.githubusercontent.com/luk444/models-3d-repo/main/models-3d/silla.glb",
    },
  ]);

  const [newProduct, setNewProduct] = useState({
    title: "",
    description: "",
    price: "",
    modelUrl: null, // Cambiado a modelUrl para guardar la URL del modelo cargado
    imageUrl: "", // Estado para la URL de la imagen
    open: false, // Estado para el modal
  });

  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  const handleAddToCart = () => {
    setCartCount(cartCount + 1);
    alert("Producto añadido al carrito");
  };

  const handleARClick = () => {
    if (selectedProduct && selectedProduct.modelUrl) {
      const modelViewer = document.querySelector("model-viewer");
      modelViewer.activateAR();
    }
  };

  const handleAddProductClick = () => {
    const newId = products.length + 1; // Asigna un ID único
    const newProductData = {
      ...newProduct,
      id: newId,
      // image: newProduct.imageUrl, // Usa la URL ingresada
    };

    setProducts([...products, { ...newProductData, image: newProduct.imageUrl }]); // Agrega el nuevo producto
    setNewProduct({ title: "", description: "", price: "", modelUrl: null, imageUrl: "", open: false }); // Resetear el formulario
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewProduct({ ...newProduct, modelUrl: reader.result }); // Almacena la URL del modelo
      };
      reader.readAsDataURL(file); // Lee el archivo como URL de datos
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleAddProductClick();
  };

  return (
    <div>
      {/* Navbar */}
      <nav className="bg-gradient-to-r from-gray-600 to-gray-500 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-2xl font-bold">Tienda de Muebles</div>
          <div className="flex items-center">
            <button className="relative" onClick={() => setNewProduct({ ...newProduct, open: true })}>
              <span className="material-icons">shopping_cart</span>
              <span className="absolute -top-1 -right-2 bg-red-600 text-white rounded-full text-xs px-1">
                {cartCount}
              </span>
            </button>
            <button
              onClick={() => setNewProduct({ ...newProduct, open: true })} // Abrir modal para agregar producto
              className="ml-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Agregar Producto
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-300 to-blue-600 text-white py-16">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl font-extrabold mb-4">Bienvenido a la Tienda de Muebles</h1>
          <p className="text-lg mb-8">Encuentra muebles de alta calidad para tu hogar.</p>
          <button className="bg-blue-500 text-white py-3 px-6 rounded-lg hover:bg-blue-600 transition duration-300">
            Explorar Muebles
          </button>
        </div>
      </section>

      {/* Productos */}
      <section className="container mx-auto py-12">
        <h2 className="text-4xl font-bold text-center mb-8">Nuestros Productos</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105 cursor-pointer"
              onClick={() => handleProductClick(product)}
            >
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-72 object-cover"
              />
              <div className="p-4">
                <h3 className="text-2xl font-semibold">{product.title}</h3>
                <p className="text-gray-700 text-lg">{product.price}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Modal de Producto Seleccionado */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg max-w-lg w-full p-6">
            <h3 className="text-3xl font-bold mb-2">{selectedProduct.title}</h3>
            <p className="text-gray-700 mb-4">{selectedProduct.description}</p>
            <p className="text-gray-800 font-bold text-xl mb-4">
              {selectedProduct.price}
            </p>

            {/* Botón para añadir al carrito */}
            <button
              className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition duration-300 mb-4"
              onClick={handleAddToCart}
            >
              Añadir al Carrito
            </button>

            {/* Botón para ver en AR */}
            <button
              className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300 mb-4"
              onClick={handleARClick}
            >
              Ver en mi ambiente (AR)
            </button>

            {/* Modelo 3D y AR */}
            <model-viewer
              src={selectedProduct.modelUrl}
              ar
              auto-rotate
              camera-controls
              shadow-intensity="1"
              style={{ width: "100%", height: "400px" }}
            ></model-viewer>

            <button
              className="mt-4 text-red-500 underline"
              onClick={() => setSelectedProduct(null)}
            >
              Cerrar
            </button>
          </div>
        </div>
      )}

      {/* Modal para Agregar Producto */}
      {newProduct.open && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg max-w-lg w-full p-6">
            <h2 className="text-2xl font-bold mb-4">Agregar Nuevo Producto</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700">Título</label>
                <input
                  type="text"
                  value={newProduct.title}
                  onChange={(e) => setNewProduct({ ...newProduct, title: e.target.value })}
                  required
                  className="border rounded-lg w-full p-2"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Descripción</label>
                <textarea
                  value={newProduct.description}
                  onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                  required
                  className="border rounded-lg w-full p-2"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Precio</label>
                <input
                  type="text"
                  value={newProduct.price}
                  onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                  required
                  className="border rounded-lg w-full p-2"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">URL de la imagen</label>
                <input
                  type="text"
                  value={newProduct.imageUrl}
                  onChange={(e) => setNewProduct({ ...newProduct, imageUrl: e.target.value })}
                  required
                  className="border rounded-lg w-full p-2"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Modelo 3D (Archivo .gltf o .glb)</label>
                <input
                  type="file"
                  accept=".gltf, .glb"
                  onChange={handleFileChange}
                  className="border rounded-lg w-full p-2"
                />
              </div>
              <button
                type="submit"
                className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
              >
                Agregar Producto
              </button>
              <button
                className="mt-2 text-red-500 underline"
                onClick={() => setNewProduct({ ...newProduct, open: false })}
              >
                Cerrar
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default LandingPage;