import { Filters } from "../types/global";
import { MovieDetails, SearchResponse } from "../types/movie";

const API_KEY = "1e4c919";
const BASE_URL = "http://www.omdbapi.com/";

export const getMovies = async (
  query?: string,
  filters?: Filters
): Promise<SearchResponse> => {
  try {
    let url = `${BASE_URL}?apikey=${API_KEY}${query ? `&s=${query}` : ""}`;
    if (filters) {
      const filterParams: Record<string, string> = {};
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined || value !== null || value.length > 0) {
          if (key === "year") {
            filterParams["y"] = String(value);
          } else filterParams[key] = String(value);
        }
      });
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
