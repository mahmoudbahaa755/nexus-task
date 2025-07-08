const API_KEY = "1e4c919";
const BASE_URL = "http://www.omdbapi.com/";

interface Filters {
  type: string;
  year: string;
  genre: string;
}

interface Movie {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
}

interface SearchResponse {
  Search: Movie[];
  totalResults: string;
  Response: string;
}

interface MovieDetails {
  Title: string;
  Year: string;
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  Poster: string;
  Ratings: Array<{ Source: string; Value: string }>;
  Metascore: string;
  imdbRating: string;
  imdbVotes: string;
  imdbID: string;
  Type: string;
  DVD: string;
  BoxOffice: string;
  Production: string;
  Website: string;
  Response: string;
}

export const getMovies = async (
  query?: string,
  filters?: Filters
): Promise<SearchResponse> => {
  try {
    let url = `${BASE_URL}?apikey=${API_KEY}${query ? `&s=${query}` : ""}`;

    if (filters?.type) {
      url += `&type=${filters.type}`;
    }

    if (filters?.year) {
      // Handle year ranges
      if (filters.year.includes("-")) {
        const [startYear] = filters.year.split("-");
        url += `&y=${startYear}`;
      } else {
        url += `&y=${filters.year}`;
      }
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
