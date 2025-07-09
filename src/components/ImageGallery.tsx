"use client";

import React, { useEffect, useState } from "react";
import { getImages } from "../services/unsplashService";
import Modal from "./Modal";
import { useFavorites } from "../hooks/useFavorites";

// Componente principal da galeria de imagens da Thaty
const ImageGallery: React.FC = () => {
  // Estados principais
  const [images, setImages] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("nature");
  const [inputValue, setInputValue] = useState("nature");
  const [selectedImage, setSelectedImage] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);

  // Favoritos (hook customizado)
  const { favorites, isFavorite, toggleFavorite } = useFavorites();

  // Função para buscar imagens da API
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

  // Sempre que o termo de busca muda, busco novas imagens
  useEffect(() => {
    fetchImages(query);
  }, [query]);

  // Imagens favoritas (filtra as imagens do array principal)
  const favoriteImages = images.filter((img) => favorites.includes(img.id));

  // Handler do formulário de busca
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setQuery(inputValue);
  };

  // Handler do clique na imagem para abrir o modal
  const handleImageClick = (img: any) => {
    setSelectedImage(img);
    setIsModalOpen(true);
  };

  // Handler para fechar o modal de detalhes
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  // Handler para abrir/fechar modal de favoritos
  const handleOpenFavorites = () => setIsFavoritesOpen(true);
  const handleCloseFavorites = () => setIsFavoritesOpen(false);

  return (
    <div className="flex flex-col items-center w-full">
      {/* Botão para abrir modal de favoritos */}
      <button
        className="self-end mb-4 bg-pink-500 text-white px-4 py-2 rounded shadow hover:bg-pink-700 transition"
        onClick={handleOpenFavorites}
      >
        ⭐ Ver Favoritos ({favorites.length})
      </button>

      {/* Modal de favoritos */}
      <Modal isOpen={isFavoritesOpen} onClose={handleCloseFavorites}>
        <h2 className="text-xl font-bold mb-4">Meus Favoritos</h2>
        {favoriteImages.length === 0 ? (
          <p className="text-gray-600">Nenhuma foto favoritada ainda.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {favoriteImages.map((img) => (
              <div key={img.id} className="flex flex-col items-center">
                <img
                  src={img.urls.small}
                  alt={img.alt_description || "Imagem do Unsplash"}
                  className="rounded w-full h-32 object-cover"
                  onClick={() => handleImageClick(img)}
                  style={{ cursor: "pointer" }}
                />
                <span className="mt-1 text-xs">{img.user?.name}</span>
              </div>
            ))}
          </div>
        )}
      </Modal>

      {/* Barra de pesquisa */}
      <form onSubmit={handleSearch} className="mb-8 w-full max-w-md flex">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Pesquise por tema: natureza, gatos, praia..."
          className="flex-1 p-2 border border-gray-300 rounded-l outline-none focus:ring-2 focus:ring-pink-400"
        />
        <button
          type="submit"
          className="bg-pink-600 text-white p-2 rounded-r hover:bg-pink-700 transition"
        >
          Buscar
        </button>
      </form>

      {/* Mensagens de loading/erro */}
      {loading && <p>Carregando imagens...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {/* Grid de imagens */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full max-w-6xl mx-auto">
        {images.map((img) => (
          <div
            key={img.id}
            className="relative flex flex-col items-center bg-white rounded-lg shadow-lg p-2"
          >
            {/* Imagem */}
            <img
              src={img.urls.small}
              alt={img.alt_description || "Imagem do Unsplash"}
              className="rounded-lg w-full h-56 object-cover cursor-pointer hover:scale-105 transition"
              onClick={() => handleImageClick(img)}
              loading="lazy"
            />
            {/* Nome do autor */}
            <span className="mt-2 text-sm text-gray-700 font-semibold text-center w-full">
              {img.user?.name}
            </span>
            {/* Botão de coração */}
            <button
              onClick={() => toggleFavorite(img.id)}
              className={`
    absolute top-2 right-2 text-2xl transition
    ${isFavorite(img.id) ? "animate-pulse text-pink-500" : "text-gray-300"}
  `}
              aria-label={
                isFavorite(img.id)
                  ? "Remover dos favoritos"
                  : "Adicionar aos favoritos"
              }
            >
              {isFavorite(img.id) ? "❤️" : "🤍"}
            </button>
          </div>
        ))}
      </div>

      {/* Modal de detalhes da foto */}
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        {selectedImage && (
          <div>
            <img
              src={selectedImage.urls.regular}
              alt={selectedImage.alt_description || "Imagem do Unsplash"}
              className="rounded-lg mb-4 w-full h-auto"
              loading="lazy"
            />
            <h2 className="font-semibold text-center">
              {selectedImage.user?.name}
            </h2>
            <p className="text-gray-600 text-center">
              {selectedImage.description || "Sem descrição"}
            </p>
            <a
              href={selectedImage.user?.links.html}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline mt-2 block text-center"
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
