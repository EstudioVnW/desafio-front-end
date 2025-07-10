import { useState, useEffect } from "react";

// Meu hook de favoritos, preparado para SSR-safe com Next.js.
export function useFavorites() {
  // Estado com a lista de IDs das imagens favoritas
  const [favorites, setFavorites] = useState<string[]>([]);

  // Carrego os favoritos do localStorage somente no client (useEffect só roda no client)
  useEffect(() => {
    const stored = localStorage.getItem("favorites");
    if (stored) setFavorites(JSON.parse(stored));
  }, []);

  // Sempre que favorites mudar, salvo no localStorage
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  // Verifico se o ID está na lista de favoritos
  function isFavorite(id: string) {
    return favorites.includes(id);
  }

  // Toggle: se já é favorito, remove; se não é, adiciona
  function toggleFavorite(id: string) {
    setFavorites((prev) =>
      prev.includes(id)
        ? prev.filter((favId) => favId !== id)
        : [...prev, id]
    );
  }

  // Exporto a lista, o checker e o toggle
  return { favorites, isFavorite, toggleFavorite };
}
