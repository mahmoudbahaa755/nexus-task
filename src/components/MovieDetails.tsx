import {
  Award,
  Calendar,
  Clock,
  Globe,
  Heart,
  Star,
  Users,
} from "lucide-react";
import React from "react";
import { useTheme } from "../contexts/ThemeContext";
import RatingSection from "../pages/movie-details/rating-section";
import { useFavoritesStore } from "../store/favoritesStore";
import { MovieDetails as MovieDetailsType } from "../types/movie";
import { Button } from "./ui/button";

interface MovieDetailsProps {
  movie: MovieDetailsType;
  onBack: () => void;
}

const MovieDetails: React.FC<MovieDetailsProps> = ({ movie }) => {
  const { isDarkMode } = useTheme();
  const { addToFavorites, removeFromFavorites, isFavorite } =
    useFavoritesStore();
  const isMovieFavorite = isFavorite(movie.imdbID);

  const handleImageError = (
    e: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    e.currentTarget.src = isDarkMode
      ? "https://via.placeholder.com/400x600/1f2937/9ca3af?text=No+Image"
      : "https://via.placeholder.com/400x600/f3f4f6/6b7280?text=No+Image";
  };

  const handleFavoriteClick = () => {
    const movieData = {
      imdbID: movie.imdbID,
      Title: movie.Title,
      Year: movie.Year,
      Type: movie.Type,
      Poster: movie.Poster,
    };

    if (isMovieFavorite) {
      removeFromFavorites(movie.imdbID);
    } else {
      addToFavorites(movieData);
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="bg-white dark:bg-gray-800 rounded-3xl border border-gray-200 dark:border-gray-700 overflow-hidden shadow-2xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-8">
          <div className="lg:col-span-1">
            <div className="aspect-[2/3] rounded-2xl overflow-hidden">
              <img
                src={
                  movie.Poster !== "N/A"
                    ? movie.Poster
                    : isDarkMode
                    ? "https://via.placeholder.com/400x600/1f2937/9ca3af?text=No+Image"
                    : "https://via.placeholder.com/400x600/f3f4f6/6b7280?text=No+Image"
                }
                alt={movie.Title}
                onError={handleImageError}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="lg:col-span-2 space-y-6">
            <div>
              <div className="flex items-start justify-between mb-4">
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
                  {movie.Title}
                </h1>
                <Button
                  onClick={handleFavoriteClick}
                  variant={isMovieFavorite ? "default" : "outline"}
                  className={`flex items-center space-x-2 ${
                    isMovieFavorite
                      ? "bg-red-500 hover:bg-red-600 text-white"
                      : "border-red-500 text-red-500 hover:bg-red-50 dark:hover:bg-red-950"
                  }`}
                >
                  <Heart
                    className={`h-4 w-4 ${
                      isMovieFavorite ? "fill-current" : ""
                    }`}
                  />
                  <span>
                    {isMovieFavorite
                      ? "Remove from Favorites"
                      : "Add to Favorites"}
                  </span>
                </Button>
              </div>
              <div className="flex flex-wrap items-center gap-4 text-gray-600 dark:text-gray-300">
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4" />
                  <span>{movie.Year}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4" />
                  <span>{movie.Runtime}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Star className="h-4 w-4 text-yellow-400" />
                  <span>{movie.imdbRating}/10</span>
                </div>
                <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 rounded-full text-blue-700 dark:text-blue-300 text-sm">
                  {movie.Rated}
                </span>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Plot
              </h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {movie.Plot}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  Details
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-start space-x-3">
                    <Users className="h-4 w-4 text-blue-500 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="text-gray-600 dark:text-gray-400">
                        Director:
                      </span>
                      <span className="text-gray-900 dark:text-white ml-2">
                        {movie.Director}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Users className="h-4 w-4 text-blue-500 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="text-gray-600 dark:text-gray-400">
                        Actors:
                      </span>
                      <span className="text-gray-900 dark:text-white ml-2">
                        {movie.Actors}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Globe className="h-4 w-4 text-blue-500 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="text-gray-600 dark:text-gray-400">
                        Language:
                      </span>
                      <span className="text-gray-900 dark:text-white ml-2">
                        {movie.Language}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  Genre
                </h3>
                <div className="flex flex-wrap gap-2">
                  {movie.Genre.split(", ").map((genre, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-700 rounded-full text-blue-700 dark:text-blue-300 text-sm"
                    >
                      {genre}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {movie.Awards && movie.Awards !== "N/A" && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 flex items-center space-x-2">
                  <Award className="h-5 w-5 text-yellow-400" />
                  <span>Awards</span>
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  {movie.Awards}
                </p>
              </div>
            )}

            {movie.Ratings && movie.Ratings.length > 0 && (
              <RatingSection movie={movie} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
