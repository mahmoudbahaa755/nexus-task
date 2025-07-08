import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Movie } from "../types/movie";

interface FavoritesState {
  favorites: Movie[];
  addToFavorites: (movie: Movie) => void;
  removeFromFavorites: (imdbID: string) => void;
  isFavorite: (imdbID: string) => boolean;
  clearFavorites: () => void;
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favorites: [],

      addToFavorites: (movie: Movie) => {
        const { favorites } = get();
        const isAlreadyFavorite = favorites.some(
          (fav) => fav.imdbID === movie.imdbID
        );

        if (!isAlreadyFavorite) {
          set({ favorites: [...favorites, movie] });
        }
      },

      removeFromFavorites: (imdbID: string) => {
        const { favorites } = get();
        set({ favorites: favorites.filter((fav) => fav.imdbID !== imdbID) });
      },

      isFavorite: (imdbID: string) => {
        const { favorites } = get();
        return favorites.some((fav) => fav.imdbID === imdbID);
      },

      clearFavorites: () => {
        set({ favorites: [] });
      },
    }),
    {
      name: "movie-favorites", // localStorage key
    }
  )
);
