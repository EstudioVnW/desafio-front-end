"use client";

import React, { useEffect, useState } from "react";
import { getImages } from "../services/unsplashService";
import Modal from "./Modal";

const ImageGallery: React.FC = () => {
  const [images, setImages] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("nature");
  const [inputValue, setInputValue] = useState("nature");
  const [selectedImage, setSelectedImage] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchImages = async (searchTerm: string) => {
    setLoading(true);
    setError("");
    try {
      const result = await getImages(searchTerm);
      setImages(result);
    } catch (err) {
      setError("Erro ao carregar imagens.");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchImages(query);
  }, [query]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setQuery(inputValue);
  };

  const handleImageClick = (img: any) => {
    setSelectedImage(img);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  // Agora tudo que exibe na tela precisa estar dentro do return!
  return (
    <div className="flex flex-col items-center w-full">
      {/* Barra de pesquisa */}
      <form onSubmit={handleSearch} className="mb-8 w-full max-w-md flex">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Pesquise por tema: natureza, gatos, praia..."
          className="flex-1 p-2 border rounded-l outline-none"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white p-2 rounded-r hover:bg-blue-700 transition"
        >
          Buscar
        </button>
      </form>

      {/* Mensagens de loading ou erro */}
      {loading && <p>Carregando imagens...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {/* Grid de imagens */}
      <div className="flex flex-wrap gap-4 justify-center">
        {images.map((img) => (
          <img
            key={img.id}
            src={img.urls.small}
            alt={img.alt_description || "Imagem do Unsplash"}
            className="rounded shadow w-64 h-64 object-cover cursor-pointer hover:scale-105 transition"
            onClick={() => handleImageClick(img)}
          />
        ))}
      </div>

      {/* Modal */}
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        {selectedImage && (
          <div>
            <img
              src={selectedImage.urls.regular}
              alt={selectedImage.alt_description || "Imagem do Unsplash"}
              className="rounded-lg mb-4 w-full h-auto"
              loading="lazy"
            />
            <h2 className="font-semibold">{selectedImage.user?.name}</h2>
            <p className="text-gray-600">
              {selectedImage.description || "Sem descrição"}
            </p>
            <a
              href={selectedImage.user?.links.html}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline mt-2 block"
            >
              Ver perfil do autor no Unsplash
            </a>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default ImageGallery;
