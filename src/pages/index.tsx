import React, { useState, useEffect } from "react";
import Modal from "../components/Modal";
import { useFavoritesStore } from "../store/UseFavoritesStore";
import { Search, Filter } from "lucide-react";
import { searchPhotos } from "../../lib/unsplash";
import PhotoCard from "../components/PhotoCard";
import { Photo } from "../styles/types/photo";

export default function Home() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showFavorites, setShowFavorites] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const favoritesStore = useFavoritesStore();

  useEffect(() => {
    handleSearch("nature");
  }, []);

  async function handleSearch(term: string) {
    setLoading(true);
    setError(null);
    try {
      const results = await searchPhotos(term);
      setPhotos(results);
    } catch (error: any) {
      console.error("Erro ao buscar imagens:", error);
      setError(error.message || "Erro desconhecido ao buscar imagens.");
    } finally {
      setLoading(false);
    }
  }

  const favoritePhotos = photos.filter((photo) =>
    favoritesStore.isFavorite(photo.id)
  );

  const filteredPhotos = (showFavorites ? favoritePhotos : photos).filter(
    (photo) =>
      photo.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      photo.alt_description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  function openModal(photo: Photo) {
    setSelectedPhoto(photo);
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
    setSelectedPhoto(null);
  }

  return (
    <>
      <nav className="w-full bg-white shadow-sm flex items-center px-4 sm:px-6 md:px-8 py-3 mb-8 justify-between relative">
        <div className="flex items-center gap-4 sm:gap-6 md:gap-10 min-w-0">
          <span className="text-lg sm:text-xl md:text-2xl font-bold text-pink-500 select-none truncate max-w-[40vw]">
            Galeria de Fotos
          </span>
          <div className="flex gap-4 sm:gap-6">
            <button
              className={`text-base font-medium focus:outline-none transition-colors ${
                !showFavorites ? "text-pink-500" : "text-gray-700"
              } hover:text-pink-400`}
              onClick={() => {
                setShowFavorites(false);

                if (photos.length === 0) {
                  handleSearch("nature");
                }
              }}
            >
              Todas
            </button>
            <button
              className={`text-base font-medium transition-colors ${
                showFavorites ? "text-pink-500" : "text-gray-700"
              } hover:text-pink-400`}
              onClick={() => setShowFavorites(true)}
            >
              Favoritos
            </button>
          </div>
        </div>

        <div className="flex items-center relative">
          <button
            className="p-2 text-gray-500 hover:text-pink-500 focus:outline-none"
            onClick={() => setSearchOpen((v) => !v)}
            aria-label="Abrir busca"
          >
            <Search size={20} />
          </button>

          <input
            type="text"
            placeholder="Buscar por autor ou descrição..."
            value={searchTerm}
            onChange={(e) => {
              const value = e.target.value;
              setSearchTerm(value);
              handleSearch(value);
            }}
            className={`px-4 py-2 w-60 sm:w-64 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200 ml-2 bg-white z-20 absolute top-12 right-0 ${
              searchOpen ? "block" : "hidden"
            }`}
            autoFocus={searchOpen}
            onBlur={() => setSearchOpen(false)}
          />
          <button
            className="p-2 text-gray-500 hover:text-pink-500 focus:outline-none ml-2"
            onClick={() => setShowFilters((v) => !v)}
            aria-label="Abrir filtros"
          >
            <Filter size={20} />
          </button>
          {showFilters && (
            <div className="absolute right-0 top-12 bg-white shadow-lg rounded-md p-2 flex flex-col gap-2 z-30">
              {["Nature", "Animals", "City", "Technology"].map((category) => (
                <button
                  key={category}
                  onClick={() => {
                    handleSearch(category.toLowerCase());
                    setShowFilters(false);
                  }}
                  className="px-4 py-1 text-sm rounded bg-gray-200 hover:bg-pink-500 hover:text-white transition text-left"
                >
                  {category}
                </button>
              ))}
            </div>
          )}
        </div>
      </nav>

      <div className="min-h-screen bg-gray-100 px-4 sm:px-6 md:px-8 pb-8 pt-0">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-16">
            <svg
              className="animate-spin h-8 w-8 text-pink-500 mb-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
              ></path>
            </svg>
            <p className="text-center text-pink-500 text-lg animate-pulse">
              Carregando fotos...
            </p>
          </div>
        ) : error ? (
          <div className="text-center text-red-500 text-lg mt-4">{error}</div>
        ) : filteredPhotos.length === 0 ? (
          <p className="text-center text-gray-500">Nenhuma foto encontrada.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredPhotos.map((photo) => (
              <PhotoCard
                key={photo.id}
                photo={photo}
                isFavorite={favoritesStore.isFavorite(photo.id)}
                onToggleFavorite={() =>
                  favoritesStore.toggleFavorite(photo.id)
                }
                onClick={() => openModal(photo)}
              />
            ))}
          </div>
        )}
      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal} photo={selectedPhoto} />
    </>
  );
}
