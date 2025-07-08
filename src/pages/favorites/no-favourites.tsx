import { Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";

export default function NoFavorite() {
  const navigate = useNavigate();

  return (
    <div className="text-center py-16">
      <div className="mb-6">
        <Heart className="h-16 w-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          No favorites yet
        </h3>
        <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
          Start adding movies to your favorites by clicking the heart icon on
          any movie card.
        </p>
      </div>
      <Button
        onClick={() => navigate("/")}
        className="inline-flex items-center space-x-2"
      >
        <span>Browse Movies</span>
      </Button>
    </div>
  );
}
