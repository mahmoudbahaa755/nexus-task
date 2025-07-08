import { Heart, Trash2 } from "lucide-react";
import { Button } from "../../components/ui/button";
import { useFavoritesStore } from "../../store/favoritesStore";

export default function FavoriteHeader() {
  const { favorites, clearFavorites } = useFavoritesStore();

  const handleClearFavorites = () => {
    if (window.confirm("Are you sure you want to clear all favorites?")) {
      clearFavorites();
    }
  };
  return (
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
  );
}
