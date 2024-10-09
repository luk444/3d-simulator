import React, { useRef, useEffect, useState } from "react";
import "@google/model-viewer";

const ProductView = () => {
  const modelViewerRef = useRef(null);
  const [modelSrc, setModelSrc] = useState(null);
  const [isARSupported, setIsARSupported] = useState(false);

  // Verifica si el dispositivo soporta AR
  useEffect(() => {
    if (modelViewerRef.current) {
      const supportsAR = modelViewerRef.current.canActivateAR;
      setIsARSupported(!!supportsAR);
    }
  }, []);

  const handleARClick = () => {
    if (isARSupported) {
      modelViewerRef.current.activateAR();
    } else {
      alert("AR no es compatible en este dispositivo. Prueba en un dispositivo móvil.");
    }
  };

  // Función para manejar la carga del archivo GLB o GLTF
  const handleModelUpload = (event) => {
    const file = event.target.files[0];
    if (file && (file.name.endsWith(".glb") || file.name.endsWith(".gltf"))) {
      const objectURL = URL.createObjectURL(file);
      setModelSrc(objectURL); // Establece la fuente del modelo cargado
    } else {
      alert("Por favor selecciona un archivo .glb o .gltf");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="max-w-lg w-full bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-2 text-center">Carga tu propio objeto 3D</h1>
        <p className="text-gray-600 mb-4 text-center">
          Visualiza el objeto en tu entorno o carga tu propio archivo 3D (.glb o .gltf).
        </p>

        {/* Botón para cargar archivo 3D */}
        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Cargar un archivo 3D (.glb o .gltf):
          </label>
          <input
            type="file"
            accept=".glb, .gltf"
            onChange={handleModelUpload}
            className="block w-full text-sm text-gray-900 bg-gray-50 rounded border border-gray-300 cursor-pointer focus:outline-none"
          />
        </div>

        {/* Componente para el modelo 3D y AR */}
        <model-viewer
          ref={modelViewerRef}
          src={modelSrc || "https://modelviewer.dev/shared-assets/models/Astronaut.glb"} // Usa el modelo cargado o uno por defecto
          alt="Modelo 3D"
          ar
          auto-rotate
          camera-controls
          shadow-intensity="1"
          style={{ width: "100%", height: "400px" }}
        ></model-viewer>

        {/* Botón para ver en AR */}
        <div className="mt-4">
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
            onClick={handleARClick}
          >
            Ver en mi entorno (AR)
          </button>
        </div>

        {/* Mostrar un mensaje si AR no es compatible */}
        {!isARSupported && (
          <p className="text-red-500 mt-4">
            AR no está disponible en este dispositivo. Prueba en un móvil compatible.
          </p>
        )}
      </div>
    </div>
  );
};

export default ProductView;
