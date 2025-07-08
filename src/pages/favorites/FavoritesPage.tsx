import { Heart, Trash2 } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";
import MovieList from "../../components/MovieList";
import { Button } from "../../components/ui/button";
import { useFavoritesStore } from "../../store/favoritesStore";

const FavoritesPage: React.FC = () => {
  const navigate = useNavigate();
  const { favorites, clearFavorites } = useFavoritesStore();

  const handleMovieClick = (imdbID: string) => {
    navigate(`/movie/${imdbID}`);
  };

  const handleClearFavorites = () => {
    if (window.confirm("Are you sure you want to clear all favorites?")) {
      clearFavorites();
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-r from-red-500 to-pink-600 rounded-xl">
              <Heart className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                My Favorites
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Your saved movies collection
              </p>
            </div>
          </div>

          {favorites.length > 0 && (
            <Button
              variant="destructive"
              onClick={handleClearFavorites}
              className="flex items-center space-x-2"
            >
              <Trash2 className="h-4 w-4" />
              <span>Clear All</span>
            </Button>
          )}
        </div>

        <div className="bg-white w-fit dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 mb-8">
          <div className="flex gap-5 items-center justify-between">
            <span className="text-gray-600 dark:text-gray-400">
              Total favorites:
            </span>
            <span className="text-lg font-semibold text-gray-900 dark:text-white">
              {favorites.length}
            </span>
          </div>
        </div>
      </div>

      {favorites.length === 0 ? (
        <div className="text-center py-16">
          <div className="mb-6">
            <Heart className="h-16 w-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No favorites yet
            </h3>
            <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
              Start adding movies to your favorites by clicking the heart icon
              on any movie card.
            </p>
          </div>
          <Button
            onClick={() => navigate("/")}
            className="inline-flex items-center space-x-2"
          >
            <span>Browse Movies</span>
          </Button>
        </div>
      ) : (
        <MovieList movies={favorites} onMovieClick={handleMovieClick} />
      )}
    </div>
  );
};

export default FavoritesPage;
