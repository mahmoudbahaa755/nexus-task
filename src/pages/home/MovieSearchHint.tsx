// MovieSearchPrompt.jsx
import { useMemo } from "react";

const MovieSearchHint = () => {
  const hintContent = useMemo(
    () => (
      <div className="text-center py-16">
        <div className="text-gray-600 dark:text-gray-400 text-xl mb-4">
          Start searching for movies
        </div>
        <p className="text-gray-500 dark:text-gray-500">
          Type in the search box above to find your favorite movies
        </p>
      </div>
    ),
    []
  );

  return hintContent;
};

export default MovieSearchHint;
