import { Calendar, Film, Heart } from "lucide-react";
import React from "react";
import { useTheme } from "../contexts/ThemeContext";
import { useFavoritesStore } from "../store/favoritesStore";
import { Movie } from "../types/movie";

interface MovieCardProps {
  movie: Movie;
  onClick: () => void;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, onClick }) => {
  const { isDarkMode } = useTheme();
  const { addToFavorites, removeFromFavorites, isFavorite } =
    useFavoritesStore();
  const isMovieFavorite = isFavorite(movie.imdbID);

  const handleImageError = (
    e: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    e.currentTarget.src = isDarkMode
      ? "https://via.placeholder.com/300x400/1f2937/9ca3af?text=No+Image"
      : "https://via.placeholder.com/300x400/f3f4f6/6b7280?text=No+Image";
  };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent triggering the card onClick
    if (isMovieFavorite) {
      removeFromFavorites(movie.imdbID);
    } else {
      addToFavorites(movie);
    }
  };
  return (
    <div
      onClick={onClick}
      className="group bg-white dark:bg-gray-800 rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700 hover:border-blue-500/50 dark:hover:border-blue-400/50 transition-all duration-300 cursor-pointer transform hover:scale-105 hover:shadow-2xl shadow-lg"
    >
      <div className="relative aspect-[3/4] overflow-hidden">
        <button
          onClick={handleFavoriteClick}
          className={`absolute top-3 right-3 z-10 p-2 rounded-full backdrop-blur-sm transition-all duration-200 hover:scale-110 ${
            isMovieFavorite
              ? "bg-red-500/90 text-white hover:bg-red-600/90"
              : "bg-white/90 dark:bg-gray-800/90 text-gray-600 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-700"
          }`}
          aria-label={
            isMovieFavorite ? "Remove from favorites" : "Add to favorites"
          }
        >
          <Heart
            className={`h-4 w-4 transition-all duration-200 ${
              isMovieFavorite ? "fill-current" : ""
            }`}
          />
        </button>

        <img
          src={
            movie.Poster !== "N/A"
              ? movie.Poster
              : isDarkMode
              ? "https://via.placeholder.com/300x400/1f2937/9ca3af?text=No+Image"
              : "https://via.placeholder.com/300x400/f3f4f6/6b7280?text=No+Image"
          }
          alt={movie.Title}
          onError={handleImageError}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute bottom-4 left-4 right-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 opacity-0 group-hover:opacity-100">
          <div className="flex items-center space-x-2 text-white text-sm">
            <Calendar className="h-4 w-4" />
            <span>{movie.Year}</span>
          </div>
          <div className="flex items-center space-x-2 text-white text-sm mt-1">
            <Film className="h-4 w-4" />
            <span className="capitalize">{movie.Type}</span>
          </div>
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-gray-900 dark:text-white font-semibold text-lg mb-2 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
          {movie.Title}
        </h3>
        <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
          <span>{movie.Year}</span>
          <span className="capitalize px-2 py-1 bg-blue-100 dark:bg-blue-900/30 rounded-full text-blue-700 dark:text-blue-300">
            {movie.Type}
          </span>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
