import { MovieDetails } from "../../types/global";

export default function RatingSection({ movie }: { movie: MovieDetails }) {
  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
        Ratings
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {movie.Ratings.map((rating, index) => (
          <div
            key={index}
            className="bg-gray-50 dark:bg-gray-700 rounded-xl p-3 text-center"
          >
            <div className="text-gray-900 dark:text-white font-semibold">
              {rating.Value}
            </div>
            <div className="text-gray-600 dark:text-gray-400 text-sm">
              {rating.Source}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
