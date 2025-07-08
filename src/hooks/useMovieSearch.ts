import { useCallback, useState } from "react";
import { Movie, MovieDetails } from "../types/movie";
import { getMovieDetails, getMovies } from "../utils/api";

interface Filters {
  type: string;
  year: string;
  genre: string;
}

export const useMovieSearch = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<Filters>({
    type: "",
    year: "",
    genre: "",
  });

  const search = useCallback(
    async (query: string, currentFilters?: Filters) => {
      if (!query.trim()) {
        // setMovies([]);
        setError(null);
        // return;
      }

      setLoading(true);
      setError(null);

      try {
        const filtersToUse = currentFilters || filters;
        const data = await getMovies(query, filtersToUse);
        let results = data.Search || [];
        console.log(data, "data");
        // Client-side filtering for genre (since OMDb doesn't support genre filtering directly)
        if (filtersToUse.genre) {
          results = results.filter(
            (movie: Movie) => movie.Type === "movie" // Only filter genre for movies, not series/episodes
          );
        }

        setMovies(results);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
        setMovies([]);
      } finally {
        setLoading(false);
      }
    },
    [filters]
  );

  const updateFilters = useCallback((newFilters: Filters) => {
    setFilters(newFilters);
  }, []);

  return { movies, loading, error, search, filters, updateFilters };
};

export const useMovieDetails = () => {
  const [movieDetails, setMovieDetails] = useState<MovieDetails | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchDetails = useCallback(async (imdbID: string) => {
    setLoading(true);
    setError(null);

    try {
      const data = await getMovieDetails(imdbID);
      setMovieDetails(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      setMovieDetails(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const clearDetails = useCallback(() => {
    setMovieDetails(null);
    setError(null);
  }, []);

  return { movieDetails, loading, error, fetchDetails, clearDetails };
};
