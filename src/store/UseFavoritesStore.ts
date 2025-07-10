import { create } from "zustand";
import { persist } from "zustand/middleware";

interface FavoritesStore {
  favorites: string[];
  toggleFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
}

export const useFavoritesStore = create<FavoritesStore>()(
  persist(
    (set, get) => ({
      favorites: [],
      toggleFavorite: (id) => {
        const current = get().favorites;
        const isFav = current.includes(id);
        set({
          favorites: isFav
            ? current.filter((f) => f !== id)
            : [...current, id],
        });
      },
      isFavorite: (id) => get().favorites.includes(id),
    }),
    {
      name: "favorites-storage",
    }
  )
);
