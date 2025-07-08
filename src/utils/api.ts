import { useQuery } from "@tanstack/react-query";
import { Filters } from "../types/global";
import { MovieDetails, SearchResponse } from "../types/movie";

const API_KEY = "1e4c919";
const BASE_URL = "https://www.omdbapi.com/";

export const getMovies = async (
  query?: string,
  filters?: Filters
): Promise<SearchResponse> => {
  try {
    let url = `${BASE_URL}?apikey=${API_KEY}${query ? `&s=${query}` : ""}`;
    if (filters) {
      const filterParams: Record<string, string> = {};
      if (filters.page) filterParams["page"] = filters.page.toString();
      if (filters.year) filterParams["y"] = filters.year.toString();
      if (filters.type) filterParams["type"] = filters.type;
      const params = new URLSearchParams(filterParams);
      url += `&${params.toString()}`;
    }

    const response = await fetch(url);
    const data = await response.json();
    if (data.Response === "False") {
      throw new Error(data.Error || "No movies found");
    }
    return data;
  } catch (error) {
    console.error("Error searching movies:", error);
    throw error;
  }
};

export const getMovieDetails = async (
  imdbID: string
): Promise<MovieDetails> => {
  try {
    const response = await fetch(`${BASE_URL}?i=${imdbID}&apikey=${API_KEY}`);
    const data = await response.json();

    if (data.Response === "False") {
      throw new Error(data.Error || "Movie not found");
    }

    return data;
  } catch (error) {
    console.error("Error fetching movie details:", error);
    throw error;
  }
};

// TanStack Query hooks
export const useMovies = (query?: string, filters?: Filters) => {
  return useQuery({
    queryKey: ["movies", query, filters],
    queryFn: () => getMovies(query, filters),
    enabled: !!query || !!filters,
    staleTime: 5 * 60 * 1000, // 5 minutes
    select: (data) => data,
    retry: (failureCount, error) => {
      // Don't retry if it's a "No movies found" error
      if (error instanceof Error && error.message.includes("No movies found")) {
        return false;
      }
      return failureCount < 3;
    },
  });
};

export const useMovieDetails = (imdbID: string) => {
  return useQuery({
    queryKey: ["movie", imdbID],
    queryFn: () => getMovieDetails(imdbID),
    enabled: !!imdbID,
    staleTime: 10 * 60 * 1000, // 10 minutes
    select: (data) => data,
    retry: (failureCount, error) => {
      // Don't retry if it's a "Movie not found" error
      if (error instanceof Error && error.message.includes("Movie not found")) {
        return false;
      }
      return failureCount < 3;
    },
  });
};
